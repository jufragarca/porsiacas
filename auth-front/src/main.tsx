import React from "react"; // Importa React
import ReactDOM from "react-dom/client"; // Importa ReactDOM para renderizar la aplicación
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Importa Router para manejar las rutas

// Importación de proveedores
import { AuthProvider } from "./auth/AuthProvider"; // Proveedor general de autenticación
import { CargoProvider } from "./contextos/CargoContext"; // Proveedor para el contexto de cargos
import { AuthProviderUsuarios } from "./auth/AuthProviderUsuario"; // Proveedor específico para usuarios

// Importación de los componentes de ruta
import Login from "./routes/login"; // Componente de inicio de sesión
import Signup from "./routes/signup"; // Componente de registro
import LoginUsuario from "./routes/LoginUsuario"; // Componente de inicio de sesión de usuario
import Dashboard from "./routes/dashboard"; // Componente del Dashboard
import DashboardUsuarios from "./routes/dashboardUsuarios"; // Componente del Dashboard de usuarios

// Definición de las rutas de la aplicación
const router = createBrowserRouter([
  {
    path: "/", // Ruta principal
    element: <Login />, // Página de inicio
  },
  {
    path: "/login-usuario", // Ruta para LoginUsuario
    element: (
      <AuthProviderUsuarios> {/* Proveedor específico para LoginUsuario */}
        <LoginUsuario /> {/* Componente de LoginUsuario */}
      </AuthProviderUsuarios>
    ),
  },
  {
    path: "/dashboardUsuarios", // Ruta para el Dashboard de usuarios
    element: (
      <AuthProviderUsuarios> {/* Asegúrate de envolver DashboardUsuarios con el proveedor de autenticación */}
        <DashboardUsuarios /> {/* Componente de DashboardUsuarios */}
      </AuthProviderUsuarios>
    ),
  },
  {
    path: "/signup", // Ruta para el registro
    element: <Signup />, // Página de registro
  },
  {
    path: "/dashboard", // Ruta para el Dashboard
    element: <Dashboard />, // Componente del Dashboard
  },
]);

// Renderización de la aplicación
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider> {/* Proveedor general de autenticación */}
      <CargoProvider> {/* Proveedor para contexto de cargos */}
        <RouterProvider router={router} /> {/* Proveedor de rutas */}
      </CargoProvider>
    </AuthProvider>
  </React.StrictMode>
);
