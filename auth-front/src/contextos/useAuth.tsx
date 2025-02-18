// Este es el tercer archivo en tu estructura, que corresponde a useAuth.tsx.
// Este archivo define un hook personalizado para acceder al contexto de autenticación de manera sencilla.
// Utiliza useContext para obtener el valor del AuthContext y lanza un error si se intenta usar fuera del AuthProvider.

import { useContext } from "react"; // Importa useContext para acceder al contexto
import { AuthContext } from "../contextos/AuthContext"; // Importa el contexto de autenticación desde el archivo AuthContext.tsx
//AuthContext: Se importa desde el archivo AuthContext.tsx. Aquí es donde defines el contexto, que contiene el 
// //estado de autenticación (isAuthenticated), la función setIsAuthenticated, y la función login

// 2. Crea un hook personalizado para acceder al contexto de autenticación
export const useAuth = () => {
  // 3. Obtiene el contexto de autenticación utilizando useContext
  const context = useContext(AuthContext); 

  // 4. Verifica si el contexto es undefined (lo que significa que no está dentro de un AuthProvider)
  if (context === undefined) {
    // Lanza un error si se usa fuera del proveedor de contexto
    throw new Error("useAuth debe ser usado dentro de un AuthProvider"); 
  }

  // 5. Devuelve el contexto, que incluye el estado de autenticación y las funciones proporcionadas (login, setIsAuthenticated, etc.)
  return context; 
};
