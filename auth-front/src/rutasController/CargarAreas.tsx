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

  // Verificar si el parámetro idEmpresa está presente en la URL
  // console.log("idEmpresa extraído de la URL:", idEmpresa);

  if (!idEmpresa) {
    // console.error("No se encontró el idEmpresa en la URL");
    return null;
  }

  const requestData = { idEmpresa };
  // console.log("Datos enviados al backend:", requestData);

  const jsonString = JSON.stringify(requestData);

  try {
    const response = await fetch(`${API_URL}/areas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonString,
    });

    // Verificar que la respuesta del servidor es exitosa
    if (response.ok) {
      const data = await response.json(); // Convertir la respuesta a JSON

      // Mostrar la respuesta del backend directamente
      // console.log("Esto es lo que viene del backend:", data);

      // Verificar si la respuesta contiene áreas y procesarlas
      if (data && Array.isArray(data.areas)) {
        // Procesar las áreas
        // const areasProcesadas = data.areas.map((area: Area) => {
          // Verificar si los datos del área son válidos
          if (area.id_area && area.nombre_area && area.id_empresa) {
            // console.log("id_area:", area.id_area, "Tipo de id_area:", typeof area.id_area);
            // console.log("nombre_area:", area.nombre_area, "Tipo de nombre_area:", typeof area.nombre_area);
            // console.log("id_empresa:", area.id_empresa, "Tipo de id_empresa:", typeof area.id_empresa);

            return {
              id_area: area.id_area,
              nombre_area: area.nombre_area,
              id_empresa: area.id_empresa,
            };
          } else {
            console.warn("Área con datos inválidos:", area);
            return null; // Devolver null si los datos no son válidos
          }
        }).filter((area): area is Area => area !== null); // Filtrar los elementos nulos y asegurar que el tipo es Area

        // Mostrar las áreas procesadas
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
