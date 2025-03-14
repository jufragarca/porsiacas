import React, { useState } from "react";
import { API_URL } from "../auth/authConstants";
import ListarCargos from "../routes/ListarCargos"; // ✅ PASO 1: Importar el componente que lista los cargos

// Tipos definidos para los parámetros
type CargoData = {
  nombre: string;
  id_area: number;
  id_empresa: number | null;
};

// ✅ PASO 2: Función para enviar datos al backend y actualizar la lista de cargos
export const enviarDatos = async (
  cargoData: CargoData,
  actualizarCargos: () => void, // Función para actualizar la lista de cargos
  setMensajeExito: React.Dispatch<React.SetStateAction<string | null>>,
  setMensajeError: React.Dispatch<React.SetStateAction<string | null>>,
  setNombre: React.Dispatch<React.SetStateAction<string>>,
  setIdArea: React.Dispatch<React.SetStateAction<number>> // ✅ Se espera un número
) => {
  try {
    console.log("🟢 Iniciando envío de datos...");
    console.log("📌 Datos enviados:", cargoData);

    // ✅ PASO 3: Validación de datos antes de enviarlos
    if (!cargoData.nombre.trim() || !cargoData.id_area) {
      console.error("❌ Validación fallida: Nombre y área son obligatorios.");
      setMensajeError("❌ El nombre del cargo y el área son obligatorios.");
      return;
    }

    console.log("✅ Validación pasada, enviando solicitud al backend...");

    // ✅ PASO 4: Enviar los datos al backend
    const response = await fetch(`${API_URL}/cargosConsultaCrear`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cargoData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Error al enviar los datos");
    }

    console.log("✅ Cargo creado correctamente.");
    setMensajeExito("✅ Cargo creado correctamente.");
    setMensajeError(null);

   
    // ✅ PASO 6: Limpiar el formulario después de crear el cargo
    setTimeout(() => {
      setMensajeExito(null);
      setNombre("");
      setIdArea(0); // ✅ Ahora usa número en lugar de string
    }, 5000);
  } catch (error) {
    // ✅ PASO 7: Manejo de errores en caso de fallo en la petición
    if (error instanceof Error) {
      console.error("❌ Error al enviar los datos:", error);
      setMensajeError(`❌ ${error.message || "Error al crear el cargo."}`);
    } else {
      console.error("❌ Error desconocido:", error);
      setMensajeError("❌ Error desconocido al crear el cargo.");
    }
    setMensajeExito(null);
  }
};

// ✅ PASO 8: Componente principal para crear un cargo y mostrar la lista de cargos
const GuardarCargo: React.FC = () => {
  // 🔹 Estado para mostrar un mensaje de éxito después de crear un cargo
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  // 🔹 Estado para mostrar un mensaje de error si la creación del cargo falla
  const [mensajeError, setMensajeError] = useState<string | null>(null);

  // 🔹 Estado para almacenar el nombre del cargo que el usuario ingresa
  const [nombre, setNombre] = useState<string>("");

  // 🔹 Estado para almacenar el ID del área seleccionada por el usuario
  const [idArea, setIdArea] = useState<number>(0); // ✅ Cambiado a número para evitar problemas de conversión

  return (
    <div>
      {/* 🔹 Título del formulario de creación de cargos */}
      <h1>Crear Cargo</h1>

      {/* ✅ PASO 9: Mostrar la lista de cargos llamando a ListarCargos */}
      {/* 🔹 El componente ListarCargos se encarga de obtener los datos de la API */}
      {/* 🔹 Se le pasa el parámetro id_empresa={1}, lo que significa que listará los cargos de la empresa con ID 1 */}
      {/* 🔹 Cuando GuardarCargo se vuelve a renderizar (por ejemplo, tras agregar un nuevo cargo), ListarCargos ejecuta su lógica de actualización automáticamente */}
      <ListarCargos id_empresa={1} /> 
    </div>
  );
};

export default GuardarCargo;
