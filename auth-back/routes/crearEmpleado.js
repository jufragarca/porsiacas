const express = require("express");
const router = express.Router();
const { verificarTipoDato, siElEmpleadoExisteConsulta } = require("../schema/empleadosConsultaCrear"); // Importamos las funciones

console.log("Ruta crearEmpleado iniciada");

router.post("/", async (req, res) => {
  // Imprimir los datos que recibe el backend
  console.log("Datos recibidos en la solicitud en crearEmpleado:", req.body);

  // Extraer los datos del cuerpo de la solicitud en el orden correcto según la tabla
  const { nombre, id_empresa, correo, id_cargo, jefe } = req.body;

  // Imprimir los valores organizados según la estructura de la tabla
  console.log("Valores organizados según la tabla en crear empleado:");
  console.log("| Nombre:", nombre, "| ID Empresa:", id_empresa, "| Correo:", correo, "| ID Cargo:", id_cargo, "| Jefe:", jefe);

  try {
    // 1. Verificar los tipos de datos
    const datosValidados = await verificarTipoDato(nombre, id_empresa, correo, id_cargo, jefe);
    console.log("Datos validados:", datosValidados); // Imprimir datos validados para verificación

    // 2. Verificar si el empleado ya existe
    const empleadoExiste = await siElEmpleadoExisteConsulta(nombre, id_empresa, correo, id_cargo, jefe); // Cambié el orden de los parámetros

    if (empleadoExiste) {
      // Si el empleado ya existe, devolver un mensaje de error
      return res.status(400).json({
        status: 400,
        mensaje: "El empleado ya existe.",
      });
    }

    // Si no existe, realizar el proceso para crear el empleado
    return res.status(200).json({
      status: 200,
      mensaje: "Empleado creado correctamente.",
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

module.exports = router;
