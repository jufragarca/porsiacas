import { obtenerCargos } from "./ListarCargosParaCargos";
import { obtenerAreas } from "./ListarAreasParaCargos";

export const fetchCargosYAreas = async (id_empresa: number) => {
  if (id_empresa === null) return null;

  try {
    const cargosData = await obtenerCargos(id_empresa);
    const areasData = await obtenerAreas({ id_empresa });

    if (!Array.isArray(areasData)) {
      console.error("❌ Error: áreasData no es un array válido.");
      return null;
    }

    return {
      cargos: cargosData || [],
      areas: areasData.map((area) => ({
        id: area.id_area,
        nombre: area.nombre,
      })),
    };
  } catch (error) {
    console.error("❌ Error al obtener cargos y áreas:", error);
    return null;
  }
};
