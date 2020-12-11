import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Select from "react-select";
import { Consulta } from "../components/Consulta";
export default function View3_1() {
  const [contrato, setContrato] = useState("");

  const opciones_contrato = [
    {
      label: "contrato 1",
      value: {
        id: 1,
        fecha_elaboracion: "10/10/15",
        fecha_expiracion: "8/8/17",
        tiempo_morosidad: "50 dias",
        pagos: 12,
        porcentaje_credito: 35,
      },
    },
    {
      label: "contrato 2",
      value: {
        id: 2,
        fecha_elaboracion: "10/5/14",
        fecha_expiracion: "8/3/19",
        tiempo_morosidad: "80 dias",
        pagos: 9,
        porcentaje_credito: 55,
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
          placeholder="Buscar contrato a refinanciar"
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
            <th>Pago de cuotas puntuales</th>
            <th>Porcentaje de credito pagado</th>
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
              <td>{contrato.pagos}</td>
              <td>{`${contrato.porcentaje_credito}%`}</td>
              <td>
                <button className="boton">
                  Proceder a refinanciar contrato
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
