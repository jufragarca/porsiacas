const express = require("express");
const { consultaCargos } = require("../schema/CargosConsultas");
const router = express.Router();

// Middleware para parsear JSON en el cuerpo de la solicitud
router.use(express.json());

// Función para crear una respuesta JSON estándar
const jsonResponse = (status, data) => ({
  status,
  data,
});

//console.log("Inicializando router de cargos...");

router.post("/", async (req, res) => {
  console.log("Entrando a la ruta principal /...");
  
   
  console.log("Cuerpo de la solicitud en ruta cargos:", req.body); 
  

  // Paso 1: Extraemos el valor de `id_empresa` del cuerpo de la solicitud
  const { id_empresa } = req.body;
  
  // Paso 2: Verificamos si `id_empresa` fue proporcionado en el cuerpo de la solicitud
  if (!id_empresa || typeof id_empresa !== "string") {
    //console.error("id_empresa no proporcionado o no es un string válido.");
    return res.status(400).json(
      jsonResponse(400, {
        error: "El id_empresa debe ser proporcionado y válido.",
      })
    );
  }

  // Paso 3: Convertimos `id_empresa` a un número entero usando parseInt()
  const CargoId = parseInt(id_empresa, 10);  // Convertimos el `id_empresa` de string a número
  console.log("id_empresa convertido a número em cargps:", CargoId);

  // Paso 4: Validamos si la conversión fue exitosa
  if (isNaN(CargoId)) {
    console.error("El id_empresa no es un número válido.");
    return res.status(400).json(
      jsonResponse(400, {
        error: "El id_empresa debe ser un número válido.",
      })
    );
  }

  // Paso 5: Solo mostramos el `id_empresa` convertido
  console.log("ID de empresa procesado en CARGOS:", CargoId);

  // Llamada a la función consultaCargos con el id_empresa procesado
  consultaCargos(CargoId, (err, cargos) => {
    if (err) {
      console.error("Error al obtener los cargos:", err);
      return res.status(500).json(
        jsonResponse(500, {
          error: "Error al obtener los cargos.",
        })
      );
    }

    if (cargos && cargos.length > 0) {
      // Si se encuentran cargos, los devolvemos en la respuesta
      return res.status(200).json(
        jsonResponse(200, {
          mensaje: "Cargos obtenidos exitosamente.",
          cargos: cargos,
          
        })
      );
    } else {
      // Si no se encuentran cargos, devolvemos un mensaje de que no se encontraron
      return res.status(404).json(
        jsonResponse(404, {
          mensaje: "No se encontraron cargos para esta empresa.",
        })
      );
    }
  });
});

module.exports = router;
