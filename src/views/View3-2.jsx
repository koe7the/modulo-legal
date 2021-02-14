import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Select from "react-select";
import axios from "axios";
import api_ui from "../api_ui";
import { useHistory, withRouter } from "react-router-dom";
function View3_2() {
  const [contrato, setContrato] = useState({});
  const [opcionesContrato, setOpcionesContrato] = useState([]);
  const history = useHistory();

  const getOpcionesContrato = () => {
    axios
      .get(`${api_ui}/morosidades`)
      .then((res) => {
        console.log(res.data);
        const data = res.data.reduce((accumulator, element) => {
          if (element.status === 1) {
            return accumulator;
          }
          let option = { label: element.id_contrato, value: element };
          accumulator.push(option);
          return accumulator;
        }, []);

        setOpcionesContrato(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDate = () => {
    const date = new Date(contrato.contrato.fecha_consignacion);
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const ano = date.getFullYear();

    return `${dia}/${mes}/${ano}`;
  };

  const handleEmbargo = () => {
    axios
      .put(`${api_ui}/morosidades/${contrato.contrato.id}`)
      .then((res) => {
        console.log("confirmatico");
        alert(
          `La solicitud de embargo del contrato ${contrato.contrato.id} ha sido exitosamente enviada`
        );
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getOpcionesContrato();
  }, []);

  return (
    <>
      <Navbar />
      <div className="filtro-div">
        <Select
          options={opcionesContrato}
          isClearable
          isSearchable
          placeholder="Buscar contrato moroso"
          onChange={(e) => {
            if (e === null) {
              setContrato({});
            } else if (e.value !== null) {
              axios
                .get(`${api_ui}/contratos/${e.value.id_contrato}`)
                .then((res) => {
                  setContrato({
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
            <th>Fecha de elaboracion</th>
            <th>Gastos de gestion de cobros</th>
            <th>Interes de mora</th>
          </tr>
        </thead>
        <tbody>
          {!contrato.contrato ? null : (
            <tr>
              <td>{contrato.contrato.id}</td>
              <td>{getDate()}</td>
              <td>{contrato.morosidad.gasto_gestion_cobro}</td>
              <td>{contrato.morosidad.interes_mora}%</td>
            </tr>
          )}
        </tbody>
      </table>

      <button
        onClick={() => {
          if (contrato.contrato) {
            axios
              .get(`${api_ui}/clientes/${contrato.contrato.id_cliente}`)
              .then((res) => {
                const nombre = res.data[0].nombres;
                alert(
                  `Se le ha notificado al cliente ${nombre} sobre su condicion de moroso`
                );
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }}
        className="boton"
      >
        Contactar cliente
      </button>
      <br />
      <button
        onClick={() => {
          alert(
            `La solicitud de refinanciacion para el contrato ${contrato.contrato.id} ha sido enviada exitosamente`
          );
        }}
        className="boton"
      >
        Enviar solicitud de refinanciacion
      </button>
      <br />
      <button
        onClick={() => {
          handleEmbargo();
        }}
        className="boton"
      >
        Proceder a embargo de propiedad
      </button>

      <Footer />
    </>
  );
}

export default withRouter(View3_2);
