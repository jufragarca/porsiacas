import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";
import DefaultLayout from "../layout/DefaultLayout";

export default function Login() {
  const [nit, setNit] = useState("");
  const [correoEmpresa, setCorreoEmpresa] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  
  const auth = useAuth();
  const goTo = useNavigate();

  if (auth.user) {
    return <Navigate to="/dashboard" />;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (!nit || !correoEmpresa || !password) {
      return setErrorResponse("Todos los campos son requeridos");
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nit, correo_empresa: correoEmpresa, password }),
      });

      const json = await response.json();

      if (response.ok) {
        const userResponse = json.body?.user;
        const id_empresa = userResponse.id;

        if (id_empresa) {
          if (rememberMe) {
            localStorage.setItem("id_empresa", id_empresa.toString());
          } else {
            sessionStorage.setItem("id_empresa", id_empresa.toString());
          }

          auth.login(id_empresa);
          goTo("/dashboard");
        }
      } else {
        setErrorResponse(json?.body?.error || "Error en la autenticación.");
      }
    } catch (error) {
      setErrorResponse("Hubo un error al procesar la solicitud.");
    }
  }

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>NIT:</label>
          <input type="text" value={nit} onChange={(e) => setNit(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input type="email" value={correoEmpresa} onChange={(e) => setCorreoEmpresa(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
        </div>
        <div className="form-group form-check">
          <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="form-check-input" />
          <label className="form-check-label">Recordarme</label>
        </div>
        {errorResponse && <p className="error-message">{errorResponse}</p>}
        <button type="submit" className="btn btn-primary">Iniciar sesión</button>
      </form>
    </DefaultLayout>
  );
}