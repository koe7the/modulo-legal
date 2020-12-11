import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Select from "react-select";
import { Consulta } from "../components/Consulta";

export default function View3_2() {
  const [contrato, setContrato] = useState("");

  const opciones_contrato = [
    {
      label: "contrato 1",
      value: {
        id: 1,
        fecha_elaboracion: "10/10/15",
        fecha_expiracion: "8/8/17",
        tiempo_morosidad: "50 dias",
      },
    },
    {
      label: "contrato 2",
      value: {
        id: 2,
        fecha_elaboracion: "10/5/14",
        fecha_expiracion: "8/3/19",
        tiempo_morosidad: "80 dias",
      },
    },
  ];

  return (
    <>
      <Navbar />
      <div className="filtro-div">
        <Select
          options={opciones_contrato}
          isClearable
          isSearchable
          placeholder="Buscar contrato moroso"
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
            <th>Id-Contrato</th>
            <th>Fecha de elaboracion</th>
            <th>Fecha de expiracion</th>
            <th>Estado de morosidad</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contrato === "" ? (
            ""
          ) : (
            <tr>
              <td>{contrato.id}</td>
              <td>{contrato.fecha_elaboracion}</td>
              <td>{contrato.fecha_expiracion}</td>
              <td>{contrato.tiempo_morosidad}</td>
              <td>
                <button className="boton">
                  Proceder a embargo de propiedad
                </button>
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