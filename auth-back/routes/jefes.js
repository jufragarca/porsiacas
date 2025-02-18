const express = require("express");
const { jefeConsultas } = require("../schema/jefeConsultas");
const router = express.Router();

// Función para crear una respuesta JSON estándar
const jsonResponse = (status, data) => ({
  status,
  data,
});

console.log("INICIANDO LA RUTA JEFES...");

router.post("/", async (req, res) => {
  // Verificar que el cuerpo de la solicitud es lo que esperamos
  console.log("XXXXXX Cuerpo de la solicitud en jefes XXXXXXXX:", req.body);

  // Paso 1: Extraemos el valor de `id_empresa` del cuerpo de la solicitud
  const { id_empresa } = req.body;

  // Paso 2: Validamos si `id_empresa` está definido
  if (!id_empresa) {
    console.log("id_empresa no está definido o es falsy");
    return res.status(400).json(
      jsonResponse(400, {
        error: "El id_empresa es requerido.",
      })
    );
  }

  // Paso 3: Validamos el tipo de dato de `id_empresa`
  const tipoDato = typeof id_empresa;

  if (tipoDato === "string") {
    console.log("El id_empresa es un string");
  } else if (tipoDato === "boolean") {
    console.log("El id_empresa es un booleano");
  } else if (tipoDato === "number") {
    console.log("El id_empresa es un número");
  } else {
    console.log(`El id_empresa es de un tipo no esperado: ${tipoDato}`);
    return res.status(400).json(
      jsonResponse(400, {
        error: `El id_empresa tiene un tipo de dato inválido: ${tipoDato}`,
      })
    );
  }

  // Paso 4: Convertimos `id_empresa` a un número entero
  const JefeID = parseInt(id_empresa, 10);
  if (isNaN(JefeID)) {
    console.error("El id_empresa no es un número válido.");
    return res.status(400).json(
      jsonResponse(400, {
        error: "El id_empresa debe ser un número válido.",
      })
    );
  }

  // Paso 5: Llamamos a la función jefeConsultas con el id_empresa procesado
  jefeConsultas(JefeID, (err, jefes) => {
    if (err) {
      console.error("Error al obtener los jefes:", err);
      return res.status(500).json(
        jsonResponse(500, {
          error: "Error al obtener los jefes.",
        })
      );
    }

    // Paso 6: Validamos si se encontraron jefes
    if (jefes && jefes.length > 0) {
      console.log("Línea 35 jefes JefeID:", jefes);
      return res.status(200).json(
        jsonResponse(200, {
          mensaje: "Jefes obtenidos exitosamente.",
          jefes: jefes,
        })
      );
    } else {
      console.log("No se encontraron jefes para este id_empresa.");
      return res.status(404).json(
        jsonResponse(404, {
          mensaje: "No se encontraron jefes para este id_empresa.",
        })
      );
    }
  });
});

module.exports = router;
