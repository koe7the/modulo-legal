import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="contenedor-footer">
        <div className="content-foo">
          <h4>Instituto</h4>
          <p>Instituto Universitario "Jesús Obrero"</p>
        </div>
        <div className="content-foo">
          <h4>Email:</h4>
          <p>Dhenisse64@gmail.com</p>
          <p>koe7the@gmail.com</p>
          <p>Yonnyjosu@gmail.com</p>
        </div>
        <div className="content-foo">
          <h4>Locación:</h4>
          <p>Caracas, Venzuela.</p>
        </div>
      </div>
      <h2 className="footer-autores">
        &copy; Fabian Salazar|Dhenisse Velásquez|Yonny Antuárez
      </h2>
    </footer>
  );
}
