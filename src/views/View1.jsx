import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Select from "react-select";
import { Consulta } from "../components/Consulta";
import "../styles/vista1.css";

export default function View1() {
  /* contrato a mostrar en plantilla */
  const [contrato, setContrato] = useState("");
  /* informacion del formulario del contrato */
  const [contratoInfo, setContratoInfo] = useState({
    modo_contrato: "contado",
  });
  /* cliente para el formulario */
  const [cliente, setCliente] = useState("");
  /* modo de pago de propiedad */
  const [modo, setModo] = useState("");
  /* mensaje del formulario */
  const [mensaje, setMensaje] = useState("realizar registro");

  const opciones_contrato = [
    { label: "contrato 1", value: "datos" },
    { label: "contrato 2", value: "datosssss" },
  ];

  const opciones_cliente = [
    {
      label: "cliente 1",
      value: {
        nombre: "carlos",
        apellido: "sanchez",
      },
    },
    {
      label: "cliente 2",
      value: {
        nombre: "manuel",
        apellido: "perez",
      },
    },
  ];

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
      {/* select para buscar informacion del cliente a mostrar */}
      <div className="search-select">
        <Select
          options={opciones_contrato}
          isSearchable
          isClearable
          className="filtro"
          placeholder="Actualizar/Registrar contrato"
          onChange={() => {
            setMensaje("realizar actualizacion");
          }}
        />
      </div>
      {/* formulario de contrato */}
      <div className="form">
        <h2 className="form-title">Historial de contratos</h2>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          {/* select para mostrar la informacion del comprador */}
          <div className="row">
            <div className="col-6">
              <h2 className="form-section">Información del comprador</h2>
              <div className="form-input">
                <div className="form-input">
                  <label htmlFor="cliente">Cliente</label>
                  <Select
                    options={opciones_cliente}
                    id="cliente"
                    isSearchable
                    isClearable
                    className="filtro"
                    placeholder="Seleccione un usuario"
                    onChange={(e) => {
                      if (e === null) {
                        setCliente("");
                      } else {
                        setCliente(e.value);
                        setContratoInfo({
                          ...contratoInfo,
                          cliente: e.value,
                        });
                      }
                    }}
                  />
                </div>

                <div className="cliente-output">
                  <ul>
                    <li>nombre del cliente: {cliente.nombre}</li>
                    <li>apellido del cliente: {cliente.apellido}</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* informacion de la propiedad */}
            <div className="col-6">
              <h2 className="form-section"> Información de la propiedad</h2>
              <div className="form-input">
                <label htmlFor="tipo-inmueble">Tipo de inmueble</label>
                <input
                  type="text"
                  id="tipo-inmueble"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="form-input">
                <label htmlFor="direccion">Direccion</label>
                <input
                  type="text"
                  id="direccion"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="form-input">
                <label htmlFor="codigo-postal">Codigo postal</label>
                <input
                  type="number"
                  id="codigo-postal"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="form-input">
                <label htmlFor="nro-propiedad">Nro de propiedad</label>
                <input
                  type="number"
                  id="nro-propiedad"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <h2 className="form-section">Modalidad de pago</h2>
              <div className="form-input">
                <Select
                  options={modos_contrato}
                  isClearable
                  className="filtro"
                  onChange={(e) => {
                    if (e === null) {
                      setModo("");
                    } else if (e !== null) {
                      setModo(e.value);
                      setContratoInfo({
                        ...contratoInfo,
                        modo_contrato: e.value,
                      });
                    }
                  }}
                />
              </div>
              {/* inputs de a contado o credito */}
              {modo === "credito" ? (
                <div>
                  <div className="form-input">
                    <label htmlFor="">Monto de credito</label>
                    <input
                      type="number"
                      name="monto_credito_numerico"
                      placeholder="monto numerico"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                    <input
                      style={{ marginTop: "1rem" }}
                      type="text"
                      name="monto_credito_texto"
                      placeholder="monto en texto"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>

                  <div className="form-input">
                    <label htmlFor="">Cantidad de cuotas</label>
                    <input
                      type="number"
                      placeholder="cantidad en numeros"
                      name="cantidad_cuotas"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="form-input">
                    <label htmlFor="">Tasa de interes</label>
                    <input
                      type="number"
                      placeholder="tasa en numeros"
                      name="tasa_interes"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="form-input">
                    <label htmlFor="">Monto de cuotas</label>
                    <input
                      type="number"
                      placeholder="monto numerico"
                      name="monto_cuotas"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="form-input">
                  <label htmlFor="">Monto</label>
                  <input
                    type="number"
                    placeholder="monto numerico"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <input
                    style={{ marginTop: "1rem " }}
                    type="text"
                    placeholder="monto en texto"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
              )}
            </div>
            {/* informacion legal */}
            <div className="col-6">
              <h2 className="form-section">Información legal y clausulas</h2>
              <div className="form-input">
                <label htmlFor="derechos-cliente">Derechos de cliente</label>
                <textarea
                  cols="45"
                  rows="5"
                  id="derechos-cliente"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                ></textarea>
              </div>
              <div className="form-input">
                <label htmlFor="obligaciones-cliente">
                  Obligaciones de cliente
                </label>
                <textarea
                  cols="45"
                  rows="5"
                  id="obligaciones-cliente"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                ></textarea>
              </div>

              <div className="form-input">
                <label htmlFor="derechos-empresa">Derechos Empresariales</label>
                <textarea
                  cols="45"
                  rows="5"
                  type="text"
                  id="derechos-empresa"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="form-input">
                <label htmlFor="obligaciones-empresa">
                  Obligaciones Empresariales
                </label>
                <textarea
                  cols="45"
                  rows="5"
                  type="text"
                  id="obligaciones-empresa"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>

              <div className="form-input">
                <label htmlFor="clausulas">Clausulas</label>
                <textarea
                  cols="45"
                  rows="5"
                  id="clausulas"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                ></textarea>
              </div>
              <div className="form-input">
                <label htmlFor="fecha-entrega">Fecha de entrega</label>
                <input
                  type="date"
                  id="fecha-entrega"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="form-input">
                <label htmlFor="condiciones-entrega-propiedad">
                  Condiciones de entrega de la propiedad
                </label>
                <textarea
                  cols="45"
                  rows="5"
                  id="condiciones-entrega-propiedad"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                ></textarea>
              </div>
            </div>
          </div>
          <button
            style={{ marginTop: "1rem", fontSize: "1.3rem" }}
            type="submit"
            className="boton"
          >
            {mensaje}
          </button>
        </form>
      </div>
      <Consulta />
      <Footer />
    </>
  );
}
