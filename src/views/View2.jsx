import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Consulta } from "../components/Consulta";
import Select from "react-select";
import api_ui from "../api_ui";
import axios from "axios";
import "../styles/vista2.css";

export default function View2() {
  const [contratos, setContratos] = useState([]);
  const [contrato, setContrato] = useState({});
  const [cliente, setCliente] = useState({});

  const getContratos = () => {
    axios
      .get(`${api_ui}/contratos`)
      .then((result) => {
        result.data.forEach((contrato) => {
          let cuerpo = { label: contrato.id, value: contrato };
          setContratos([...contratos, cuerpo]);
        });
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
            <th>Cliente</th>
            <th>Fecha de elaboración</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{contrato.id}</td>
            <td>{cliente.nombres}</td>
            <td>{contrato.fecha_consignacion}</td>
          </tr>
        </tbody>
      </table>

      <button className="boton">Retractar </button>
      <br />
      {/* eliminar no elimina, simplemente deshabilita el contrato a las vistas, pero queda en record */}
      <button className="boton">Eliminar </button>
      <br />
      <button className="boton">Imprimir</button>

      <Consulta />

      <Footer />
    </>
  );
}
