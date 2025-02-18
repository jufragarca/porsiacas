const express = require('express');
const router = express.Router();
const { validarDatosBack, areasCargadas } = require("../schema/areasConcultaCargar"); // Importamos las funciones

// Ruta para recibir el idEmpresa desde el frontend
router.post('/', async (req, res) => {
  const { idEmpresa } = req.body; // Extraemos el idEmpresa del cuerpo de la solicitud
  console.log("Estoy en areas", idEmpresa);

  if (!idEmpresa) {
    return res.status(400).json({ message: "El idEmpresa es obligatorio" });
  }

  console.log("ID de la empresa recibido en areas:", idEmpresa);

  try {
    // Validamos los datos, por ejemplo, verificar si el idEmpresa es válido
    const validacion = await validarDatosBack(idEmpresa);

    if (!validacion) {
      return res.status(400).json({ message: "Datos no válidos" });
    }

    // Cargar las áreas relacionadas con el idEmpresa
    const areas = await areasCargadas(idEmpresa);
    console.log("respuesta de areas", areas);

    // Verificar si se encontraron áreas
    if (areas.length > 0) {
      // Iterar sobre las áreas y verificar los tipos de datos
      areas.forEach((area) => {
        console.log("id_area:", area.id_area, "Tipo de id_area:", typeof area.id_area);
        console.log("nombre_area:", area.nombre_area, "nombre_area:", typeof area.nombre_area);
        console.log("id_empresa:", area.id_empresa, "Tipo de id_empresa:", typeof area.id_empresa);
      });

      return res.status(200).json({ message: "Áreas cargadas correctamente", areas });
    } else {
      return res.status(404).json({ message: "No se encontraron áreas para esta empresa" });
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
