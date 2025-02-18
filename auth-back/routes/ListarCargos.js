// listarCargos.js
const express = require("express");
const { consultaCargos } = require("../schema/ListarCargosConsultas"); // Importa la función de consulta
const router = express.Router();

// Middleware para parsear JSON en el cuerpo de la solicitud
router.use(express.json());

// Función para crear una respuesta JSON estándar
const jsonResponse = (status, data) => ({
  status,
  data,
});

// Ruta POST para obtener los datos de la empresa usando id_empresa
router.post("/", async (req, res) => {
  // Paso 1: Extraemos el valor de `id_empresa` del cuerpo de la solicitud
  const { id_empresa } = req.body;

  // Paso 3: Convertimos `id_empresa` a un número entero usando parseInt()
  const idEmpresa = parseInt(id_empresa, 10);  // Convertimos el `id_empresa` de string a número
  console.log("id_empresa convertido a número:", idEmpresa);

  try {
    // Cargar los cargos relacionados con el idEmpresa
    const cargos = await consultaCargos(idEmpresa); // Cambié el nombre a `cargos` para coincidir con el uso posterior

    if (cargos.length > 0) {
      console.log("estoy aquí", cargos); // Mover el `console.log` antes del `return`
      return res.status(200).json({ message: "Cargos cargados correctamente", cargos });
    } else {
      return res.status(404).json({ message: "No se encontraron cargos para esta empresa" });
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
