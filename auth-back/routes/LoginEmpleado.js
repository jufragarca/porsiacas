// auth-back/routes/LoginUsuario.js

const express = require("express");
const router = express.Router();

// Importamos las funciones necesarias desde los archivos correspondientes
const { verificarTipoDato, logearUsuario } = require("../schema/LoginUsuarioSchema");

console.log("🟢 Entrando a logear el usuario...");

// Ruta para logear al usuario
router.post("/", async (req, res) => {
  // Extraer los datos del body
  const { correo, PASSWORD, telefono } = req.body;

  console.log("📥 Datos recibidos en LoginUsuario:");
  console.log("   ➤ Correo:", correo);
  console.log("   ➤ PASSWORD:", PASSWORD ? "****" : "No proporcionado"); // Ocultar contraseña en logs
  console.log("   ➤ Teléfono:", telefono);

  try {
    // 1. Verificar los tipos de datos recibidos
    const datosValidados = await verificarTipoDato(correo, PASSWORD, telefono);
    console.log("✅ Datos validados correctamente:", datosValidados);

    // 2. Intentar logear al usuario con los datos validados
    const resultado = await logearUsuario(datosValidados);

    // Si el login es exitoso, devolver una respuesta con el estado 200
    return res.status(200).json({
      status: 200,
      mensaje: "✅ Usuario logeado con éxito.",
      resultado, // Retornar el resultado del login
    });
  } catch (error) {
    // Manejo de errores en la validación de los datos o el login
    console.error("❌ Error al logear al usuario:", error);
    return res.status(500).json({
      status: 500,
      mensaje: "⚠️ Hubo un error al loguear al usuario.",
      error: error.message, // Incluir el mensaje de error para ayudar a depurar
    });
  }
});

// Exportamos el router para que pueda ser utilizado en otros archivos
module.exports = router;
