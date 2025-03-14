// auth-front/src/rutasController/crearCargos.tsx
import React from "react";

// Función para enviar los datos al backend
const CrearCargos = async ({ nombre, id_area, id_empresa }: { nombre: string; id_area: string; id_empresa: string }) => {
  try {
    const response = await fetch("/api/cargos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        id_area, // Usamos el nombre correcto del campo
        id_empresa, // Usamos el nombre correcto del campo
      }),
    });

    if (response.ok) {
      console.log("Cargo creado exitosamente");
      // Aquí puedes hacer algo después de que el cargo se haya creado, como redirigir o mostrar un mensaje.
    } else {
      console.error("Error al crear el cargo:", response.statusText);
    }
  } catch (error) {
    console.error("Error de red:", error);
  }
};

export default CrearCargos;
