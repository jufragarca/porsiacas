const express = require("express");
const router = express.Router();

// Importamos las funciones necesarias desde los archivos correspondientes
const { verificarTipoDato, actualizarArea } = require("../schema/ModificarAreasSchema");



// Ruta para actualizar un área
router.post("/", async (req, res) => {
// Cambia el nombre de 'nombre_area' a 'nombre' para que coincida con lo que estás enviando
const { id_area, nombre_area, id_empresa } = req.body;
console.log("Datos recibidos en ModificarArea:", id_area, nombre_area, id_empresa);




// Realizar alguna operación con los datos, como actualizarlos en la base de datos
// Por ejemplo, podrías realizar una consulta a la base de datos para modificar el área con los datos recibidos


  try {
    // 1. Verificar los tipos de datos
    const datosValidados = await verificarTipoDato(id_area, nombre_area, id_empresa);
    console.log("Datos validados:", datosValidados); // Imprimir datos validados para verificación

    // 2. Actualizar el área
    const resultado = await actualizarArea(datosValidados);

    return res.status(200).json({
      status: 200,
      mensaje: "Área actualizada correctamente.",
      resultado,
    });
  } catch (error) {
    // Manejo de errores en la validación de los datos
    console.error("Error al actualizar el área:", error);
    return res.status(500).json({
      status: 500,
      mensaje: "Hubo un error al actualizar el área.",
      error: error.message,
    });
  }
});

// Exportamos el router para que pueda ser utilizado en otros archivos
module.exports = router;
