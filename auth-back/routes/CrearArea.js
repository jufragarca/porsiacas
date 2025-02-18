const express = require("express");
const { CrearAreaConsulta, verificarTipoDato } = require("../schema/areasConsultaCrearSchema");
const router = express.Router();

// Middleware para parsear JSON en el cuerpo de la solicitud
router.use(express.json());

console.log("Estoy en CrearArea");

// Función para crear una respuesta JSON estándar
const jsonResponse = (status, data) => ({
  status,
  data,
});

router.post("/", async (req, res) => {
  const { id_empresa, nombre_area } = req.body;

  // Imprimir `id_empresa` y `nombre_area` en un solo `console.log`
  console.log(`Datos recibidos: id_empresa=${id_empresa}, nombre_area=${nombre_area}`);

  // Verificar tipos de datos
  const datosVerificados = await verificarTipoDato(nombre_area, id_empresa);
  console.log(`Datos recibidos: id_empresa=${id_empresa}, nombre_area=${nombre_area}`);
  try {
    // Llamar a la función CrearAreaConsulta
    const resultado = await CrearAreaConsulta(datosVerificados);

    return res.status(201).json(
      jsonResponse(201, {
        mensaje: "Área creada exitosamente.",
        area: resultado,
      })
    );
  } catch (err) {
    console.error("Error al crear el área:", err);
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error interno al crear el área.",
      })
    );
  }
});

module.exports = router;