import React from "react";
import Select from "react-select";

function ContratoForm(props) {
  const {
    mensaje,
    seleccionado,
    modos_contrato,
    contratoInfo,
    setContratoInfo,
    handleSubmit,
    setSeleccionado,
  } = props;

  const cliente = contratoInfo.cliente || null;
  const inmueble = contratoInfo.inmueble || null;

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
                    <li>ID: {cliente.id} </li>
                    <li>Nombres: {cliente.nombres}</li>
                    <li>Apellidos: {cliente.apellidos} </li>
                    <li>Genero: {cliente.genero} </li>
                    <li>Cedula: {cliente.cedula} </li>
                    <li>Fecha de nacimiento: {cliente.fecha_nacimiento}</li>
                    <li>Numero de contacto: {cliente.numero_contacto} </li>
                    <li>Correo electronico: {cliente.correo_electronico} </li>
                    <li>RIF: {cliente.rif} </li>
                    <li>Cuenta bancaria: {cliente.cuenta_bancaria} </li>
                    <li>Direccion fiscal: {cliente.direccion_fiscal} </li>
                    <li>Sueldo: {cliente.sueldo} Bfs </li>
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
                    <li>ID propiedad: {inmueble.id}</li>
                    <li>Direccion: {inmueble.direccion}</li>
                    <li>Codigo postal: {inmueble.codigo_postal} </li>
                    <li>Descripcion: {inmueble.descripcion} </li>
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
                  setContratoInfo({
                    ...contratoInfo,
                    modo_contrato: {
                      tipo: e.value,
                    },
                  });

                  setSeleccionado(true);
                }}
              />
            </div>
            {/* inputs de a contado o credito */}
            {seleccionado === false ? null : contratoInfo.modo_contrato.tipo ===
              "contado" ? (
              <div>
                <div className="form-input">
                  <label>Monto inicial</label>
                  <input
                    type="number"
                    placeholder="Monto inicial"
                    name="monto_inicial"
                    onChange={handleChangeModo}
                  />
                </div>
                <div className="form-input">
                  <label>Monto total</label>
                  <input
                    type="number"
                    placeholder="Monto total"
                    name="monto_total"
                    onChange={handleChangeModo}
                  />
                </div>
                <div className="form-input">
                  <label>Modalidad de pago</label>
                  <input
                    type="text"
                    placeholder="Modalidad de pago"
                    name="modalidad_pago"
                    onChange={handleChangeModo}
                  />
                </div>
                <div className="form-input">
                  <label>Justificaion de pago</label>
                  <textarea
                    name="justificacion_pago"
                    cols="30"
                    rows="5"
                    onChange={handleChangeModo}
                  ></textarea>
                </div>
                <div className="form-input">
                  <label>Tipo de persona</label>
                  <input
                    type="text"
                    placeholder="Tipo de persona"
                    name="tipo_persona"
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
                    onChange={handleChangeModo}
                  />
                </div>
                <div className="form-input">
                  <label>Monto de cuotas</label>
                  <input
                    type="text"
                    name="monto_cuotas"
                    placeholder="Monto de cuotas"
                    onChange={handleChangeModo}
                  />
                </div>
                <div className="form-input">
                  <label>Tasa de interes</label>
                  <input
                    type="number"
                    placeholder="tasa de interes"
                    onChange={handleChangeModo}
                    name="tasa_interes"
                  />
                </div>
                <div className="form-input">
                  <label>Tipo de persona</label>
                  <input
                    type="text"
                    name="tipo_persona"
                    onChange={handleChangeModo}
                    placeholder="tipo de persona"
                  />
                </div>
                <div className="form-input">
                  <label>Razon social</label>
                  <textarea
                    name="razon_social"
                    cols="30"
                    rows="5"
                    onChange={handleChangeModo}
                  ></textarea>
                </div>
                <div className="form-input">
                  <label>Cantidad otorgada</label>
                  <input
                    type="number"
                    placeholder="Cantidad otorgada"
                    onChange={handleChangeModo}
                    name="cantidad_otorgada"
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
            <div className="form-input">
              <label>Direccion fiscal</label>
              <textarea
                cols="45"
                rows="5"
                name="direccion_fiscal"
                onChange={handleChangeLegal}
              ></textarea>
            </div>
            <div className="form-input">
              <label>Proposito</label>
              <textarea
                cols="45"
                rows="5"
                name="proposito"
                onChange={handleChangeLegal}
              ></textarea>
            </div>
            <div className="form-input">
              <label>Derechos de cliente</label>
              <textarea
                cols="45"
                rows="5"
                name="derechos_cliente"
                onChange={handleChangeLegal}
              ></textarea>
            </div>
            <div className="form-input">
              <label>Obligaciones de cliente</label>
              <textarea
                cols="45"
                rows="5"
                name="obligaciones_cliente"
                onChange={handleChangeLegal}
              ></textarea>
            </div>

            <div className="form-input">
              <label>Derechos Empresariales</label>
              <textarea
                cols="45"
                rows="5"
                name="derechos_empresa"
                onChange={handleChangeLegal}
              />
            </div>
            <div className="form-input">
              <label>Obligaciones Empresariales</label>
              <textarea
                cols="45"
                rows="5"
                name="obligaciones_empresa"
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
                onChange={handleChangeLegal}
              ></textarea>
            </div>
            <div className="form-input">
              <label>Condicion de la propiedad</label>
              <textarea
                cols="45"
                rows="5"
                name="condicion_propiedad"
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
