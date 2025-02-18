// Definir la interfaz Cargo
interface Cargo {
  id: number;
  nombre: string;
  id_empresa: number;
  id_area: number;
}

import { API_URL } from "../auth/authConstants";

// ModificarCargos con tipo específico
export const ModificarCargos = async (
  cargoSeleccionado: Cargo, // Usar la interfaz Cargo
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setMensaje: React.Dispatch<React.SetStateAction<string>>
) => {
  if (cargoSeleccionado) {
    const cargoModificar = {
      id: cargoSeleccionado.id,
      nombre: cargoSeleccionado.nombre,
      id_empresa: cargoSeleccionado.id_empresa,
      id_area: cargoSeleccionado.id_area,
    };

    console.log("Datos a modificar:", cargoModificar);

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/ModificarCargos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cargoModificar),
      });

      if (response.ok) {
        const jsonData = await response.json();
        setMensaje(jsonData.mensaje || "Datos modificados exitosamente.");
      } else {
        const errorText = await response.text();
        setMensaje("Hubo un error al modificar el cargo.");
      }
    } catch (error) {
      console.error("Error al modificar el cargo:", error);
      setMensaje("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }
};
