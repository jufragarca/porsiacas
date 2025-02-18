import React, { createContext, useState, useContext, useEffect } from "react";
import { API_URL } from "../auth/authConstants";

// Paso 1: Definimos la interfaz para los datos del área.
interface AreaData { 
  nombre_area: string; // Nombre del área
  id_Empresa: string; // ID de la empresa
}
console.log("entramos a AreasContext");
// Paso 2: Creamos el contexto para almacenar los datos del área.
const AreaContext = createContext<{
  areaData: AreaData | null; // Datos del área
  setAreaData: (data: AreaData) => void; // Función para actualizar los datos del área
}>( {
  areaData: null, // Inicialmente no hay datos
  setAreaData: () => {}, // Función vacía por defecto
});

// Paso 3: Creamos el AreaProvider que envuelve a toda la aplicación.
export const AreaProvider = ({ children }: { children: React.ReactNode }) => {
  const [areaData, setAreaData] = useState<AreaData | null>(null); // Estado para los datos del área

  // Paso 4: useEffect para monitorear cambios en areaData.
  useEffect(() => {
    if (areaData) {
      console.log("Datos recibidos en el contexto (AreaData):", areaData); // Muestra en consola los datos del área
      DatosConAreasALaApiCrearAreas(areaData); // Llama a la función para cargar las áreas
    }
  }, [areaData]); // El efecto se ejecuta cada vez que `areaData` cambia

  // Definir la función para manejar la solicitud de creación de áreas
  const DatosConAreasALaApiCrearAreas = async (areaData: AreaData) => {
    try {
      // Realiza la solicitud al servidor
      const response = await fetch(`${API_URL}/areasConsultaCrear`, {
        method: "POST", // Método POST
        headers: { "Content-Type": "application/json" }, // Define el tipo de contenido
        body: JSON.stringify({ areaData: areaData }), // Envia los datos del área en el cuerpo de la solicitud
      });

      if (response.ok) { // Si la respuesta es exitosa
        const data = await response.json(); // Intenta parsear la respuesta como JSON
        console.log("Respuesta del servidor:", data); // Muestra la respuesta en consola
      } else {
        // Si la respuesta no es exitosa
        const errorData = await response.json(); // Intenta parsear el error
        console.error("Error al cargar áreas, detalles:", errorData); // Muestra el error en consola
        alert("Error al cargar las áreas: " + (errorData.body?.error || "Error desconocido"));
      }
    } catch (error) { // Captura errores relacionados con la conexión
      console.error("Error al cargar áreas:", error); // Muestra el error en consola
      alert("Error de conexión: No se pudo conectar con el servidor.");
    }
  };

  return (
    <AreaContext.Provider value={{ areaData, setAreaData }}>
      {children} {/* Paso 5: Proveemos el contexto a los componentes hijos */}
    </AreaContext.Provider>
  );
};

// Paso 6: Hook personalizado useArea.
export const useArea = () => {
  return useContext(AreaContext); // Retorna el contexto para que los componentes lo usen
};
