import { API_URL } from "../auth/authConstants";

// Paso 1: Función para manejar los datos recibidos
export const enviarDatos = async (data: { nombre_area: string; id_Empresa: string }) => {
  try {
    // Paso 2: Verificar si `data` es un objeto y no nulo
    if (typeof data === "object" && data !== null) {
      console.log("Es un JSON válido:", JSON.stringify(data, null, 2));

      // Validar los valores dentro del JSON
      const { nombre_area, id_Empresa } = data;

      if (!nombre_area || typeof nombre_area !== "string") {
        console.error("El campo 'nombre_area' no es válido.");
        return;
      }

      // Validar que id_Empresa sea un string
      if (!id_Empresa || typeof id_Empresa !== "string") {
        console.error("El campo 'id_Empresa' no es válido.");
        return;
      }

      console.log("Valores dentro del JSON son válidos.");

      // Paso 3: Hacer una solicitud HTTP
      const response = await fetch(`${API_URL}/CrearArea`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre_area, id_empresa: id_Empresa }), // Enviamos los datos como JSON
      });
      console.log("Datos enviados al servidor:", JSON.stringify({ nombre_area, id_empresa: id_Empresa }, null, 2));

      // Paso 4: Verificar si la respuesta de la API es exitosa
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al enviar los datos:", errorData);
        return;
      }

      // Paso 5: Leer y validar si la respuesta es un JSON válido
      const result = await response.json();
      if (typeof result === "object" && result !== null) {
        console.log("Respuesta de la API válida:", JSON.stringify(result, null, 2));
      } else {
        throw new Error("La respuesta de la API no es un JSON válido.");
      }
    } else {
      console.error("No es un JSON válido.");
      return;
    }
  } catch (error) {
    console.error("Error al enviar los datos:", error);
  }
};