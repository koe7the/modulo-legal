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

/* cosas a considerar:
  -la vista de refinanciamiento cuando se activa el proceso, la vista redirecciona a la vista de actualizacion de contrato con la info del contrato ya cargada para solo cambiar las condiciones de pago del credito renovado, esto se validaria en un useEffect para que identifique si la vista esta siendo cargada mediante un redireccionamiento o una carga normal, y dependiendo de que setearia la data en los estados.


  -los datos de la propiedad deberian ser solamente visualizados, ya que estos ya estan previamente cargados con la solicitud.
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

  /* estado del formulario del contrato */
  const [contratoInfo, setContratoInfo] = useState({
    modo_contrato: "contado",
  });

  //opciones de solicitudes y contratos
  const [contratos, setContratos] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  //informacion del cliente
  const [cliente, setCliente] = useState({});

  //funciones para obtener la informacion del cliente, inmueble y los contratos y solicitudes
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

  const getSolicitud_inmueble = (id) => {
    axios
      .get(`${api_ui}/solicitudes/${id}`)
      .then((result) => {
        axios
          .get(`${api_ui}/inmuebles/${result.data[0].id_inmueble}`)
          .then((result) => {
            setContratoInfo({
              ...contratoInfo,
              ...result.data[0],
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getData_Contratos_Solicitudes = () => {
    axios
      .all([
        axios.get(`${api_ui}/contratos`),
        axios.get(`${api_ui}/solicitudes`),
      ])
      .then(async (responseArr) => {
        //seteando las opciones para el buscador

        const [resContratos, resSolicitudes] = responseArr;

        resContratos.data.forEach((contrato) => {
          let cuerpo = { label: contrato.id, value: contrato };
          setContratos([...contratos, cuerpo]);
        });

        resSolicitudes.data.forEach((solicitud) => {
          let cuerpo = { label: solicitud.id, value: solicitud };
          setSolicitudes([...solicitudes, cuerpo]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  useEffect(() => {
    getData_Contratos_Solicitudes();
  }, []);

  /*el react-select si le pasa un objeto como value no se coloca en azul */
  return (
    <>
      <Navbar />
      {/* buscador de contratos o solicitudes */}
      <Buscador
        accion={accionBuscador}
        solicitudOpciones={solicitudes}
        contratoOpciones={contratos}
        contratoInfo={contratoInfo}
        getCliente={getCliente}
        getSolicitud_inmueble={getSolicitud_inmueble}
        setAccion={setAccionBuscador}
        setMensaje={setMensaje}
        setContratoInfo={setContratoInfo}
        setCliente={setCliente}
      />

      {/* formulario de contrato */}
      <ContratoForm
        contratoInfo={contratoInfo}
        setContratoInfo={setContratoInfo}
        modos_contrato={modos_contrato}
        cliente={cliente}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        /* mensaje de registro o actualizacion */
        mensaje={mensaje}
      />
      <button
        onClick={() => {
          console.log(contratoInfo);
        }}
      >
        PA VER
      </button>
      <Footer />
    </>
  );
}
