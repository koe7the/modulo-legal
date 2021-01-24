import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Select from "react-select";
import { Consulta } from "../components/Consulta";

/* cosas a considerar: la vista de refinanciamiento cuando se activa el proceso, la vista redirecciona a la vista de actualizacion de contrato con la info del contrato ya cargada para solo cambiar las condiciones de pago del credito renovado, esto se validaria en un useEffect para que identifique si la vista esta siendo cargada mediante un redireccionamiento o una carga normal, y dependiendo de que setearia la data en los estados. */

export default function View3_1() {
  const [options, setOptions] = useState("");

  const opciones_contrato = [
    {
      label: "contrato 1",
      value: {
        id: 1,
        permiso: "validado",
      },
    },
    {
      label: "contrato 2",
      value: {
        id: 2,
        permiso: "no validado",
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
          placeholder="Contratos a refinanciar"
          onChange={(e) => {
            if (e === null) {
              setOptions("");
            } else if (e.value !== null) {
              setOptions(e.value);
            }
          }}
        />
      </div>

      <table className="content-table">
        <thead>
          <tr>
            <th>Id-Contrato</th>
            <th>Permiso de refinanciacion</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {options === "" ? (
            ""
          ) : (
            <tr>
              <td>{options.id}</td>
              <td>{options.permiso}</td>
              <td>
                <button className="boton">Registrar nuevas condiciones</button>
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
