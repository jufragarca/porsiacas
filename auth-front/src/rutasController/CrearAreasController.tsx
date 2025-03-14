// 📌 Archivo: CrearAreasController.tsx (Controlador)
// 🔹 Este archivo actúa como el intermediario entre el frontend y el backend para la creación de áreas.
// 🔹 Recibe los datos desde `CrearAreas.tsx`, los valida y los envía al backend mediante una petición `POST`.
// 🔹 Si la respuesta del backend es válida, devuelve la nueva área creada a `CrearAreas.tsx` para que pueda mostrarla en la lista de áreas disponibles.

// Importamos la URL base de la API
import { API_URL } from "../auth/authConstants"; // ✅ Esto obtiene la URL base del backend, definida en otro archivo.

export const crearArea = async (data: { nombre_area: string; id_empresa: string | number }) => {
  // 🔹 Esta función es asíncrona porque realiza una petición HTTP.
  
  try {
    if (!data || typeof data !== "object") {
      throw new Error("❌ Los datos enviados no son un JSON válido.");
    }

    // Extraemos los valores desde `data`
    let { nombre_area, id_empresa } = data;

    // Convertir `id_empresa` a número si es un string
    if (typeof id_empresa === "string") {
      id_empresa = Number(id_empresa); // Convertimos a número
    }

    // Validamos los datos antes de enviarlos al backend
    if (!nombre_area || typeof nombre_area !== "string" || nombre_area.trim() === "") {
      throw new Error("❌ El campo 'nombre_area' no es válido.");
    }

    if (!id_empresa || typeof id_empresa !== "number" || isNaN(id_empresa)) {
      throw new Error("❌ El campo 'id_empresa' no es válido.");
    }

    // Enviamos los datos al backend mediante una petición `POST`
    const response = await fetch(`${API_URL}/CrearArea`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre_area, id_empresa }),
    });

    // Si la respuesta no es exitosa, lanzamos un error con el mensaje del backend
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`❌ Error en el servidor (${response.status}): ${JSON.stringify(errorData)}`);
    }

    // Obtenemos la respuesta del backend
    const result = await response.json();

    if (!result || typeof result !== "object") {
      throw new Error("❌ La respuesta del servidor no es válida.");
    }

    // Si todo salió bien, devolvemos la respuesta al frontend
    return result; // Devolvemos la nueva área creada a `CrearAreas.tsx` para que se actualice en la lista
  } catch (error) {
    // Si ocurre un error en cualquier parte del proceso, se captura aquí y se muestra en consola.
    throw error; // Relanzamos el error para que `CrearAreas.tsx` pueda manejarlo en su `catch`
  }
};
