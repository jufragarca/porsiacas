
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// 📌 Definimos la estructura del usuario EMPLEADO
export interface Empleado {
  id: number;
  id_cargo: number;
  id_empresa: number;
  jefe: number;
  nombre: string;
  correo: string;
  telefono: string;
  PASSWORD: string;
}

// 📌 Definimos la interfaz del contexto de autenticación
interface AuthContextType {
  userEmpleado: Empleado | null; // Estado que almacena el usuario autenticado o null si no hay sesión activa
  login: (userData: Empleado, remember: boolean) => void; // Función para iniciar sesión con opción de recordar sesión
  logout: () => void; // Función para cerrar sesión
}

// 📌 Creamos el contexto de autenticación para empleados
const AuthContextEmpleado = createContext<AuthContextType | undefined>(undefined);
// Este contexto permitirá acceder a la autenticación desde cualquier componente de la aplicación.

export const AuthProviderUsuario: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 📌 Estado para almacenar el usuario autenticado
  const [userEmpleado, setUserEmpleado] = useState<Empleado | null>(null);

  // 📌 Efecto que carga el usuario autenticado desde `localStorage` o `sessionStorage` al iniciar la app
  useEffect(() => {
    // 📌 Buscamos si hay un usuario almacenado en `localStorage` o `sessionStorage`
    const storedUser = localStorage.getItem("userEmpleado") || sessionStorage.getItem("userEmpleado");

    if (storedUser) {
      // 📌 Si encontramos datos, los convertimos de JSON a objeto y los guardamos en el estado
      setUserEmpleado(JSON.parse(storedUser));
    }
  }, []); // 📌 Este efecto se ejecuta solo una vez al montar el componente

  // 📌 Función para iniciar sesión con opción de recordar sesión
  const login = (userData: Empleado, remember: boolean) => {
    setUserEmpleado(userData); // Guardamos los datos en el estado de React
    console.log("Empleado autenticado:", userData); // Mensaje en consola para depuración

    // 📌 Decidimos dónde almacenar la información del usuario según `remember`
    const storage = remember ? localStorage : sessionStorage;
    
    // 📌 Guardamos el usuario en el almacenamiento elegido
    storage.setItem("userEmpleado", JSON.stringify(userData));
  };

  // 📌 Función para cerrar sesión
  const logout = () => {
    // 📌 Eliminamos los datos almacenados tanto en `localStorage` como en `sessionStorage`
    localStorage.removeItem("userEmpleado");
    sessionStorage.removeItem("userEmpleado");

    // 📌 Limpiamos el estado de autenticación
    setUserEmpleado(null);
    
    console.log("Sesión cerrada"); // Mensaje en consola para depuración
  };

  return (
    // 📌 Proporcionamos el contexto de autenticación a toda la aplicación
    <AuthContextEmpleado.Provider value={{ userEmpleado, login, logout }}>
      {children}
    </AuthContextEmpleado.Provider>
  );
};

// 📌 Hook personalizado para acceder al contexto de autenticación en otros archivos
export const useAuthEmpleado = () => {
  const context = useContext(AuthContextEmpleado); // 📌 Accedemos al contexto de autenticación

  // 📌 Si el contexto no está definido, lanzamos un error (esto previene mal uso del hook)
  if (!context) throw new Error("useAuthEmpleado debe usarse dentro de AuthProviderUsuario");

  return context; // 📌 Devolvemos el contexto de autenticación
};

/*
📌 **Explicación de cómo usar este contexto en otros archivos**
---------------------------------------------------------
🔹 **1️⃣ `useAuthEmpleado`**
   - Se usa en cualquier componente que necesite acceder a la autenticación.
   - Ejemplo: `Login.tsx` puede usarlo para llamar `login()`.

🔹 **2️⃣ `AuthProviderUsuario`**
   - Debe envolver toda la aplicación en `main.tsx` o en el archivo donde manejes el enrutamiento.
   - Permite que todos los componentes dentro de la aplicación accedan al contexto.

🔹 **3️⃣ `login(userData, remember)`**
   - Se usa en `Login.tsx` para iniciar sesión.
   - Si `remember` es `true`, guarda la sesión en `localStorage` (se mantiene después de cerrar el navegador).
   - Si `remember` es `false`, guarda la sesión en `sessionStorage` (se borra al cerrar el navegador).

🔹 **4️⃣ `logout()`**
   - Se usa en `Dashboard.tsx` o cualquier componente que maneje el cierre de sesión.
   - Borra la sesión eliminando los datos del empleado y limpiando el estado.
*/
