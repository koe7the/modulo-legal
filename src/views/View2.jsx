import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Consulta } from "../components/Consulta";
import Select from "react-select";
import "../styles/vista2.css";

export default function View2() {
  const [contrato, setContrato] = useState("");
  const opciones_contrato = [
    {
      label: "contrato 1",
      value: {
        id: 1,
        cliente: "carlos",
        fecha_elaboracion: "15/12/2008",
        fecha_expiracion: "07/06/2019",
        modalidad: "contado",
        estado: "en proceso",
      },
    },
    {
      label: "contrato 2",
      value: {
        id: 2,
        cliente: "juan",
        fecha_elaboracion: "16/12/2012",
        fecha_expiracion: "09/02/2018",
        modalidad: "credito",
        estado: "finalizado",
      },
    },
  ];

  return (
    <>
      <Navbar />
      <div className="filtro-div">
        <Select
          options={opciones_contrato}
          isSearchable
          isClearable
          placeholder="Buscar estado de contrato"
          onChange={(e) => {
            if (e === null) {
              setContrato("");
            } else if (e.value !== null) {
              setContrato(e.value);
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
            <th>Fecha de expiración</th>
            <th>Modalidad</th>
            <th>estado</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contrato === "" ? (
            ""
          ) : (
            <tr>
              <td>{contrato.id}</td>
              <td>{contrato.cliente}</td>
              <td>{contrato.fecha_elaboracion}</td>
              <td>{contrato.fecha_expiracion}</td>
              <td>{contrato.modalidad}</td>
              <td>{contrato.estado}</td>
              <td>
                <button className="boton">Retractar </button>
              </td>
              {/* eliminar no elimina, simplemente deshabilita el contrato a las vistas, pero queda en record */}
              <td>
                <button className="boton">Eliminar </button>
              </td>
              <td>
                <button className="boton">Imprimir</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Consulta />

      <Footer />
    </>
  );
}
