//auth-front/src/routes/login.tsx
import React, { useState } from "react"; // Importa React y useState para manejar el estado del componente
import { Navigate, useNavigate } from "react-router-dom"; // Importa Navigate para redirigir y useNavigate para navegación programática
import { useAuth } from "../contextos/useAuth"; // Importa el hook useAuth para acceder al contexto de autenticación
import { AuthResponse, AuthResponseError } from "../types/types"; // Importa tipos para la respuesta del backend
import { API_URL } from "../auth/authConstants"; // Asegúrate de que esta ruta sea correcta
import DefaultLayout from "../layout/DefaultLayout"; // Importa el DefaultLayout

export default function Login() {
  // 1. Declaración de los estados para manejar los datos del formulario y errores
  const [nit, setNit] = useState(""); // Guarda el valor del NIT
  const [correoEmpresa, setCorreoEmpresa] = useState(""); // Guarda el valor del correo de la empresa
  const [password, setPassword] = useState(""); // Guarda el valor de la contraseña
  const [errorResponse, setErrorResponse] = useState(""); // Guarda el mensaje de error si ocurre alguno

  // 2. Llamada al hook personalizado para obtener el contexto de autenticación
  const auth = useAuth(); // Accede al contexto de autenticación
  const goTo = useNavigate(); // Función para redirigir al usuario a otra página

  // 3. Si el usuario ya está autenticado, redirige automáticamente al dashboard
  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />; // Redirige si ya está autenticado
  }

  // 4. Función que maneja el envío del formulario
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    // 5. Validación de campos vacíos
    if (!nit || !correoEmpresa || !password) {
      return setErrorResponse("Todos los campos son requeridos");
    }

    // 6. Validación del formato del correo electrónico
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(correoEmpresa)) {
      return setErrorResponse("Correo electrónico no válido");
    }

    // 7. Crear el objeto con los datos a enviar al backend
    const dataToSend = { nit, correo_empresa: correoEmpresa, password };

    // 8. Intentar convertir los datos a JSON y enviarlos al backend
    try {
      const jsonString = JSON.stringify(dataToSend); // Convierte los datos a formato JSON
      // console.log("Datos a enviar al backend:", jsonString); // Imprime los datos en la consola

      // 9. Enviar la solicitud POST al backend para verificar las credenciales
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsonString, // Enviar los datos JSON como cuerpo de la solicitud
      });

      // 10. Procesar la respuesta del backend
      const json = await response.json() as AuthResponse; // Intentar parsear la respuesta
      // console.log("Datos recibidos del backend:", json); // Imprimir los datos recibidos

      // 11. Si la respuesta es exitosa (status 200), actualiza el estado de autenticación
      if (response.ok) {
        const idEnviar = json.body?.user?.id_empresa; // Asegúrate de usar el campo correcto
        // console.log("ID a enviar:", idEnviar); // Verifica el ID

        if (idEnviar) {
          // 12. Limpiar los campos del formulario
          setNit("");
          setCorreoEmpresa("");
          setPassword("");

          // 13. Llamar a la función login para actualizar el estado de autenticación
          // console.log("Autenticando usuario, cambiando estado de autenticación a true", idEnviar);
          auth.login(); // Llama a la función login del contexto

          // 14. Verificar el estado de autenticación después de iniciar sesión
          // console.log("Estado de autenticación después de login:", auth.isAuthenticated);

          // 15. Redirigir al dashboard con el ID de la empresa
          goTo(`/dashboard?id=${idEnviar}`); // Redirige al dashboard
        }
      } else {
        // 16. Si la respuesta no es exitosa, muestra el error recibido
        const errorData = await response.json() as AuthResponseError;
        setErrorResponse(errorData.body.error);
      }
    } catch (error) {
      // 17. Manejo de errores en caso de que la solicitud falle
      console.error("Error en la solicitud:", error);
      setErrorResponse("Hubo un error al procesar la solicitud");
    }
  }

  return (
    <DefaultLayout> {/* Aquí envuelves el contenido de Login dentro de DefaultLayout */}
      <div>
        <h1>Login</h1>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>} {/* Muestra el mensaje de error si existe */}
        <form onSubmit={handleSubmit} className="signup-form mb-3">
 

  {/* Mostrar errores si existen */}
  {!!errorResponse && <div className="alert alert-danger">{errorResponse}</div>}

  {/* NIT */}
  <div className="mb-3">
    <label className="form-label">NIT</label>
    <input 
      type="text" 
      className="form-control"
      value={nit} 
      onChange={(e) => setNit(e.target.value)} 
    />
  </div>

  {/* Correo de la Empresa */}
  <div className="mb-3">
    <label className="form-label">Correo de la Empresa</label>
    <input
      type="email"
      className="form-control"
      value={correoEmpresa} 
      onChange={(e) => setCorreoEmpresa(e.target.value)} 
    />
  </div>

  {/* Contraseña */}
  <div className="mb-3">
    <label className="form-label">Password</label>
    <input
      type="password"
      className="form-control"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>

  {/* Botón de Enviar */}
  <button type="submit" className="btn btn-primary">Iniciar sesión</button>
</form>

      </div>
      
    </DefaultLayout> 
  );
}
