import React, { createContext, useContext, useState, ReactNode } from "react";

// Definimos la estructura del usuario EMPRESA
export interface Empresa {
  id_empresa: number;
  nombre: string;
  correo: string;
}

// Definimos el contexto de autenticación
interface AuthContextType {
  user: Empresa | null;
  login: (userData: Empresa) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Empresa | null>(null);

  const login = (userData: Empresa) => {
    setUser(userData);
    console.log("Empresa autenticada:", userData);
  };

  const logout = () => {
    localStorage.removeItem("id_empresa");
    sessionStorage.removeItem("id_empresa");
    setUser(null);
    console.log("Empresa cerró sesión");
  };
  

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder a la autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
