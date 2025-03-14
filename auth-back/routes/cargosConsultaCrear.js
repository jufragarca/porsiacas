// Importación de dependencias
const express = require("express");
const router = express.Router();
const {
  verificarTipoDato,
  siElEmpleadoExisteConsulta,
  insertarCargo,
} = require("../schema/cargosConsultaCrearSchema"); // Importamos las funciones necesarias

// Log para indicar que la ruta ha iniciado
console.log("🚀 Ruta cargosConsultaCrear iniciada");

// Definición de la ruta POST para manejar solicitudes de creación/verificación de cargos
router.post("/", async (req, res) => {
  try {
    // 1️⃣ Extraer los datos recibidos en la solicitud
    const { nombre, id_area, id_empresa } = req.body; // Extrae los datos directamente

    // Log para ver los datos recibidos
    console.log("📩 Datos recibidos:", { nombre, id_area, id_empresa });

    // 2️⃣ Verificar tipos de datos
    await verificarTipoDato(nombre, id_area, id_empresa);
    console.log("✅ Datos validados correctamente");

    // 3️⃣ Verificar si el cargo ya existe
    const empleadoExiste = await siElEmpleadoExisteConsulta(nombre, id_area, id_empresa);
    
    if (empleadoExiste.success && empleadoExiste.message === "El cargo ya existe") {
      console.log("⚠️ El cargo ya existe en la base de datos.");
      return res.status(400).json({
        status: 400,
        mensaje: "El cargo ya existe.",
        datos: empleadoExiste.data, // Incluye datos existentes como referencia
      });
    }

    // 4️⃣ Insertar el nuevo cargo
    const cargoCreado = await insertarCargo(nombre, id_area, id_empresa);
    console.log("✅ Cargo creado correctamente:", cargoCreado);

    // 5️⃣ Enviar respuesta con los datos insertados
    return res.status(200).json({
      status: 200,
      mensaje: "Cargo creado correctamente",
      datos: {
        id: cargoCreado.insertId, // ID generado por la base de datos
        nombre: nombre,
        id_area: id_area,
        id_empresa: id_empresa,
      },
    });

  } catch (error) {
    // 🚨 Manejo de errores en validación o inserción
    console.error("❌ Error en la validación o creación del cargo:", error);

    return res.status(500).json({
      status: 500,
      mensaje: "Hubo un error al procesar la solicitud.",
      error: error.message,
    });
  }
});

// Exportar el router para su uso en el servidor principal
module.exports = router;
