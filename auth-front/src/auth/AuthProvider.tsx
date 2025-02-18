//ARCHIVO 2 
// auth-front/src/auth/AuthProvider.tsx
//ESTE ES EL ARCHIVO NUMERO DOS 
//2. Crear el Proveedor de Autenticación (AuthProvider):
//El AuthProvider es un componente que se encarga de manejar el estado de autenticación y 
// //de proporcionar ese estado a los componentes hijos. Este es el componente que usas para envolver tu aplicación o las partes que necesitan acceso al contexto.


//2. Proveedor de Autenticación (AuthProvider.tsx)
//Este archivo implementa el proveedor de autenticación que utiliza el contexto definido en AuthContext.tsx. 
// Aquí es donde se maneja el estado de autenticación y se proporciona la función login a los componentes hijos.


import { useState } from "react"; 
import { AuthContext } from "../contextos/AuthContext"; 

// 2. Paso 1: Crear el proveedor de autenticación
export function AuthProvider({ children }: { children: React.ReactNode }) { 
  // 3. Paso 2: Estado para manejar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  // 4. Paso 3: Función para autenticar al usuario
  const login = () => {// ¿Cómo se llama a la función login?
    setIsAuthenticated(true); // Cambia el estado a autenticacion
    //La función login se define dentro del AuthProvider y se pasa como parte del valor del contexto. Esto significa que 
    // //cualquier componente que consuma este contexto (a través del hook useAuth) podrá acceder a la función login.

  };

  // 5. Paso 4: Proveer el contexto a los componentes hijos
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login }}>
      {children} {/* Renderiza los componentes hijos */}
    </AuthContext.Provider>
  );
}