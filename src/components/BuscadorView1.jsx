import axios from "axios";
import React from "react";
import Select from "react-select";
import api_ui from "../api_ui";

function BuscadorView1(props) {
  const {
    accion,
    solicitudOpciones,
    contratoOpciones,
    contratoInfo,
    getCliente,
    getSolicitud_inmueble,
    setAccion,
    setMensaje,
    setCliente,
    setContratoInfo,
  } = props;

  const handleOptionChange = (e) => {
    setAccion(e.target.value);
    setMensaje(e.target.nextElementSibling.innerHTML);
    setCliente({});
    setContratoInfo({});
  };

  return (
    <div>
      {/* radio buttons para seleccionar la accion (registrar o actualizar) */}
      <div id="accion-selector" onChange={handleOptionChange}>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value="actualizacion"
          />
          <label className="form-check-label" htmlFor="inlineRadio1">
            Actualizar contrato
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value="registro"
          />
          <label className="form-check-label" htmlFor="inlineRadio2">
            Registrar Solicitud
          </label>
        </div>
      </div>

      {accion === "registro" ? (
        <div className="search-select">
          <Select
            options={solicitudOpciones}
            isSearchable
            isClearable
            className="filtro2"
            placeholder="Buscar solicitud a registrar"
            onChange={(e) => {
              if (e === null) {
                setCliente({});
                setContratoInfo({});
              } else {
                getCliente(e.value.id_cliente);

                axios
                  .get(`${api_ui}/inmuebles/${e.value.id_inmueble}`)
                  .then((result) => {
                    setContratoInfo({
                      ...contratoInfo,
                      ...result.data[0],
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }}
          />
        </div>
      ) : null}

      {accion === "actualizacion" ? (
        <div className="search-select">
          <Select
            options={contratoOpciones}
            isSearchable
            isClearable
            className="filtro2"
            placeholder="seleccionar contrato a actualizar"
            onChange={(e) => {
              if (e === null) {
                setCliente({});
                setContratoInfo({});
              } else {
                getCliente(e.value.id_cliente);
                getSolicitud_inmueble(e.value.id_solicitud);
              }
            }}
          />
        </div>
      ) : null}
    </div>
  );
}

export default BuscadorView1;
