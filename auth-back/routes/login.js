const express = require("express");
const { jsonResponse } = require("../lib/jsonResponse");
const router = express.Router(); // Creamos el enrutador
const { empresaExiste, consultarEmpresaPorCredenciales } = require("../schema/EmpresasDashboard");

// Ruta POST para login
router.post("/", async (req, res) => {
  const { nit, correo_empresa, password } = req.body;

  // Validación de datos recibidos
  if (!nit || !correo_empresa || !password) {
    return res.status(400).json(jsonResponse(400, {
      error: "Todos los campos son requeridos",
    }));
  }

  try {
    // Verificar si la empresa existe
    const empresaExisteResult = await new Promise((resolve, reject) => {
      empresaExiste(correo_empresa, (err, exists) => {
        if (err) reject(err);
        else resolve(exists);
      });
    });

    if (empresaExisteResult) {
      // Consultar la empresa por credenciales
      const empresa = await new Promise((resolve, reject) => {
        consultarEmpresaPorCredenciales(nit, correo_empresa, password, (err, empresa) => {
          if (err) reject(err);
          else resolve(empresa);
        });
      });

      if (empresa) {
        console.log("Estructura de la respuesta enviada al frontend:", 
          {
          status: 200,
          body: {
            mensaje: "Autenticación exitosa desde login.js",
            user: {
              id_empresa: empresa.id, // ID de la empresa
            },
          },
        });

        return res.status(200).json(jsonResponse(200, {
          mensaje: "Autenticación exitosa",
          user: {
            id: empresa.id, // Enviamos el ID de la empresa
          },
        }));
      } else {
        return res.status(401).json(jsonResponse(401, {
          error: "Credenciales incorrectas. Por favor, verifica tus datos.",
        }));
      }
    } else {
      return res.status(200).json(jsonResponse(200, {
        mensaje: "La empresa no existe. Puedes proceder a registrarla.",
      }));
    }
  } catch (error) {
    console.error("Error en la operación:", error);
    return res.status(500).json(jsonResponse(500, {
      error: "Ocurrió un error al procesar la solicitud",
    }));
  }
});

module.exports = router; // Exportamos solo el enrutador
