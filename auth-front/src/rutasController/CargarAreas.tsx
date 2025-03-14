import { API_URL } from "../auth/authConstants";

// Define la interfaz para un área
interface Area {
  id_area: number;
  nombre_area: string;
  id_empresa: number;
}

// Define la interfaz para la respuesta esperada de la API (antes de procesar)
interface AreaResponse {
  id_area: number;
  nombre_area: string;
  id_empresa: number;
}

const CargarAreasParaCargos = async (id_empresa: number): Promise<Area[] | null> => {
  // Aquí es donde se debe imprimir el valor de 'id_empresa'
  console.log("Cargando áreas para la empresa con ID:", id_empresa);

  try {
    const response = await fetch(`${API_URL}/areas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_empresa }),
    });

    if (!response.ok) {
      console.error("❌ Error en la respuesta del backend:", response.status);
      return null;
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.areas)) {
      console.warn("⚠ No se encontraron áreas en la respuesta.");
      return null;
    }

    // Mapear y validar las áreas, pero sin filtro
    const areasProcesadas: Area[] = data.areas.map((area: AreaResponse): Area | null => {
      if (
        typeof area.id_area === "number" &&
        typeof area.nombre_area === "string" &&
        typeof area.id_empresa === "number"
      ) {
        return {
          id_area: area.id_area,
          nombre_area: area.nombre_area,
          id_empresa: area.id_empresa,
        };
      } else {
        console.warn("⚠ Datos inválidos en área:", area);
        return null;
      }
    });

    return areasProcesadas;
  } catch (error) {
    console.error("❌ Error en la solicitud:", error);
    return null;
  }
};

export default CargarAreasParaCargos;
