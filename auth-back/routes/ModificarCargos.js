const express = require("express");
const router = express.Router();

// Importamos las funciones necesarias desde los archivos correspondientes
const { verificarTipoDato, actualizarCargo } = require("../schema/CargosConsultaModificar");

console.log("Ruta actualizarCargo iniciada");

// Ruta para actualizar un cargo
router.post("/", async (req, res) => {
  // Imprimir los datos que recibe el backend
  console.log("Datos recibidos en ModificarCargos:", req.body);

  // Extraer los datos del cuerpo de la solicitud
  const { id, nombre, id_area, id_empresa } = req.body;

  try {
    // 1. Verificar los tipos de datos
    const datosValidados = await verificarTipoDato(id, nombre, id_area, id_empresa);
    console.log("Datos validados:", datosValidados); // Imprimir datos validados para verificación

    // 2. Actualizar el cargo
    const resultado = await actualizarCargo(id, nombre, id_area, id_empresa);
    
    return res.status(200).json({
      status: 200,
      mensaje: "Cargo actualizado correctamente.",
      resultado,
    });
  } catch (error) {
    // Manejo de errores en la validación de los datos
    console.error("Error al actualizar el cargo:", error);
    return res.status(500).json({
      status: 500,
      mensaje: "Hubo un error al actualizar el cargo.",
      error: error.message,
    });
  }
});

// Exportamos el router para que pueda ser utilizado en otros archivos
module.exports = router;
