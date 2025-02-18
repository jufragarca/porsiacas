//auth-front/src/routes/signup.tsx

import React, { useState } from "react"; // Importa React y useState
import { Navigate, useNavigate } from "react-router-dom"; // Importa Navigate y useNavigate
import { useAuth } from "../contextos/useAuth"; // Importa el hook useAuth
import { AuthResponse, AuthResponseError } from "../types/types"; 
import { API_URL } from "../auth/authConstants"; // Asegúrate de que esta ruta sea correcta
import DefaultLayout from "../layout/DefaultLayout"; // Importa DefaultLayout

export default function Signup() {
  const [nit, setNit] = useState("");
  const [nombre_empresa, setNombreEmpresa] = useState("");
  const [correo_empresa, setCorreoEmpresa] = useState("");
  const [nombre_contacto, setNombreContacto] = useState("");
  const [celular_contacto, setCelularContacto] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();
  const goTo = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!nit || !nombre_empresa || !correo_empresa || !nombre_contacto || !celular_contacto || !password) {
      return setErrorResponse("Todos los campos son requeridos");
    }

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(correo_empresa)) {
      return setErrorResponse("Correo electrónico no válido");
    }

    try {
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
        const json = (await response.json()) as AuthResponse;
        console.log(json);
        setNit("");
        setNombreEmpresa("");
        setCorreoEmpresa("");
        setNombreContacto("");
        setCelularContacto("");
        setPassword("");
        goTo("/");
      } else {
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);
      }
    } catch (error) {
      console.log(error);
      setErrorResponse("Hubo un problema con la solicitud. Intenta nuevamente.");
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit} className="signup-form">
        <h1>Signup</h1>
        {!!errorResponse && <div className="error-message">{errorResponse}</div>}
        <label>NIT</label>
        <input type="text" name="nit" onChange={(e) => setNit(e.target.value)} value={nit} />
        <label>Nombre de la Empresa</label>
        <input type="text" name="nombre_empresa" onChange={(e) => setNombreEmpresa(e.target.value)} value={nombre_empresa} />
        <label>Correo de la Empresa</label>
        <input type="email" name="correo_empresa" onChange={(e) => setCorreoEmpresa(e.target.value)} value={correo_empresa} />
        <label>Nombre de Contacto</label>
        <input type="text" name="nombre_contacto" onChange={(e) => setNombreContacto(e.target.value)} value={nombre_contacto} />
        <label>Celular de Contacto</label>
        <input type="text" name="celular_contacto" onChange={(e) => setCelularContacto(e.target.value)} value={celular_contacto} />
        <label>Password</label>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
        <button type="submit">Create account</button>
      </form>
    </DefaultLayout>
  );
}
