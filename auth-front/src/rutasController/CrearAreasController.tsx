import { API_URL } from "../auth/authConstants";

// Función para enviar datos al backend
export const enviarDatos = async (data: { nombre_area: string; id_Empresa: string }) => {
  try {
    // Validar que data sea un objeto válido
    if (!data || typeof data !== "object") {
      throw new Error("Los datos enviados no son un JSON válido.");
    }

    const { nombre_area, id_Empresa } = data;

    // Validar el campo 'nombre_area'
    if (!nombre_area || typeof nombre_area !== "string") {
      throw new Error("El campo 'nombre_area' no es válido.");
    }

    // Validar el campo 'id_Empresa'
    if (!id_Empresa || typeof id_Empresa !== "string") {
      throw new Error("El campo 'id_Empresa' no es válido.");
    }

    console.log("✅ Datos validados, enviando al servidor...");

    // Hacer la solicitud al backend
    const response = await fetch(`${API_URL}/CrearArea`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre_area, id_empresa: id_Empresa }),
    });

    console.log("📡 Datos enviados:", { nombre_area, id_empresa: id_Empresa });

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error en el servidor: ${JSON.stringify(errorData)}`);
    }

    // Convertir la respuesta a JSON
    const result = await response.json();

    // Verificar si la respuesta es un objeto válido
    if (!result || typeof result !== "object") {
      throw new Error("La respuesta del servidor no es válida.");
    }

    console.log("✅ Respuesta recibida del backend:", result);
    return result; // 🔥 📌 Devuelve los datos recibidos

  } catch (error) {
    console.error("❌ Error al enviar los datos:", error);
    throw error; // 🔥 Lanza el error para capturarlo en `CrearAreas.tsx`
  }
};
