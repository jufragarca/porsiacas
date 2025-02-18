//auth-front/src/layout/DefaultLayout.tsx
import { Link } from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Modal from "react-modal";

// Define el elemento raíz de tu aplicación
Modal.setAppElement("#root"); // Asumiendo que tu app está dentro de un div con id="root"

interface DefaultLayoutProps {
  children?: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      {/* Encabezado con navegación */}
      <header className="bg-light py-3">
        <nav className="container text-center">
          <h1>
            <Link to="/" className="text-decoration-none text-dark">
              {/* Aquí puedes agregar el nombre de la app o logo */}
              Mi Aplicación
            </Link>
          </h1>
          <div className="mt-3">
            <ul className="list-unstyled d-flex justify-content-center gap-3">
              <li>
                <Link to="/" className="btn btn-outline-primary">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="btn btn-outline-secondary">
                  Signup
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="btn btn-outline-secondary">
                  Dashboard
                </Link>
              </li>
              <li>
  <Link to="/login-usuario" className="btn btn-outline-secondary">
    Login Usuario
  </Link>
</li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Contenido principal */}
      <main className="container">{children}</main>

      {/* Pie de página */}
      <footer className="bg-light py-3 text-center">
        <p>© 2024 Mi Empresa</p>
      </footer>
    </>
  );
}
