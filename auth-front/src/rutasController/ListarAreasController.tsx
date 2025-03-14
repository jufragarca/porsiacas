// 📌 Archivo: ListarAreasController.tsx (Controlador)
// 🔹 Este archivo maneja la comunicación con el backend para obtener la lista de áreas de una empresa específica.
// 🔹 Se usa en `ListarAreas.tsx` para solicitar y mostrar las áreas disponibles.
// 🔹 Recibe un `id_empresa`, lo valida, hace una petición `POST` al backend y devuelve la lista de áreas si la respuesta es válida.

// ✅ Importamos la URL base del backend desde `authConstants.ts`, donde está definida para mantener centralizadas las configuraciones de API.
import { API_URL } from "../auth/authConstants"; 

export const obtenerAreas = async (id_empresa: number) => {
  // 📥 [ListarAreasController] Recibimos el id_empresa como número.

  // 🔹 Validamos que `id_empresa` sea un número válido.
  if (isNaN(id_empresa)) {
    console.error("❌ [ListarAreasController] Error: id_empresa no es un número válido.");
    return null; // Si no es un número, retornamos null.
  }

  // 🔹 Creamos el objeto que se enviará al backend con el `id_empresa`.
  const requestData = { id_empresa };

  try {
    // 🔹 Hacemos una solicitud `POST` al backend para obtener la lista de áreas asociadas a la empresa.
    const response = await fetch(`${API_URL}/ListarAreas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData), // Enviamos el `id_empresa` como JSON en el cuerpo de la petición.
    });

    // 🔹 Si el servidor responde con un error (código HTTP diferente de 200-299), lo registramos y retornamos `null`.
    if (!response.ok) {
      console.error(`❌ [ListarAreasController] Error en la respuesta del backend: ${response.status}`);
      return null; // Si la respuesta no es exitosa, retornamos `null`.
    }

    // 🔹 Extraemos los datos JSON de la respuesta del backend.
    const data = await response.json();

    // 🔹 Verificamos que la respuesta tenga el formato esperado.
    if (!data || !data.data || !Array.isArray(data.data.areas)) {
      console.warn("⚠️ [ListarAreasController] Respuesta inesperada del backend:", data);
      return []; // Si la estructura de datos no es la esperada, retornamos un array vacío.
    }

    // 🔹 Si la respuesta es válida, retornamos la lista de áreas.
    return data.data.areas;
  } catch (error) {
    // 🔹 Si ocurre un error en la solicitud (como fallo de red o problemas en el servidor), lo registramos.
    console.error("❌ [ListarAreasController] Error en la solicitud de áreas:", error);
    return null; // En caso de error, retornamos `null`.
  }
};
