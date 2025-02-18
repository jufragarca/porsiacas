const express = require("express");
const { jsonResponse } = require("../lib/jsonResponse");
const router = express.Router();
const { empresaExists, createEmpresa } = require("../schema/empresa");

router.post("/", (req, res) => {
  const { nit, nombre_empresa, correo_empresa, nombre_contacto, celular_contacto, password } = req.body;

  if (!nit || !nombre_empresa || !correo_empresa || !nombre_contacto || !celular_contacto || !password) {
    return res.status(400).json(jsonResponse(400, {
      error: "Todos los campos son requeridos"
    }));
  }

  empresaExists(correo_empresa, (error, exists) => {
    if (error) {
      return res.status(500).json(jsonResponse(500, { error: "Error al verificar la empresa" }));
    }

    if (exists) {
      return res.status(400).json(jsonResponse(400, {
        error: "La empresa con este correo ya existe"
      }));
    }

    createEmpresa(nit, nombre_empresa, correo_empresa, nombre_contacto, celular_contacto, password, (err, result) => {
      if (err) {
        return res.status(500).json(jsonResponse(500, { error: "Error al crear la empresa" }));
      }

      return res.status(201).json(jsonResponse(201, {
        mensaje: "Empresa registrada exitosamente"
      }));
    });
  });
});

module.exports = router;
