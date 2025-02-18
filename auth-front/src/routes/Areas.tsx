import React from "react";
import { Link } from "react-router-dom";

// Componente para la ruta "areas"
const Areas = () => {
  return (
    <div className="text-center">
      <h1>Hola, bienvenido a las áreas</h1>
      <p>Este es el contenido de la ruta /areas.</p>
      <Link to="/" className="btn btn-outline-primary">
        Volver al inicio
      </Link>
    </div>
  );
};

export default Areas;
