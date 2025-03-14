import { API_URL } from "../auth/authConstants";
import { obtenerCargos } from "./ListarCargosParaCargos"; // Asegúrate de importar la función correcta

interface Cargo {
  id: number;
  nombre: string;
  id_area: number;
  id_empresa: number; // El campo 'id_empresa' es el que corresponde en la base de datos
}

export const ModificarCargos = async (
  cargoSeleccionado: Cargo,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setMensaje: React.Dispatch<React.SetStateAction<string>>,
  setCargos: React.Dispatch<React.SetStateAction<Cargo[]>>, // ✅ Agregamos esto
  id_empresa: number | null // ✅ Necesario para recargar cargos después de modificar
) => {
  setLoading(true); // Iniciamos el loading
  try {
    // Enviamos la solicitud POST para modificar el cargo
    const response = await fetch(`${API_URL}/ModificarCargos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cargoSeleccionado), // Aquí usamos el cargoSeleccionado tal cual está
    });

    // Verificamos si la respuesta es exitosa
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.mensaje || "Error al modificar el cargo.");
    }

    const jsonData = await response.json();
    setMensaje(jsonData.mensaje || "✅ Cargo modificado correctamente.");

    // Recargamos los cargos después de la modificación
    if (id_empresa) {
      const cargosActualizados = await obtenerCargos(id_empresa); // Usamos 'id_empresa' correctamente aquí
      if (cargosActualizados) {
        setCargos(cargosActualizados);
      } else {
        setCargos([]); // Si no se obtienen cargos, aseguramos que se mantenga el estado vacío
      }
    }
  } catch (error) {
    console.error("Error al modificar el cargo:", error);
    setMensaje("❌ No se pudo conectar con el servidor.");
  } finally {
    setLoading(false); // Terminamos el loading
  }
};
