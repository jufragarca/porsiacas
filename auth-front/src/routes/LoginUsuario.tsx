import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../auth/authConstants"; // URL del API
import { useAuthEmpleado } from '../auth/AuthProviderUsuario'; // Importamos el hook para autenticación

const LoginUsuario = () => {
  const navigate = useNavigate();
  const { login } = useAuthEmpleado(); // Usamos el hook para acceso a la autenticación
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [PASSWORD, setPassword] = useState(""); // 'PASSWORD' en mayúsculas
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Verificando lo que se está enviando al backend
    console.log({
      correo, // Correo
      telefono, // Teléfono
      PASSWORD, // Contraseña
    });
  
    try {
      const response = await fetch(`${API_URL}/loginEmpleado`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo, // Correo
          telefono, // Teléfono
          PASSWORD, // Contraseña
        }),
      });
  
      const data = await response.json();
      console.log("Respuesta del backend:", data);

      // Verificamos que la respuesta sea la esperada
      if (response.ok && data.status === 200) {
        // Si el login es exitoso, pasamos los datos al contexto
        login(data.resultado[0], true); // Aquí le pasamos al contexto el usuario y 'true' para recordar la sesión
        navigate("/dashboard-usuario"); // Redirigimos al dashboard
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error al hacer la solicitud de login:", error);
      alert("Hubo un error al intentar iniciar sesión");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-header">
          <h5>Formulario de Ingreso</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
                type="tel"
                className="form-control"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={PASSWORD}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Iniciar sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginUsuario;
