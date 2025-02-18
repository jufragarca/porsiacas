import React, { useState } from "react";
import { AuthContext } from "../contextos/AuthContextUsuarios"; // Importa el contexto de autenticación

export function AuthProviderUsuarios({ children }: { children: React.ReactNode }) {
  const [isAuthenticatedUsuario, setIsAuthenticatedUsuario] = useState(false);

  const loginUsuario = () => {
    setIsAuthenticatedUsuario(true); // Cambia el estado de autenticación
  };

  return (
    <AuthContext.Provider value={{ isAuthenticatedUsuario, setIsAuthenticatedUsuario, loginUsuario }}>
      {children}
    </AuthContext.Provider>
  );
}
