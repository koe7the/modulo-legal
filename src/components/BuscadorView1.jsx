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

    setContratoInfo({
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
                setContratoInfo({
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
                setContratoInfo({
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
              } else {
                axios
                  .all([
                    axios.get(`${api_ui}/inmuebles/${e.value.id_inmueble}`),
                    axios.get(`${api_ui}/clientes/${e.value.id_cliente}`),
                    axios.get(
                      `${api_ui}/contratos/contrato/${e.value.tipo}/${e.value.id}`
                    ),
                  ])
                  .then((resArr) => {
                    setContratoInfo({
                      ...contratoInfo,
                      id: e.value.id,
                      legal: {
                        derechos_cliente: e.value.derechos_cliente,
                        obligaciones_cliente: e.value.obligaciones_cliente,
                        derechos_empresa: e.value.derechos_empresa,
                        obligaciones_empresa: e.value.obligaciones_empresa,
                        proposito: e.value.proposito,
                        direccion_fiscal: e.value.direccion_fiscal,
                        fecha_consignacion: e.value.fecha_consignacion,
                        clausulas: e.value.clausulas,
                        condicion_propiedad: e.value.condicion_propiedad,
                      },
                      cliente: resArr[1].data[0],
                      inmueble: resArr[0].data[0],
                      id_solicitud: e.value.id_solicitud,
                      modo_contrato: {
                        ...resArr[2].data[0],
                        tipo: e.value.tipo,
                      },
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
