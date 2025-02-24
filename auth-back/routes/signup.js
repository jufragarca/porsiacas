const express = require("express");
const { jsonResponse } = require("../lib/jsonResponse");
const router = express.Router();
const { empresaExists, createEmpresa } = require("../schema/empresa");

// Middleware para asegurarse de que se pueda leer JSON
router.use(express.json());

router.post("/", (req, res) => {
  console.log("🔹 Datos recibidos en /api/signup:", req.body); // 👈 Ver en la terminal

  const { nit, nombre_empresa, correo_empresa, nombre_contacto, celular_contacto, password } = req.body;

  // Validación de campos
  if (!nit || !nombre_empresa || !correo_empresa || !nombre_contacto || !celular_contacto || !password) {
    console.log("⚠️ Faltan campos requeridos");
    return res.status(400).json(jsonResponse(400, { error: "Todos los campos son requeridos" }));
  }

  // Verificar si la empresa ya existe
  empresaExists(correo_empresa, (error, exists) => {
    if (error) {
      console.error("❌ Error al verificar la empresa:", error);
      return res.status(500).json(jsonResponse(500, { error: "Error al verificar la empresa" }));
    }

    if (exists) {
      console.log("⚠️ La empresa ya existe en la base de datos");
      return res.status(400).json(jsonResponse(400, { error: "La empresa con este correo ya existe" }));
    }

    // Crear la empresa en la base de datos
    createEmpresa(nit, nombre_empresa, correo_empresa, nombre_contacto, celular_contacto, password, (err, result) => {
      if (err) {
        console.error("❌ Error al crear la empresa:", err);
        return res.status(500).json(jsonResponse(500, { error: "Error al crear la empresa" }));
      }

      console.log("✅ Empresa registrada exitosamente");
      return res.status(201).json(jsonResponse(201, { mensaje: "Empresa registrada exitosamente" }));
    });
  });
});

module.exports = router;
