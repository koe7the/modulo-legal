import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Consulta } from "../components/Consulta";
/*componentes del view*/
import Buscador from "../components/BuscadorView1";
import ContratoForm from "../components/ContratoForm";

import "../styles/vista1.css";

/* cosas a considerar:
  -la vista de refinanciamiento cuando se activa el proceso, la vista redirecciona a la vista de actualizacion de contrato con la info del contrato ya cargada para solo cambiar las condiciones de pago del credito renovado, esto se validaria en un useEffect para que identifique si la vista esta siendo cargada mediante un redireccionamiento o una carga normal, y dependiendo de que setearia la data en los estados.
*/

export default function View1() {
  /* informacion del formulario del contrato */
  const [contratoInfo, setContratoInfo] = useState({
    modo_contrato: "contado",
  });
  /* mensaje del formulario */
  const [mensaje, setMensaje] = useState("");
  //accion del buscador del form
  const [accionBuscador, setAccionBuscador] = useState("");

  /* TODO: eliminar placeholder de las solicitudes  */
  const placeholder_solicitud = [
    { label: "solicitud 1", value: { cliente: "arturo" } },
    { label: "solicitud 2", value: { cliente: "alex" } },
  ];

  /* TODO: eliminar placeholder de los contratos */
  const placeholder_contratos = [
    { label: "contrato 1", value: { cliente: "arturo" } },
    { label: "contrato 2", value: { cliente: "alex" } },
  ];

  /* modos de contratacion CREDITO/CONTADO para el react-select del form */
  const modos_contrato = [
    {
      label: "Al contado",
      value: "contado",
    },
    {
      label: "Por crédito",
      value: "credito",
    },
  ];

  /* funciones del form */
  const handleChange = (e) => {
    setContratoInfo({
      ...contratoInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contratoInfo);
  };

  /*el react-select si le pasa un objeto como value no se coloca en azul */
  return (
    <>
      <Navbar />
      {/* buscador de contratos o solicitudes */}
      <Buscador
        accion={accionBuscador}
        setAccion={setAccionBuscador}
        solicitudOpciones={placeholder_solicitud}
        contratoOpciones={placeholder_contratos}
        setMensaje={setMensaje}
      />

      {/* formulario de contrato */}
      <ContratoForm
        /* state del contrato */
        contratoInfo={contratoInfo}
        setContratoInfo={setContratoInfo}
        modos_contrato={modos_contrato}
        /* TODO: info del cliente, buscar mejor manera de expresarla  */
        cliente={placeholder_solicitud[1].value.cliente}
        /* funciones del form */
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        /* mensaje de registro o actualizacion */
        mensaje={mensaje}
      />
      <Consulta />
      <Footer />
    </>
  );
}
