//auth-front/src/rutasController/ListarAreasController.tsx
import { API_URL } from "../auth/authConstants";

interface Area {
  id: number;
  nombre: string;
  id_empresa: number;
}

export const obtenerAreas = async (
  idEmpresa: number
): Promise<Area[] | null> => {
  const requestData = { id_empresa: idEmpresa };
  const jsonString = JSON.stringify(requestData);

  try {
    const response = await fetch(`${API_URL}/ListarAreas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonString,
    });

    // Imprimir el objeto completo de la respuesta
    console.log("Respuesta completa del backend:", response);

    // Verificar si la respuesta es exitosa
    if (response.ok) {
      // Intentar convertir la respuesta a JSON
      const data = await response.json();
      console.log("Datos del backend:", data);

      // Verificar si los datos están dentro de 'data' y acceder a 'areas'
      return Array.isArray(data.data.areas) ? data.data.areas : [];
    } else {
      console.error("Error al cargar las áreas.");
      return null;
    }
  } catch (error) {
    console.error("Error en la solicitud de áreas:", error);
    return null;
  }
};