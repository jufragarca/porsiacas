// auth-front/src/routes/ProtectedRoute.tsx
//ARCHIVO 3 

// 1. Importa Outlet y Navigate desde "react-router-dom"
// Outlet se usa para renderizar rutas anidadas.
// Navigate se usa para redirigir a otra ruta si es necesario.
import { Outlet, Navigate } from "react-router-dom"; 

// 2. Importa el hook useAuth para acceder al contexto de autenticación
import { useAuth } from "../contextos/useAuth"; 

/**
 * Componente que protege las rutas
 * Verifica si el usuario está autenticado o redirige a otra ruta
 */
export default function ProtectedRoute() { 
  // 3. Obtiene el valor de isAuthenticated desde el contexto usando el hook useAuth.
  const { isAuthenticated } = useAuth(); 

  // 4. Si el usuario está autenticado, renderiza las rutas hijas (Outlet).
  // Si no está autenticado, redirige al usuario a la página de inicio ("/").
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />; 
}