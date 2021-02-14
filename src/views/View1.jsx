import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter, useHistory, useLocation } from "react-router-dom";
/* componentes base */
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api_ui from "../api_ui";
/*componentes propios*/
import Buscador from "../components/BuscadorView1";
import ContratoForm from "../components/ContratoForm";
import "../styles/vista1.css";

/* TODO: TODO: TODO: TODO:cosas a considerar:


  -TODO: falta la funcionalidad de embargar los contratos. 

  TODO: TODO: TODO: TODO: 
*/

function View1() {
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
  /* history y el state */
  const history = useHistory();
  const location = useLocation();
  const { state } = location;
  /* estado del formulario del contrato */
  const [contratoInfo, setContratoInfo] = useState({
    id_solicitud: 0,
    cliente: {
      nombres: "",
      apellidos: "",
      cedula: 0,
      correo_electronico: "",
      cuenta_bancaria: 0,
      direccion_fiscal: "",
      fecha_nacimiento: "",
      genero: "",
      id: 0,
      numero_contacto: 0,
      rif: "",
      sueldo: 0,
    },
    inmueble: {
      codigo_postal: 0,
      descripcion: "",
      direccion: "",
      id: 0,
      tipo: "",
    },
    legal: {
      clausulas: "",
      condicion_propiedad: "",
      derechos_cliente: "",
      derechos_empresa: "",
      direccion_fiscal: "",
      fecha_consignacion: "",
      obligaciones_cliente: "",
      obligaciones_empresa: "",
      proposito: "",
    },
    modo_contrato: {
      id: 0,
      id_contrato: 0,
      tipo: "contado",
      tipo_persona: "",
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
          (accumulator, element) => {
            const cuerpo = {
              label: element.id,
              value: element,
            };
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
    if (
      mensaje === "Actualizar contrato" ||
      mensaje === "Registrar nuevas condiciones"
    ) {
      axios
        .put(`${api_ui}/contratos/actualizacion`, contratoInfo)
        .then((res) => {
          console.log(res);
          alert(`contrato ${contratoInfo.id} perfectamente actualizado`);
          history.push("seguimiento");
        })
        .catch((err) => {
          alert("hubo un error");
          console.log(err.response);
        });
    } else {
      axios
        .post(`${api_ui}/contratos/registro`, contratoInfo)
        .then((result) => {
          console.log(result);
          alert(`contrato ${result.data.insertId} exitosamente registrado`);
          history.push("seguimiento");
        })
        .catch((err) => {
          alert("hubo un error");
          console.log(err.response);
        });
    }
  };

  useEffect(() => {
    if (state) {
      axios
        .all([
          axios.get(`${api_ui}/inmuebles/${state.contratoInfo.id_inmueble}`),
          axios.get(`${api_ui}/clientes/${state.contratoInfo.id_cliente}`),
          axios.get(
            `${api_ui}/contratos/contrato/${state.contratoInfo.tipo}/${state.contratoInfo.id}`
          ),
        ])
        .then((resArr) => {
          setContratoInfo({
            ...contratoInfo,
            id: state.contratoInfo.id,
            legal: {
              derechos_cliente: state.contratoInfo.derechos_cliente,
              obligaciones_cliente: state.contratoInfo.obligaciones_cliente,
              derechos_empresa: state.contratoInfo.derechos_empresa,
              obligaciones_empresa: state.contratoInfo.obligaciones_empresa,
              proposito: state.contratoInfo.proposito,
              direccion_fiscal: state.contratoInfo.direccion_fiscal,
              fecha_consignacion: state.contratoInfo.fecha_consignacion,
              clausulas: state.contratoInfo.clausulas,
              condicion_propiedad: state.contratoInfo.condicion_propiedad,
            },
            cliente: resArr[1].data[0],
            inmueble: resArr[0].data[0],
            id_solicitud: state.contratoInfo.id_solicitud,
            modo_contrato: {
              ...resArr[2].data[0],
              tipo: state.contratoInfo.tipo,
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });

      setMensaje("Registrar nuevas condiciones");
    } else {
      getData_Contratos_Solicitudes();
    }
  }, []);

  /*el react-select si le pasa un objeto como value no se coloca en azul */
  return (
    <>
      <Navbar />
      {state ? null : (
        <Buscador /* buscador de contratos o solicitudes */
          accion={accionBuscador}
          solicitudOpciones={solicitudes}
          contratoOpciones={contratos}
          contratoInfo={contratoInfo}
          setAccion={setAccionBuscador}
          setMensaje={setMensaje}
          setContratoInfo={setContratoInfo}
        />
      )}

      <ContratoForm /* formulario de contrato */
        contratoInfo={contratoInfo}
        modos_contrato={modos_contrato}
        mensaje={mensaje} /* mensaje de registro o actualizacion */
        handleSubmit={handleSubmit}
        setContratoInfo={setContratoInfo}
      />

      <Footer />
    </>
  );
}

export default withRouter(View1);
