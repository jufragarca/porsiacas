// auth-front/src/rutasController/ListarAreasParaCargos.tsx
import { API_URL } from "../auth/authConstants";

interface Area {
  id_area: number;  // 📌 ID del área
  nombre_area: string;  // 📌 Nombre del área
  id_empresa: number;  // 📌 ID de la empresa a la que pertenece el área
}

interface Props {
  id_empresa: number;  // id_empresa se pasa como una prop
}

// Función para obtener las áreas
export const obtenerAreas = async ({ id_empresa }: Props) => {
  try {
    // Coloca el console.log dentro de la función para ver el valor de id_empresa
    console.log("id_empresa en obtenerAreas:", id_empresa);

    const response = await fetch(`${API_URL}/areas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_empresa }),
    });

    // Verificar si la respuesta es exitosa
    if (!response.ok) throw new Error(`Error al obtener áreas. Código: ${response.status}`);

    const data = await response.json();

    // Verificar que 'data.areas' es un arreglo
    if (!Array.isArray(data.areas)) throw new Error("Formato de áreas incorrecto.");

    // Registrar las áreas antes de devolver los datos
    console.log("Áreas cargadas:", data.areas);

    // Mapear las áreas a un formato adecuado antes de devolverlas
    return data.areas.map((area: Area) => ({
      id_area: area.id_area.toString(),  // 📌 Convertir id_area a string
      nombre: area.nombre_area,  // 📌 Usar el campo correcto de la BD
    }));
  } catch (error) {
    // Manejo de errores
    console.error("Error en la solicitud de áreas:", error);
    return [];
  }
};
