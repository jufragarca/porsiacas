import { createContext } from "react";

interface AuthContextType {
  isAuthenticatedUsuario: boolean;
  setIsAuthenticatedUsuario: React.Dispatch<React.SetStateAction<boolean>>;
  loginUsuario: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
