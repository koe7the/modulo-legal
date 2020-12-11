import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

function Navbar(props) {
  const [inicio, setInicio] = useState("nav-link hoverable ");
  const [status, setStatus] = useState("nav-link hoverable ");
  const [morosidad, setMorosidad] = useState("nav-link hoverable ");

  const { history } = props;
  const { pathname } = history.location;

  const checkLugar = () => {
    switch (pathname) {
      case "/":
        setInicio("nav-link hoverable active");
        break;

      case "/status":
        setStatus("nav-link hoverable active");
        break;

      case "/refinanciamiento":
        setMorosidad("nav-link hoverable active");
        break;

      case "/embargo":
        setMorosidad("nav-link hoverable active");
        break;

      default:
        return;
    }
  };

  useEffect(() => {
    checkLugar();
  });

  return (
    <>
      <header>
        <h1>
          <strong>Módulo Legal</strong>
        </h1>
      </header>
      <nav className="navbar sticky-top navbar-expand-lg  ">
        <div className="navbar-block">
          <ul className="navbar-nav">
            <li className="nav-item item-hoverable">
              <button
                className={inicio}
                onClick={() => {
                  history.push("/");
                }}
              >
                <strong>Actualizacion de contratos </strong>
              </button>
            </li>
            <li className="nav-item item-hoverable">
              <button
                className={status}
                onClick={() => {
                  history.push("/seguimiento");
                }}
              >
                <strong>Seguimiento de contratos </strong>
              </button>
            </li>

            <li className="nav-item dropdown item-hoverable">
              <span className={morosidad}>
                <strong>Morosidad legal</strong>
              </span>
              <div className="dropdown-content">
                <button
                  className="dropdown-content-item"
                  onClick={() => {
                    history.push("/refinanciamiento");
                  }}
                >
                  <strong>Refinanciamiento de contrato</strong>
                </button>
                <button
                  className="dropdown-content-item"
                  onClick={() => {
                    history.push("/embargo");
                  }}
                >
                  <strong>Embargo de propiedad</strong>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default withRouter(Navbar);
