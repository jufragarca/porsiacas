import React from "react";

// Función para enviar los datos al backend
const CrearCargos = async ({ nombre, idArea, idEmpresa }: { nombre: string; idArea: string; idEmpresa: string }) => {
  try {
    const response = await fetch("/api/cargos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        id_area: idArea,
        id_empresa: idEmpresa,
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
