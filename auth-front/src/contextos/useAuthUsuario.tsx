
//auth-front/src/contextos/useAuthUsuario.tsx
// Este archivo define un hook personalizado para acceder al contexto de autenticación.
// Proporciona una forma sencilla de interactuar con el contexto de autenticación en los componentes de React.

import { useContext } from "react"; // Importa useContext para acceder al contexto
import { AuthContext } from "../contextos/AuthContextUsuarios"; // Importa el contexto de autenticación definido en AuthContextUsuarios.tsx

/**
 * Hook personalizado: useAuthUsuarios
 * Este hook facilita el acceso al contexto de autenticación y asegura que solo se utilice dentro de un AuthProvider.
 * 
 * @returns El contexto de autenticación, que incluye:
 * - isAuthenticatedUsuario: Indica si el usuario está autenticado.
 * - setIsAuthenticatedUsuario: Función para actualizar el estado de autenticación.
 * - loginUsuario: Función para autenticar al usuario.
 * 
 * @throws Error si el hook se utiliza fuera de un AuthProvider.
 */
export const useAuthUsuarios = () => {
  // Obtiene el contexto de autenticación utilizando useContext
  const context = useContext(AuthContext);

  // Verifica si el contexto es undefined (lo que significa que no está dentro de un AuthProvider)
  if (context === undefined) {
    // Lanza un error si se intenta usar el hook fuera del proveedor de contexto
    throw new Error("useAuthUsuarios debe ser usado dentro de un AuthProviderUsuarios");
  }

  // Devuelve el contexto, que incluye el estado y las funciones proporcionadas
  return context;
};
