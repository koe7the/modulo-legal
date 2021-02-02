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
    setAccion,
    setMensaje,
    setContratoInfo,
  } = props;

  const handleOptionChange = (e) => {
    setAccion(e.target.value);
    setMensaje(e.target.nextElementSibling.innerHTML);
    setContratoInfo({ modo_contrato: "contado" });
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
                setContratoInfo({});
              } else {
                axios
                  .all([
                    axios.get(`${api_ui}/inmuebles/${e.value.id_inmueble}`),
                    axios.get(`${api_ui}/clientes/${e.value.id_cliente}`),
                  ])
                  .then((resultArr) => {
                    setContratoInfo({
                      ...contratoInfo,
                      id_solicitud: e.value.id,
                      inmueble: resultArr[0].data[0],
                      cliente: resultArr[1].data[0],
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
                setContratoInfo({});
              } else {
                axios
                  .get(`${api_ui}/solicitudes/${e.value.id_solicitud}`)
                  .then((result) => {
                    axios
                      .all([
                        axios.get(
                          `${api_ui}/inmuebles/${result.data[0].id_inmueble}`
                        ),
                        axios.get(
                          `${api_ui}/clientes/${result.data[0].id_cliente}`
                        ),
                      ])
                      .then((resArr) => {
                        setContratoInfo({
                          ...contratoInfo,
                          cliente: resArr[1].data[0],
                          inmueble: resArr[0].data[0],
                          id_solicitud: e.value.id_solicitud,
                        });
                      })
                      .catch((err) => {
                        console.log(err);
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
    </div>
  );
}

export default BuscadorView1;
