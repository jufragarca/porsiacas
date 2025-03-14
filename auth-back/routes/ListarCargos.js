const express = require("express");
const { consultaCargos } = require("../schema/ListarCargosConsultas"); // Importa la función de consulta
const router = express.Router();

router.use(express.json());

// Función para validar números
const validarNumero = (valor) => {
  const numero = Number(valor);
  return Number.isInteger(numero) ? numero : null;
};

// Ruta POST para obtener los datos de la empresa usando id_empresa
router.post("/", async (req, res) => {
  const id_empresa = req.body.id_empresa;
  console.log("id_empresa recibido:", id_empresa);


  if (id_empresa === null) {
    return res.status(400).json({ message: "El id_empresa debe ser un número válido." });
  }

  console.log("id_empresa convertido correctamente:", id_empresa);

  try {
    const cargos = await consultaCargos(id_empresa);

    if (cargos.length > 0) {
      console.log("Cargos encontrados:", cargos);
      return res.status(200).json({ message: "Cargos cargados correctamente", cargos });
    } else {
      return res.status(404).json({ message: "No se encontraron cargos para esta empresa" });
    }
  } catch (error) {
    console.error("Error en la consulta de cargos:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
