import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Select from "react-select";
import api_ui from "../api_ui";
import axios from "axios";

import "../styles/vista2.css";

function View2() {
  const [contratos, setContratos] = useState([]);
  const [contrato, setContrato] = useState({});
  const [cliente, setCliente] = useState({});

  const getContratos = () => {
    axios
      .get(`${api_ui}/contratos`)
      .then((result) => {
        console.log(result.data);
        const contratosArr = result.data.reduce((accumulator, contrato) => {
          let cuerpo = { label: contrato.id, value: contrato };
          accumulator.push(cuerpo);
          return accumulator;
        }, []);

        setContratos(contratosArr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCliente = (id) => {
    axios
      .get(`${api_ui}/clientes/${id}`)
      .then((result) => {
        setCliente(result.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFormattedDate = () => {
    if (contrato.fecha_consignacion) {
      const date = new Date(contrato.fecha_consignacion);
      const dia = date.getDate();
      const mes = date.getMonth() + 1;
      const ano = date.getFullYear();

      return `${dia}/${mes}/${ano}`;
    }
  };

  /* funcion para eliminar/retractar */

  const sendRetract = (e) => {
    if (contrato.id) {
      const suceso = e.target.innerHTML;

      axios
        .put(`${api_ui}/contratos/ree`, { ree: true, id: contrato.id })
        .then((res) => {
          alert(
            `La operacion ${suceso} el contrato ${contrato.id} ha sido exitosa`
          );
          setContrato({});
          setCliente({});
          getContratos();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Debe seleccionar primero un contrato");
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
          options={contratos}
          isSearchable
          isClearable
          placeholder="Buscar estado de contrato"
          onChange={(e) => {
            if (e === null) {
              setContrato({});
              setCliente({});
            } else {
              setContrato(e.value);
              getCliente(e.value.id_cliente);
            }
          }}
        />
      </div>

      <table className="content-table">
        <thead>
          <tr>
            <th>ID Contrato</th>
            <th>ID Cliente</th>
            <th>Cliente</th>
            <th>Fecha de elaboración</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {!contrato.id ? null : (
            <tr>
              <td>{contrato.id}</td>
              <td>{contrato.id_cliente}</td>
              <td>{cliente.nombres}</td>
              <td>{getFormattedDate()}</td>
              <td>{contrato.tipo}</td>
            </tr>
          )}
        </tbody>
      </table>

      <button onClick={sendRetract} className="boton">
        Retractar{" "}
      </button>
      <br />
      {/* eliminar no elimina, simplemente deshabilita el contrato a las vistas, pero queda en record */}
      <button onClick={sendRetract} className="boton">
        Eliminar{" "}
      </button>
      <br />
      <button
        className="boton"
        onClick={() => {
          alert(
            `El contrato ${contrato.id} ha sido situado en la cola de impresion`
          );
        }}
      >
        Imprimir
      </button>

      <Footer />
    </>
  );
}

export default View2;
