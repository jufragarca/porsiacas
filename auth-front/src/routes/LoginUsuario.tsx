import { Navigate, useNavigate } from "react-router-dom";
import { useAuthUsuarios } from "../contextos/useAuthUsuario";
import { AuthResponse } from "../types/typesUsuario"; // Importar las interfaces correctas
import { API_URL } from "../auth/authConstants";
import { useState } from "react";
import React from "react"; // Importar React y hooks necesarios
import DefaultLayout from "../layout/DefaultLayout"; // Importa el DefaultLayout

export default function Login() {
  // 1. Declaración de estados para el formulario
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [errorResponse, setErrorResponse] = useState('');
  
  // 2. Obtener el contexto de autenticación y la función de navegación
  const auth = useAuthUsuarios();
  const goTo = useNavigate();

  // 4. Si el usuario ya está autenticado, redirigir al dashboard
  if (auth.isAuthenticatedUsuario) {
    return <Navigate to="/dashboardUsuarios" />;
  }

  // 5. Función para manejar el envío del formulario
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validación de campos
    if (!correo || !telefono || !password) {
      return setErrorResponse("Todos los campos son requeridos");
    }

    // Validación del formato del correo
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(correo)) {
      return setErrorResponse("Correo electrónico no válido");
    }

    const dataToSend = { correo, telefono, password };

    try {
      // Enviar los datos al backend
      const jsonString = JSON.stringify(dataToSend);
      console.log("Datos a enviar al backend:", jsonString);

      const response = await fetch(`${API_URL}/LoginUsuario`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsonString,
      });

      const json = await response.json() as AuthResponse;
      console.log("Datos recibidos del backend:", json);

      // --ESTA ES LA MANERA ADECUADA DE SACAR LOS RESULTADOS SIN QUE GENERE ERRORS--
      if (response.ok) {
        if (json.resultado && Array.isArray(json.resultado)) {
          const idEnviar = json.resultado?.[0]?.id;
          if (idEnviar) {
            console.log("Autenticando usuario, cambiando estado de autenticación a true", idEnviar);
            auth.loginUsuario(); // Cambiar el estado de autenticación
            goTo(`/dashboardUsuarios?id=${idEnviar}`); // Redirigir con el ID
          }
        }

        // Manejo de la autenticación y redirección
        const idEnviar = json.resultado?.[0]?.id;
        if (!idEnviar) {
          setErrorResponse("No se pudo obtener el ID del usuario.");
          return;
        }
      } else {
        console.error("Error en la respuesta del backend. Status:", response.status);
      }

      // Redirigir al dashboard después de autenticar
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit}>
        {/* 14. Aquí van los campos del formulario */}
        <div>
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="tel"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          {errorResponse && <p style={{ color: "red" }}>{errorResponse}</p>}
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </DefaultLayout>
  );
}
