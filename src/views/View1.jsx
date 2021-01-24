import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Consulta } from "../components/Consulta";
import ContratoForm from "../components/ContratoForm";
import Select from "react-select";
import "../styles/vista1.css";

/* cosas a considerar: 
  -la vista de refinanciamiento cuando se activa el proceso, la vista redirecciona a la vista de actualizacion de contrato con la info del contrato ya cargada para solo cambiar las condiciones de pago del credito renovado, esto se validaria en un useEffect para que identifique si la vista esta siendo cargada mediante un redireccionamiento o una carga normal, y dependiendo de que setearia la data en los estados. 
  -arreglar el tema de los buscadores de solicitudes y contratos a actualizar para que queden uno al lado del otro OOOOO puedo hacer con dos rabio button seleccionar que mostrar (solicitudes o contratos)
*/

export default function View1() {
  /* informacion del formulario del contrato */
  const [contratoInfo, setContratoInfo] = useState({});
  /* modo de pago de propiedad */
  const [modo, setModo] = useState("");
  /* mensaje del formulario */
  const [mensaje, setMensaje] = useState("realizar registro");

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

  /* modos de contratacion CREDITO/CONTADO */
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
      {/* select para buscar informacion de la solicitud confirmada a registrar */}
      <div className="search-select">
        <Select
          options={placeholder_solicitud}
          isSearchable
          isClearable
          className="filtro"
          placeholder="Buscar solicitud a registrar"
          onChange={() => {
            setMensaje("realizar registro");
          }}
        />
      </div>
      {/* select para seleccionar un contrato a actualizar... esto usa el mismo state que el de registro de solicitud -> contratoInfo */}
      <div className="search-select">
        <Select
          options={placeholder_contratos}
          isSearchable
          isClearable
          className="filtro"
          placeholder="seleccionar contrato a actualizar"
          onChange={() => {
            setMensaje("realizar actualizacion");
          }}
        />
      </div>
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
        /* modo de pago del contrato */
        modo={modo}
        setModo={setModo}
        /* mensaje de registro o actualizacion */
        mensaje={mensaje}
      />
      <Consulta />
      <Footer />
    </>
  );
}
