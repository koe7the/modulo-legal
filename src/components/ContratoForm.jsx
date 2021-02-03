import React from "react";
import Select from "react-select";

function ContratoForm(props) {
  const {
    mensaje,

    modos_contrato,
    contratoInfo,
    setContratoInfo,
    handleSubmit,
  } = props;

  const cliente = contratoInfo.cliente || null;
  const inmueble = contratoInfo.inmueble || null;
  const legal = contratoInfo.legal || null;
  const modo = contratoInfo.modo_contrato || null;

  const handleChangeModo = (e) => {
    setContratoInfo({
      ...contratoInfo,
      modo_contrato: {
        ...contratoInfo.modo_contrato,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleChangeLegal = (e) => {
    setContratoInfo({
      ...contratoInfo,
      legal: {
        ...contratoInfo.legal,
        [e.target.name]: e.target.value,
      },
    });
  };

  const getFormattedDate = () => {
    if (contratoInfo.cliente) {
      const date = new Date(contratoInfo.cliente.fecha_nacimiento);
      const dia = date.getDate();
      const mes = date.getMonth() + 1;
      const ano = date.getFullYear();

      return `${dia}/${mes}/${ano}`;
    }
  };

  return (
    <div className="form">
      <h2 className="form-title">Historial de contratos</h2>
      <form onSubmit={handleSubmit}>
        {/* select para mostrar la informacion del comprador */}
        <div className="row">
          {/* informacion del cliente */}
          <div className="col-6">
            <h2 className="form-section">Información del comprador</h2>
            <div className="form-input">
              <div className="cliente-output">
                {cliente !== null ? (
                  <ul>
                    <li>
                      <b>ID:</b> {cliente.id}
                    </li>
                    <li>
                      <b>Nombres:</b> {cliente.nombres}
                    </li>
                    <li>
                      <b>Apellidos:</b> {cliente.apellidos}
                    </li>
                    <li>
                      <b>Genero:</b> {cliente.genero}
                    </li>
                    <li>
                      <b>Cedula:</b> {cliente.cedula}
                    </li>
                    <li>
                      <b>Fecha de nacimiento:</b> {getFormattedDate()}
                    </li>
                    <li>
                      <b>Numero de contacto:</b> {cliente.numero_contacto}
                    </li>
                    <li>
                      <b>Correo electronico:</b> {cliente.correo_electronico}
                    </li>
                    <li>
                      <b>RIF:</b> {cliente.rif}
                    </li>
                    <li>
                      <b>Cuenta bancaria:</b> {cliente.cuenta_bancaria}
                    </li>
                    <li>
                      <b>Direccion fiscal:</b> {cliente.direccion_fiscal}
                    </li>
                    <li>
                      <b>Sueldo:</b> {cliente.sueldo} Bfs
                    </li>
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
          {/* informacion de la propiedad */}
          <div className="col-6">
            <h2 className="form-section"> Información de la propiedad</h2>
            <div className="form-input">
              <div className="cliente-output">
                {inmueble !== null ? (
                  <ul>
                    <li>
                      <b>ID propiedad:</b> {inmueble.id}
                    </li>
                    <li>
                      <b>Direccion:</b> {inmueble.direccion}
                    </li>
                    <li>
                      <b>Codigo postal:</b> {inmueble.codigo_postal}{" "}
                    </li>
                    <li>
                      <b>Descripcion:</b> {inmueble.descripcion}{" "}
                    </li>
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {/* modalidad de pago */}
          <div className="col-6">
            <h2 className="form-section">Modalidad de pago</h2>
            <div className="form-input">
              <Select
                options={modos_contrato}
                className="filtro"
                isSearchable={false}
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
                    setContratoInfo({
                      ...contratoInfo,
                      modo_contrato: {
                        tipo: e.value,
                      },
                    });
                  }
                }}
              />
            </div>
            {/* inputs de a contado o credito */}
            {contratoInfo.modo_contrato.id === 0 ? null : contratoInfo
                .modo_contrato.tipo === "contado" ? (
              <div>
                <div className="form-input">
                  <label>Monto inicial</label>
                  <input
                    type="number"
                    placeholder="Monto inicial"
                    name="monto_inicial"
                    value={modo.monto_inicial}
                    onChange={handleChangeModo}
                  />
                </div>
                <div className="form-input">
                  <label>Monto total</label>
                  <input
                    type="number"
                    placeholder="Monto total"
                    name="monto_total"
                    value={modo.monto_total}
                    onChange={handleChangeModo}
                  />
                </div>
                <div className="form-input">
                  <label>Modalidad de pago</label>
                  <input
                    type="text"
                    placeholder="Modalidad de pago"
                    name="modalidad_pago"
                    value={modo.modalidad_pago}
                    onChange={handleChangeModo}
                  />
                </div>
                <div className="form-input">
                  <label>Justificaion de pago</label>
                  <textarea
                    name="justificacion_pago"
                    cols="30"
                    rows="5"
                    value={modo.justificacion_pago}
                    onChange={handleChangeModo}
                  ></textarea>
                </div>
                <div className="form-input">
                  <label>Tipo de persona</label>
                  <input
                    type="text"
                    placeholder="Tipo de persona"
                    name="tipo_persona"
                    value={modo.tipo_persona}
                    onChange={handleChangeModo}
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="form-input">
                  <label>Cantidad de cuotas </label>
                  <input
                    type="number"
                    placeholder="Cantidad de cuotas"
                    name="cantidad_cuotas"
                    value={modo.cantidad_cuotas}
                    onChange={handleChangeModo}
                  />
                </div>
                <div className="form-input">
                  <label>Monto de cuotas</label>
                  <input
                    type="text"
                    placeholder="Monto de cuotas"
                    name="monto_cuotas"
                    value={modo.monto_cuotas}
                    onChange={handleChangeModo}
                  />
                </div>
                <div className="form-input">
                  <label>Tasa de interes</label>
                  <input
                    type="number"
                    placeholder="tasa de interes"
                    name="tasa_interes"
                    value={modo.tasa_interes}
                    onChange={handleChangeModo}
                  />
                </div>
                <div className="form-input">
                  <label>Tipo de persona</label>
                  <input
                    type="text"
                    name="tipo_persona"
                    placeholder="tipo de persona"
                    value={modo.tipo_persona}
                    onChange={handleChangeModo}
                  />
                </div>
                <div className="form-input">
                  <label>Razon social</label>
                  <textarea
                    cols="30"
                    rows="5"
                    name="razon_social"
                    value={modo.razon_social}
                    onChange={handleChangeModo}
                  ></textarea>
                </div>
                <div className="form-input">
                  <label>Cantidad otorgada</label>
                  <input
                    type="number"
                    placeholder="Cantidad otorgada"
                    name="cantidad_otorgada"
                    value={modo.cantidad_otorgada}
                    onChange={handleChangeModo}
                  />
                </div>
                <div className="form-input">
                  <label>Plazo</label>
                  <input type="date" name="plazo" onChange={handleChangeModo} />
                </div>
              </div>
            )}
          </div>
          {/* informacion legal */}
          <div className="col-6">
            <h2 className="form-section">Información legal y clausulas</h2>
            <div>
              <div className="form-input">
                <label>Direccion fiscal</label>
                <input
                  type="text"
                  onChange={handleChangeLegal}
                  name="direccion_fiscal"
                  value={legal.direccion_fiscal}
                />
              </div>
              <div className="form-input">
                <label>Proposito</label>
                <textarea
                  cols="45"
                  rows="5"
                  name="proposito"
                  value={legal.proposito}
                  onChange={handleChangeLegal}
                ></textarea>
              </div>
              <div className="form-input">
                <label>Derechos de cliente</label>
                <textarea
                  cols="45"
                  rows="5"
                  name="derechos_cliente"
                  value={legal.derechos_cliente}
                  onChange={handleChangeLegal}
                ></textarea>
              </div>
              <div className="form-input">
                <label>Obligaciones de cliente</label>
                <textarea
                  cols="45"
                  rows="5"
                  name="obligaciones_cliente"
                  value={legal.obligaciones_cliente}
                  onChange={handleChangeLegal}
                ></textarea>
              </div>

              <div className="form-input">
                <label>Derechos Empresariales</label>
                <textarea
                  cols="45"
                  rows="5"
                  name="derechos_empresa"
                  value={legal.derechos_empresa}
                  onChange={handleChangeLegal}
                />
              </div>
              <div className="form-input">
                <label>Obligaciones Empresariales</label>
                <textarea
                  cols="45"
                  rows="5"
                  name="obligaciones_empresa"
                  value={legal.obligaciones_empresa}
                  onChange={handleChangeLegal}
                />
              </div>

              <div className="form-input">
                <label>Clausulas</label>
                <textarea
                  cols="45"
                  rows="5"
                  id="clausulas"
                  name="clausulas"
                  value={legal.clausulas}
                  onChange={handleChangeLegal}
                ></textarea>
              </div>
              <div className="form-input">
                <label>Condicion de la propiedad</label>
                <textarea
                  cols="45"
                  rows="5"
                  name="condicion_propiedad"
                  value={legal.condicion_propiedad}
                  onChange={handleChangeLegal}
                ></textarea>
              </div>
              <div className="form-input">
                <label>Fecha de consignacion</label>
                <input
                  type="date"
                  name="fecha_consignacion"
                  onChange={handleChangeLegal}
                />
              </div>
            </div>
          </div>
        </div>
        {/* boton submit */}
        <button
          style={{ marginTop: "1rem", fontSize: "1.3rem" }}
          type="submit"
          className="boton"
        >
          {mensaje}
        </button>
      </form>
    </div>
  );
}

export default ContratoForm;
