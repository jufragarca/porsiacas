const express = require("express");
const { validarDatosBack, areasCargadas } = require("../schema/ListarConsultaSchema"); // Asegúrate de que las funciones se importen correctamente
const router = express.Router();

// Middleware para parsear JSON en el cuerpo de la solicitud
router.use(express.json());

console.log("Estoy en ListarAreas");

// Función para crear una respuesta JSON estándar
const jsonResponse = (status, mensaje, data = null) => ({
  status,
  mensaje,
  data,
});

router.post("/", async (req, res) => {
  const { id_empresa } = req.body;

  // Validación básica de entrada
  if (!id_empresa) {
    const response = jsonResponse(400, "El campo 'id_empresa' es obligatorio.");
    console.log("Respuesta enviada al frontend:", response);
    return res.status(400).json(response);
  }

  console.log(`Datos recibidos en listarAreas: id_empresa=${id_empresa}`);

  try {
    // Validar los datos de entrada
    const datosVerificados = await validarDatosBack(id_empresa);
    console.log(`Datos verificados: ${JSON.stringify(datosVerificados)}`);

    // Obtener las áreas
    const resultado = await areasCargadas(id_empresa);

    if (!Array.isArray(resultado) || resultado.length === 0) {
      const response = jsonResponse(404, "No se encontraron áreas para la empresa proporcionada.");
      console.log("Respuesta enviada al frontend:", response);
      return res.status(404).json(response);
    }

    const response = jsonResponse(201, "Áreas cargadas exitosamente.", { areas: resultado });
    console.log("Respuesta enviada al frontend:", response);
    return res.status(201).json(response);
  } catch (err) {
    console.error("Error al cargar las áreas:", err.message);

    const response = jsonResponse(500, "Error interno al cargar las áreas.");
    console.log("Respuesta enviada al frontend:", response);
    return res.status(500).json(response);
  }
});

module.exports = router; // Exporta el router para usarlo en el archivo principal
