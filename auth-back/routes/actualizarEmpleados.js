const express = require("express");
const router = express.Router();

// Importamos las funciones necesarias desde los archivos correspondientes
const { verificarTipoDato, actualizarEmpleado } = require("../schema/empleadosConsultaActualizar");

console.log("Ruta actualizarEmpleado iniciada");

// Ruta para actualizar un empleado
router.post("/", async (req, res) => {
  // Imprimir los datos que recibe el backend
  console.log("YYYYdatos recibidos en actualizarEmpleados", req.body);

  // Extraer los datos del cuerpo de la solicitud en el orden correcto según la tabla
  const { id, nombre, id_empresa, correo, id_cargo, jefe } = req.body;

  // Imprimir los valores organizados según la estructura de la tabla
  console.log("Valores organizados según la tabla:");
  console.log("id: id| Nombre:", nombre, "| ID Empresa:", id_empresa, "| Correo:", correo, "| ID Cargo:", id_cargo, "| Jefe:", jefe);

  try {
    // 1. Verificar los tipos de datos
    const datosValidados = await verificarTipoDato(id, nombre, id_empresa, correo, id_cargo, jefe);
    console.log("Datos validados:", datosValidados); // Imprimir datos validados para verificación

    // 2. Actualizar el empleado
    const resultado = await actualizarEmpleado(id, nombre, id_empresa, correo, id_cargo, jefe);
    
    return res.status(200).json({
      status: 200,
      mensaje: "Empleado actualizado correctamente.",
      resultado,
    });
  } catch (error) {
    // Manejo de errores en la validación de los datos
    console.error("Error en la validación de los datos:", error);
    return res.status(500).json({
      status: 500,
      mensaje: "Hubo un error al validar los datos.",
      error: error.message,
    });
  }
});

// Exportamos el router para que pueda ser utilizado en otros archivos
module.exports = router;
