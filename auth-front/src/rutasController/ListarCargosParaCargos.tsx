import { API_URL } from "../auth/authConstants";

// Define el tipo para los cargos
interface Cargo {
  id: number;
  nombre: string;
  id_area: number;
  id_empresa: number;
}

// Función para obtener los cargos
export const obtenerCargos = async (id_empresa: number): Promise<Cargo[]> => { // Asegúrate de que el tipo sea un número
  // Validar que id_empresa sea un número válido
  if (!id_empresa || isNaN(id_empresa)) {
    console.error("Error: id_empresa inválido en obtenerCargos:", id_empresa);
    return []; // Retornamos un array vacío si id_empresa no es válido
  }
  console.log("Enviando id_empresa a backend:", id_empresa);

  try {
    // Realizamos la solicitud POST al backend para obtener los cargos
    const response = await fetch(`${API_URL}/ListarCargos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_empresa }), // Enviamos el id_empresa al backend
    });

    // Verificamos si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`Error al obtener cargos. Status: ${response.status}`);
    }

    // Parseamos la respuesta JSON
    const data = await response.json();

    // Si la respuesta contiene los cargos, los retornamos
    if (data && Array.isArray(data.cargos)) {
      return data.cargos;
    } else {
      console.error("Respuesta inesperada del servidor:", data);
      return []; // Si la estructura de datos no es la esperada, retornamos un array vacío
    }
  } catch (error) {
    console.error("Error en la solicitud de cargos:", error);
    return []; // En caso de error, retornamos un array vacío
  }
};
