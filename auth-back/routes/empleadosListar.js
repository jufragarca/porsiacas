const express = require("express");
const router = express.Router();

// Ruta principal que recibe `id_empresa`
router.post("/", async (req, res) => {
    console.log("Entrando a la ruta EmpleadosListar");
    console.log("Cuerpo de la solicitud:", req.body);


    if (!id_empresa) {
        console.error("id_empresa no proporcionado em empleadosListar");
        return res.status(400).json(
          jsonResponse(400, {
            error: "El id_empresa es obligatorio.",
          })
        );
      }
      console.log("id_empresa en empleadosListar linea 18:", id_empresa);

      const datos = {
        id: nombre_area,
        nombre: inombre,
        correo: correo,
        id_cargo: id_cargo,
        jefe:jefe,
        password: password
      };
  // Función para listar los cargos
  try {
    // Verificar si existe la empresa
    const silaEmpresaExiste = await new Promise((resolve, reject) => {
      console.log("Entre a silaEmpresaExiste desde login y tengo", id_empresa);
      silaEmpreExistEmpleadosConsulta(EmpleadoId, (err, exist) => {
        if (err) reject(err);
        else resolve(exist);
      });
    });

    if (!silaEmpresaExiste) {
      console.log("Empresa no encontrada.");
      return res.status(404).json(
        jsonResponse(404, {
          mensaje: "Empresa no encontrada.",
        })
      );
    }

    // Consultar empleados
    const empleados = await new Promise((resolve, reject) => {
      const nombre = ""; // Valores predeterminados
      const correo = "";
      const id_cargo = null;
      const jefe = "";

      consultaEmpleados(EmpleadoId, nombre, correo, id_cargo, jefe, (err, empleados) => {
        if (err) reject(err);
        else resolve(empleados);
      });
    });

    if (empleados && empleados.length > 0) {
      console.log("Empleados encontrados:", empleados);
      return res.status(200).json(
        jsonResponse(200, {
          mensaje: "Consulta exitosa.",
          user: empleados,
        })
      );
    } else {
      console.log("No se encontraron usuarios.");
      return res.status(200).json(
        jsonResponse(200, {
          mensaje: "Los usuarios no existen.",
        })
      );
    }
  } catch (error) {
    console.error("Error en la operación:", error);
    return res.status(500).json(
      jsonResponse(500, {
        error: "Ocurrió un error al procesar la solicitud.",
      })
    );
  }
});
  module.exports = {
    CrearAreaConsulta,
    verificarTipoDato
  };