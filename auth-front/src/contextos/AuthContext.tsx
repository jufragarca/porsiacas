// auth-front/src/contextos/AuthContext.tsx
//1. Contexto de Autenticación (AuthContext.tsx)
// este es el ARCHIVO NUMERO UNO
//Este archivo define el contexto de autenticación que se utilizará en toda la aplicación. 
// Aquí defines el tipo de datos que tendrá el contexto, que incluye:

//isAuthenticated: Un booleano que indica si el usuario está autenticado.
//setIsAuthenticated: Una función para actualizar el estado de autenticación.
//login: Una función que se utilizará para autenticar al usuario.

import { createContext } from "react"; 
//
// 2. Paso 1: Definir el tipo de datos que tendrá el contexto
interface AuthContextType {
  isAuthenticated: boolean; // Indica si el usuario está autenticado (true o false).
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>; // Función para actualizar el estado de autenticación.
  login: () => void; // Función para autenticar al usuario. 

  /*
   * Definición de void:
   * En TypeScript, void es un tipo que se utiliza para indicar que una función no retorna un valor.
   * Esto es útil para funciones que realizan acciones (como cambiar el estado, hacer una llamada a una API, etc.)
   * pero no necesitan devolver un resultado.
   * 
   * Ejemplo de Uso:
   * En tu caso, la función login se utiliza para cambiar el estado de autenticación a true
   * cuando un usuario inicia sesión. No necesita devolver un valor, solo realiza la acción de actualizar el estado.
   */
}

// 3. Paso 2: Crear el contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined); 

// 4. Paso 3: Exportar el contexto para que pueda ser utilizado en otros componentes.
export { AuthContext };