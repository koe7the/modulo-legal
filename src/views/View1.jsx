import React, { useState, useEffect } from "react";
import axios from "axios";
/* componentes base */
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api_ui from "../api_ui";
/*componentes propios*/
import Buscador from "../components/BuscadorView1";
import ContratoForm from "../components/ContratoForm";
import "../styles/vista1.css";

/* TODO: TODO: TODO: TODO:cosas a considerar:
  -la vista de refinanciamiento cuando se activa el proceso, la vista redirecciona a la vista de actualizacion de contrato con la info del contrato ya cargada para solo cambiar las condiciones de pago del credito renovado, esto se validaria en un useEffect para que identifique si la vista esta siendo cargada mediante un redireccionamiento o una carga normal, y dependiendo de que setearia la data en los estados.


  -TODO: falta la funcionalidad de acutualizar, "eliminar", retractar y embargar los contratos. 

  TODO: TODO: TODO: TODO: 
*/

export default function View1() {
  /* mensaje del submit del formulario */
  const [mensaje, setMensaje] = useState("");
  //accion del buscador del form (si solicitudes o contratos)
  const [accionBuscador, setAccionBuscador] = useState("");
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

  //seleccionado o no el select de modo de contrato
  const [seleccionado, setSeleccionado] = useState(false);

  /* estado del formulario del contrato */
  const [contratoInfo, setContratoInfo] = useState({
    modo_contrato: {
      tipo: "contado",
    },
  });

  //opciones de solicitudes y contratos
  const [contratos, setContratos] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);

  const getData_Contratos_Solicitudes = () => {
    axios
      .all([
        axios.get(`${api_ui}/contratos`),
        axios.get(`${api_ui}/solicitudes`),
      ])
      .then((responseArr) => {
        //seteando las opciones para el buscador

        const [resContratos, resSolicitudes] = responseArr;

        const contratoOpciones = resContratos.data.reduce(
          (accumulator, contrato) => {
            const cuerpo = { label: contrato.id, value: contrato };
            accumulator.push(cuerpo);
            return accumulator;
          },
          []
        );

        setContratos(contratoOpciones);

        const solicitudesOpciones = resSolicitudes.data.reduce(
          (accumulator, solicitud) => {
            const cuerpo = { label: solicitud.id, value: solicitud };
            accumulator.push(cuerpo);
            return accumulator;
          },
          []
        );

        setSolicitudes(solicitudesOpciones);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* funciones del form */

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contratoInfo);
    axios
      .post(`${api_ui}/contratos/registro`, contratoInfo)
      .then((result) => {
        alert(`contrato ${result.data.insertId} exitosamente registrado`);
      })
      .catch((err) => {
        alert("hubo un error");
        console.log(err.response);
      });
  };

  useEffect(() => {
    getData_Contratos_Solicitudes();
  }, []);

  /*el react-select si le pasa un objeto como value no se coloca en azul */
  return (
    <>
      <Navbar />
      <Buscador /* buscador de contratos o solicitudes */
        accion={accionBuscador}
        solicitudOpciones={solicitudes}
        contratoOpciones={contratos}
        contratoInfo={contratoInfo}
        setAccion={setAccionBuscador}
        setMensaje={setMensaje}
        setContratoInfo={setContratoInfo}
      />

      <ContratoForm /* formulario de contrato */
        contratoInfo={contratoInfo}
        modos_contrato={modos_contrato}
        seleccionado={seleccionado}
        mensaje={mensaje} /* mensaje de registro o actualizacion */
        handleSubmit={handleSubmit}
        setContratoInfo={setContratoInfo}
        setSeleccionado={setSeleccionado}
      />
      <button
        onClick={() => {
          console.log(contratoInfo);
        }}
      >
        paver
      </button>

      <Footer />
    </>
  );
}
