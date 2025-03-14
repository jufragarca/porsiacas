import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 📌 Importación de proveedores de autenticación
import { AuthProvider } from "./auth/AuthProvider"; // Contexto para otro tipo de autenticación (usuarios genéricos)
import { AuthProviderUsuario } from "./auth/AuthProviderUsuario"; // Contexto de autenticación para empleados

// 📌 Importación de los componentes de ruta
import Login from "./routes/login";
import Signup from "./routes/signup";
import Dashboard from "./routes/dashboard";
import LoginUsuario from "./routes/LoginUsuario";
import DashboardUsuarios from "./routes/dashboardUsuarios";

// 📌 Definición de las rutas de la aplicación
const router = createBrowserRouter([
  { path: "/", element: <Login /> }, // Ruta para el login principal
  { path: "/login-usuario", element: <LoginUsuario /> }, // Ruta para login de usuario

  { path: "/dashboard-usuario", element: <DashboardUsuarios /> }, // 🔹 Asegúrate de que la ruta sea esta
  { path: "/signup", element: <Signup /> }, // Ruta para el registro de nuevos usuarios
  { path: "/dashboard", element: <Dashboard /> }, // Ruta para el dashboard general
]);

// 📌 Renderización de la aplicación
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider> {/* Proveedor de autenticación general */}
      <AuthProviderUsuario> {/* Proveedor de autenticación para empleados */}
        <RouterProvider router={router} /> {/* Proveedor de enrutamiento */}
      </AuthProviderUsuario>
    </AuthProvider>
  </React.StrictMode>
);
