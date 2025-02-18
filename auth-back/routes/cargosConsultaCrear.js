// Importación de dependencias
const express = require("express");
const router = express.Router();
const {
  verificarTipoDato,
  siElEmpleadoExisteConsulta,
  insertarCargo,
} = require("../schema/cargosConsultaCrearSchema"); // Importamos las funciones necesarias

// Log para indicar que la ruta ha iniciado
console.log("Ruta cargosConsultaCrear iniciada");

// Definición de la ruta POST para manejar solicitudes de creación/verificación de cargos
router.post("/", async (req, res) => {
  // Imprimir los datos recibidos en el cuerpo de la solicitud
  console.log("Datos recibidos en la solicitud en cargosConsultaCrear:", req.body);

  // Extraer los datos necesarios del cuerpo de la solicitud
  const { nombre, idArea, idEmpresa } = req.body.cargoData; // Acceso a cargoData según la estructura enviada desde el cliente

  // Imprimir los valores organizados según la estructura de la tabla
  console.log("Valores organizados según la tabla en cargo:");
  console.log("| Nombre:", nombre, "| idArea:", idArea, "| idEmpresa:", idEmpresa);

  try {
    // Paso 1: Verificar los tipos de datos
    const datosValidados = await verificarTipoDato(nombre, idArea, idEmpresa);
    console.log("Datos validados:", datosValidados); // Log para verificar que los datos son correctos

    // Paso 2: Verificar si el cargo ya existe
    const empleadoExiste = await siElEmpleadoExisteConsulta(nombre, idArea, idEmpresa);

    // Si el cargo ya existe, devolver un mensaje de error
    if (empleadoExiste.success && empleadoExiste.message === "El cargo ya existe") {
      return res.status(400).json({
        status: 400,
        mensaje: "El cargo ya existe.",
        datos: empleadoExiste.data, // Incluye los datos existentes como referencia
      });
    }

    // Paso 3: Insertar el nuevo cargo
    const cargoCreado = await insertarCargo(nombre, idArea, idEmpresa);

    console.log("Cargo creado correctamente:", cargoCreado);

    // Enviar la respuesta con los datos insertados
    return res.status(200).json({
      status: 200,
      mensaje: "Cargo creado correctamente",
      datos: {
        id: cargoCreado.insertId, // ID generado por la base de datos
        nombre: nombre,
        idArea: idArea,
        idEmpresa: idEmpresa,
      },
    });
  } catch (error) {
    // Manejo de errores en la validación o creación del cargo
    console.error("Error en la validación o creación del cargo:", error);

    return res.status(500).json({
      status: 500,
      mensaje: "Hubo un error al procesar la solicitud.",
      error: error.message,
    });
  }
});

// Exportar el router para su uso en el servidor principal
module.exports = router;
