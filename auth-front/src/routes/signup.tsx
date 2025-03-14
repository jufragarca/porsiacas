import React, { useState } from "react"; // IMPORTAMOS REACT Y EL HOOK useState PARA MANEJAR EL ESTADO LOCAL
import { useNavigate } from "react-router-dom"; // IMPORTAMOS useNavigate PARA NAVEGACIÓN PROGRAMÁTICA
import { API_URL } from "../auth/authConstants"; // IMPORTAMOS LA CONSTANTE CON LA URL DEL API
import DefaultLayout from "../layout/DefaultLayout"; // IMPORTAMOS EL LAYOUT GENERAL

export default function Signup() {
  // DEFINIMOS ESTADOS PARA CADA CAMPO DEL FORMULARIO
  const [nit, setNit] = useState("");
  const [nombre_empresa, setNombreEmpresa] = useState("");
  const [correo_empresa, setCorreoEmpresa] = useState("");
  const [nombre_contacto, setNombreContacto] = useState("");
  const [celular_contacto, setCelularContacto] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // ESTADO PARA RECORDAR SESIÓN
  const [errorResponse, setErrorResponse] = useState("");
  const [isRegistered, setIsRegistered] = useState(false); // NUEVO ESTADO PARA CONTROLAR LA REDIRECCIÓN

  const goTo = useNavigate(); // OBTENEMOS LA FUNCIÓN PARA NAVEGACIÓN

  async function handleSubmit(e: React.FormEvent) {  // Usamos FormEvent para evitar el error de tipo
    e.preventDefault(); // EVITAMOS QUE EL FORMULARIO SE RECARGUE

    // VALIDAMOS QUE TODOS LOS CAMPOS ESTÉN LLENOS
    if (!nit || !nombre_empresa || !correo_empresa || !nombre_contacto || !celular_contacto || !password) {
      return setErrorResponse("Todos los campos son requeridos");
    }

    // VALIDAMOS FORMATO DEL CORREO ELECTRÓNICO
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(correo_empresa)) {
      return setErrorResponse("Correo electrónico no válido");
    }

    try {
      // ENVIAMOS LOS DATOS AL SERVIDOR PARA REGISTRO
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nit,
          nombre_empresa,
          correo_empresa,
          nombre_contacto,
          celular_contacto,
          password,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        // LIMPIAMOS LOS CAMPOS DEL FORMULARIO
        setNit("");
        setNombreEmpresa("");
        setCorreoEmpresa("");
        setNombreContacto("");
        setCelularContacto("");
        setPassword("");
        setIsRegistered(true); // MARCAMOS EL ESTADO COMO REGISTRADO EXITOSAMENTE
        setErrorResponse(""); // LIMPIAMOS CUALQUIER ERROR PREVIO
      } else {
        const json = await response.json();
        setErrorResponse(json.body.error); // MOSTRAMOS ERROR SI FALLA EL REGISTRO
      }
    } catch (error) {
      console.log(error);
      setErrorResponse("Hubo un problema con la solicitud. Intenta nuevamente.");
    }
  }

  // SI EL REGISTRO FUE EXITOSO, REDIRIGIMOS AL LOGIN
  if (isRegistered) {
    goTo("/"); // Redirige al login
    return null; // Evita que se renderice algo mientras ocurre la redirección
  }

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit} className="signup-form mb-3">
        <h1>Signup</h1>
        {!!errorResponse && <div className="alert alert-danger">{errorResponse}</div>}

        <div className="row mb-3">
          <div className="col">
            <label className="form-label">NIT</label>
            <input type="text" className="form-control" value={nit} onChange={(e) => setNit(e.target.value)} />
          </div>
          <div className="col">
            <label className="form-label">Nombre de la Empresa</label>
            <input type="text" className="form-control" value={nombre_empresa} onChange={(e) => setNombreEmpresa(e.target.value)} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Correo de la Empresa</label>
            <input type="email" className="form-control" value={correo_empresa} onChange={(e) => setCorreoEmpresa(e.target.value)} />
          </div>
          <div className="col">
            <label className="form-label">Nombre de Contacto</label>
            <input type="text" className="form-control" value={nombre_contacto} onChange={(e) => setNombreContacto(e.target.value)} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Celular de Contacto</label>
            <input type="text" className="form-control" value={celular_contacto} onChange={(e) => setCelularContacto(e.target.value)} />
          </div>
          <div className="col">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>

        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" id="rememberMe" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
          <label className="form-check-label" htmlFor="rememberMe">Recordarme</label>
        </div>

        <button type="submit" className="btn btn-primary w-100">Create account</button>
      </form>
    </DefaultLayout>
  );
}
