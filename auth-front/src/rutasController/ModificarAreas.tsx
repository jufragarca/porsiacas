// 📌 Archivo: ModificarAreasController.tsx (Controlador)
// 🔹 Este archivo se encarga de enviar una solicitud al backend para modificar los datos de un área existente.
// 🔹 Es utilizado en `ModificarAreas.tsx` para actualizar la información del área seleccionada en la interfaz.
// 🔹 Recibe un objeto `areaSeleccionada`, valida sus datos y envía una petición `POST` al backend con la información modificada.
// 🔹 Tras una modificación exitosa, llama a `reloadAreas()` para actualizar la lista de áreas en `ListarAreas.tsx`.

// ✅ Importamos la URL base de la API desde `authConstants.ts`, donde está centralizada la configuración del backend.
import { API_URL } from "../auth/authConstants"; 

// 🔹 Definimos la interfaz `Area` para tipar correctamente los datos esperados.
interface Area {
  id_area: number;        // ✅ Identificador único del área
  nombre_area: string;    // ✅ Nombre del área
  id_empresa: number;     // ✅ ID de la empresa a la que pertenece el área
}

// 🔹 Función asincrónica que se encarga de modificar un área en el backend.
export const ModificarAreas = async (
  areaSeleccionada: Area, // ✅ Recibe el área seleccionada que se desea modificar.
  setLoading: React.Dispatch<React.SetStateAction<boolean>>, // ✅ Controla el estado de carga en la interfaz.
  setMensaje: React.Dispatch<React.SetStateAction<string>>, // ✅ Muestra mensajes de éxito o error en la UI.
  reloadAreas: () => void // ✅ Función que recarga la lista de áreas tras una modificación exitosa.
) => {
  if (areaSeleccionada) {
    // 🔹 Construimos el objeto con los datos a enviar al backend.
    const areaModificar = {
      id_area: areaSeleccionada.id_area,
      nombre_area: areaSeleccionada.nombre_area,
      id_empresa: areaSeleccionada.id_empresa,
    };

    // console.log("📤 [ModificarAreasController] Datos a modificar:", areaModificar);
    // 🔹 Este `console.log` permite verificar qué datos se están enviando al backend.

    setLoading(true); // ✅ Indicamos que la operación está en curso.

    try {
      // 🔹 Enviamos una solicitud `POST` al backend con los datos del área a modificar.
      const response = await fetch(`${API_URL}/ModificarAreas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(areaModificar), // ✅ Convertimos el objeto en JSON antes de enviarlo.
      });

      if (response.ok) {
        // 🔹 Si la respuesta del servidor es correcta, extraemos el mensaje de éxito.
        const jsonData = await response.json();
        setMensaje(jsonData.mensaje || "Datos modificados exitosamente."); // ✅ Mostramos mensaje en la UI.

        // ✅ Mostramos una alerta con los datos modificados.
        alert(`Datos modificados exitosamente:
          ID: ${areaModificar.id_area},  
          Nombre: ${areaModificar.nombre_area},
          ID Empresa: ${areaModificar.id_empresa}`);

        reloadAreas(); // ✅ Recargamos la lista de áreas en `ListarAreas.tsx`.
      } else {
        // 🔹 Si la respuesta no es exitosa, mostramos el error en la consola.
        const errorText = await response.text();
        // console.log("❌ [ModificarAreasController] Error en la respuesta del servidor:", errorText);
        setMensaje("Hubo un error al modificar el área."); // ✅ Mensaje de error en la UI.
      }
    } catch (error) {
      // console.error("❌ [ModificarAreasController] Error al modificar el área:", error);
      // 🔹 Si hay un error en la petición (problemas de red, servidor caído, etc.), lo registramos y mostramos un mensaje.

      setMensaje("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false); // ✅ Finalizamos el estado de carga, sin importar el resultado.
    }
  } else {
    // console.log("⚠️ [ModificarAreasController] No se ha seleccionado un área para modificar.");
    // 🔹 Este `console.log` indica que no se ha seleccionado ningún área antes de intentar modificarla.
  }
};
