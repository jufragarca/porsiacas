import { API_URL } from "../auth/authConstants";

// Define una interfaz para las áreas recibidas
interface Area {
  id_area: number;
  nombre_area: string;
  id_empresa: number;
}

const CargarAreasParaCargos = async (): Promise<Area[] | null> => {
  const queryParams = new URLSearchParams(window.location.search);
  const idEmpresa = queryParams.get("id");

  if (!idEmpresa) {
    return null;
  }

  const requestData = { idEmpresa };
  const jsonString = JSON.stringify(requestData);

  try {
    const response = await fetch(`${API_URL}/areas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonString,
    });

    if (response.ok) {
      const data = await response.json(); // Convertir la respuesta a JSON

      // Verificar si la respuesta contiene áreas y procesarlas
      if (data && Array.isArray(data.areas)) {
        const areasProcesadas = data.areas
          .map((area: any) => {
            // Verificar si los datos del área son válidos
            if (area.id_area && area.nombre_area && area.id_empresa) {
              return {
                id_area: area.id_area,
                nombre_area: area.nombre_area,
                id_empresa: area.id_empresa,
              };
            } else {
              console.warn("Área con datos inválidos:", area);
              return null; // Devolver null si los datos no son válidos
            }
          })
          .filter((area): area is Area => area !== null); // Filtrar los elementos nulos y asegurar que el tipo es Area

        console.log("Áreas procesadas:", areasProcesadas);
        return areasProcesadas;
      } else {
        console.log("No se encontraron áreas en la respuesta.");
        return null;
      }
    } else {
      console.error("Error en la respuesta del backend. Status:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return null;
  }
};

export default CargarAreasParaCargos;
