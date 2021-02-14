import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Select from "react-select";
import axios from "axios";
import api_ui from "../api_ui";
import { withRouter, useHistory } from "react-router-dom";
/* cosas a considerar: la vista de refinanciamiento cuando se activa el proceso, la vista redirecciona a la vista de actualizacion de contrato con la info del contrato ya cargada para solo cambiar las condiciones de pago del credito renovado, esto se validaria en un useEffect para que identifique si la vista esta siendo cargada mediante un redireccionamiento o una carga normal, y dependiendo de que setearia la data en los estados. */

function View3_1() {
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState({});
  const history = useHistory();

  const getContratos = () => {
    axios
      .get(`${api_ui}/morosidades`)
      .then((res) => {
        const data = res.data.reduce((accumulator, elemento) => {
          if (elemento.status === 1) {
            return accumulator;
          }
          let option = { label: elemento.id_contrato, value: elemento };
          accumulator.push(option);
          return accumulator;
        }, []);

        setOptions(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDate = () => {
    const date = new Date(option.contrato.fecha_consignacion);
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const ano = date.getFullYear();

    return `${dia}/${mes}/${ano}`;
  };

  const handleSubmit = () => {
    if (option.contrato) {
      axios
        .put(`${api_ui}/morosidades/${option.contrato.id}`)
        .then((res) => {
          console.log("confirmatico");
          alert(`Se procedera a actualizar el contrato ${option.contrato.id}`);
          history.push({
            pathname: "/",
            state: {
              contratoInfo: option.contrato,
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Se debe seleccionar un contrato primero~!");
    }
  };

  useEffect(() => {
    getContratos();
  }, []);

  return (
    <>
      <Navbar />
      <div className="filtro-div">
        <Select
          options={options}
          isClearable
          isSearchable
          placeholder="Contratos a refinanciar"
          onChange={(e) => {
            if (e === null) {
              setOption({});
            } else if (e.value !== null) {
              axios
                .get(`${api_ui}/contratos/${e.value.id_contrato}`)
                .then((res) => {
                  setOption({
                    morosidad: e.value,
                    contrato: res.data[0],
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }}
        />
      </div>

      <table className="content-table">
        <thead>
          <tr>
            <th>Id-Contrato</th>
            <th>Interes de mora</th>
            <th>Gastos de gestion de cobro</th>
            <th>Fecha de consignacion</th>
            <th>Confirmacion de refinanciacion</th>
          </tr>
        </thead>
        <tbody>
          {!option.contrato ? null : (
            <tr>
              <td>{option.contrato.id}</td>
              <td>{option.morosidad.interes_mora}%</td>
              <td>{option.morosidad.gasto_gestion_cobro}</td>
              <td>{getDate()}</td>
              <td>Confirmado</td>
            </tr>
          )}
        </tbody>
      </table>

      <button onClick={handleSubmit} className="boton">
        Registrar nuevas condiciones
      </button>

      <Footer />
    </>
  );
}

export default withRouter(View3_1);
