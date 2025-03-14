import React, { createContext, useContext, useEffect, useState } from "react";

// 1️⃣ Definir el tipo del contexto
interface IdContextType {
  id: string | null;
  setId: React.Dispatch<React.SetStateAction<string | null>>;
}

// 2️⃣ Crear el contexto con un valor inicial `null`
const IdContext = createContext<IdContextType | null>(null);

// 3️⃣ Definir el tipo de `children`
interface IdProviderProps {
  children: React.ReactNode;
}

// 4️⃣ Crear el proveedor del contexto
export const IdProvider: React.FC<IdProviderProps> = ({ children }) => {
  const [id, setId] = useState<string | null>(localStorage.getItem("id"));

  useEffect(() => {
    if (id) {
      localStorage.setItem("id", id);
    }
  }, [id]);

  return (
    <IdContext.Provider value={{ id, setId }}>
      {children}
    </IdContext.Provider>
  );
};

// 5️⃣ Hook personalizado para acceder al contexto
export const useId = (): IdContextType => {
  const context = useContext(IdContext);
  if (!context) {
    throw new Error("useId debe usarse dentro de un IdProvider");
  }
  return context;
};
