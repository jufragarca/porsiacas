//auth-back/routes/LoginUsuario.js
// auth-back/routes/LoginUsuario.js
const express = require("express");
const router = express.Router();

// Importamos las funciones necesarias desde los archivos correspondientes
const { verificarTipoDato, logearUsuario } = require("../schema/LoginUsuarioSchema");
console.log("entre a logear el usuario")

// Ruta para logear al usuario
router.post("/", async (req, res) => {

  // Realizar alguna operación con los datos, como validarlos o verificarlos antes de proceder con el login
  // Cambia el nombre de 'nombre_area' a 'nombre' para que coincida con lo que estás enviando
  const { correo, password, telefono } = req.body;
  console.log("Datos recibidos en LoginUsuario:", "correo",correo, "password",password, "telefono", telefono);

  try {
    // 1. Verificar los tipos de datos recibidos
    const datosValidados = await verificarTipoDato(correo, password, telefono);
    console.log("Datos validados:", datosValidados); // Imprimir datos validados para verificación

    // 2. Intentar logear al usuario con los datos validados
    const resultado = await logearUsuario(datosValidados); // Corregir la llamada a logearUsuario

    // Si el login es exitoso, devolver una respuesta con el estado 200
    return res.status(200).json({
      status: 200,
      mensaje: "Usuario logeado con éxito.",
      resultado, // Retornar el resultado del login
    });
  } catch (error) {
    // Manejo de errores en la validación de los datos o el login
    console.error("Error al logear al usuario:", error);
    return res.status(500).json({
      status: 500,
      mensaje: "Hubo un error al loguear al usuario.",
      error: error.message, // Incluir el mensaje de error para ayudar a depurar
    });
  }
});

// Exportamos el router para que pueda ser utilizado en otros archivos
module.exports = router;
