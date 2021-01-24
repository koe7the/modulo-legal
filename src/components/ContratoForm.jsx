import React from "react";
import Select from "react-select";

function ContratoForm(props) {
  const {
    handleChange,
    handleSubmit,
    cliente,
    mensaje,
    modo,
    setContratoInfo,
    contratoInfo,
    setModo,
    modos_contrato,
  } = props;
  return (
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
              <div className="cliente-output">
                <ul>
                  <li>nombre del cliente: {cliente}</li>
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
  );
}

export default ContratoForm;
