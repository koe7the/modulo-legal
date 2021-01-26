import React from "react";
import Select from "react-select";

function BuscadorView1(props) {
  const {
    solicitudOpciones,
    contratoOpciones,
    setMensaje,
    accion,
    setAccion,
  } = props;

  const handleOptionChange = (e) => {
    setAccion(e.target.value);
    setMensaje(e.target.nextElementSibling.innerHTML);
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
            Registrar Solicitud
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
            Actualizar contrato
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
          />
        </div>
      ) : null}
    </div>
  );
}

export default BuscadorView1;
