import { API_URL } from "../auth/authConstants";

interface Area {
  area_id: number;
  area_nombre: string;
}

export const obtenerAreas = async (
  idEmpresa: number
): Promise<{ id: string; nombre: string }[] | null> => {
  const requestData = { idEmpresa: idEmpresa };
  const jsonString = JSON.stringify(requestData);

  // Log para verificar los datos enviados
  console.log("Datos enviados al backend rutas:", jsonString);

  try {
    const response = await fetch(`${API_URL}/areas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonString,
    });

    if (response.ok) {
      const data = await response.json();

      // Log para verificar los datos recibidos
      console.log("Datos recibidos del backend:", data);

      // Validar si el backend devuelve un array de áreas
      if (Array.isArray(data.areas)) {
        return data.areas.map((area: Area) => ({
          id: area.area_id.toString(),
          nombre: area.area_nombre,
        }));
      } else {
        console.error("El formato de las áreas no es válido.");
        return [];
      }
    } else {
      console.error(`Error al cargar las áreas. Código de estado: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error en la solicitud de áreas:", error);
    return null;
  }
};
