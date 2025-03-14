const express = require("express");
const router = express.Router();
const { verificarTipoDato, siElEmpleadoExisteConsulta } = require("../schema/empleadosConsultaCrear");

console.log("Ruta crearEmpleado iniciada");

router.post("/", async (req, res) => {
  console.log("Datos recibidos en la solicitud en crearEmpleado:", req.body);

  // Extraer los datos del cuerpo de la solicitud, incluyendo PASSWORD
  const {nombre, id_empresa, correo, id_cargo, jefe, telefono, PASSWORD } = req.body;

  console.log("Valores organizados según la tabla en crear empleado:");
  console.log(
    "| Nombre:", nombre,
    "| ID Empresa:", id_empresa,
    "| Correo:", correo,
    "| ID Cargo:", id_cargo,
    "| Jefe:", jefe,
    "| Teléfono:", telefono,
    "| PASSWORD:", PASSWORD
  );

  try {
    // 1. Verificar los tipos de datos
    const datosValidados = await verificarTipoDato(nombre, id_empresa, correo, id_cargo, jefe, telefono, PASSWORD);
    console.log("Datos validados:", datosValidados);

    // 2. Verificar si el empleado ya existe
    const empleadoExiste = await siElEmpleadoExisteConsulta(nombre, id_empresa, correo, id_cargo, jefe, telefono, PASSWORD);

    if (empleadoExiste) {
      return res.status(400).json({
        status: 400,
        mensaje: "El empleado ya existe.",
      });
    }

    // Aquí deberías agregar la lógica para insertar el empleado en la base de datos

    return res.status(200).json({
      status: 200,
      mensaje: "Empleado creado correctamente.",
    });
  } catch (error) {
    console.error("Error en la validación de los datos:", error);
    return res.status(500).json({
      status: 500,
      mensaje: "Hubo un error al validar los datos.",
      error: error.message,
    });
  }

});

module.exports = router;
