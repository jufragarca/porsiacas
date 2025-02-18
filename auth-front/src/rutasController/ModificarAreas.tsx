import { API_URL } from "../auth/authConstants";
import { Area } from "../types";  // Asegúrate de que el tipo 'Area' esté importado correctamente

// ModificarAreas con tipo específico
export const ModificarAreas = async (
  areaSeleccionada: Area, // Usar la interfaz Area
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setMensaje: React.Dispatch<React.SetStateAction<string>>
) => {
  if (areaSeleccionada) {
    // Preparar los datos a modificar según el área seleccionada
    const areaModificar = {
      id_area: areaSeleccionada.id_area, // Usamos el id_area de la interfaz
      nombre_area: areaSeleccionada.nombre_area, // Cambié nombre a nombre_area
      id_empresa: areaSeleccionada.id_empresa, // Usamos el id_empresa de la interfaz
    };

    // Mostrar los datos antes de enviarlos
    console.log("Datos a modificar (antes de enviar):", areaModificar);

    setLoading(true); // Inicia el estado de carga
    console.log("Iniciando solicitud al servidor..."); // Confirmación de inicio de solicitud

    try {
      // Mostrar el cuerpo de la solicitud antes de enviarla
      console.log("Cuerpo de la solicitud (JSON):", JSON.stringify(areaModificar));

      const response = await fetch(`${API_URL}/ModificarAreas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(areaModificar), // Envía los datos en formato JSON
      });

      // Verificar si la respuesta es exitosa
      if (response.ok) {
        const jsonData = await response.json();
        console.log("Respuesta del servidor:", jsonData); // Ver respuesta del servidor

        // Si la respuesta contiene un mensaje, mostrarlo
        setMensaje(jsonData.mensaje || "Datos modificados exitosamente.");

        // Puedes reemplazar el alert por un mensaje más amigable
        alert(`Datos modificados exitosamente:
          ID: ${areaModificar.id_area},  // Corregí el acceso a la propiedad
          Nombre: ${areaModificar.nombre_area},
          ID Empresa: ${areaModificar.id_empresa}`);
      } else {
        // Si la respuesta no es exitosa, manejar el error
        const errorText = await response.text();
        console.log("Error en la respuesta del servidor:", errorText); // Ver error
        setMensaje("Hubo un error al modificar el área.");
      }
    } catch (error) {
      console.error("Error al modificar el área:", error);
      setMensaje("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  } else {
    console.log("No se ha seleccionado un área para modificar.");
  }
};
