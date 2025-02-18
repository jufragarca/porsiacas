const express = require("express");
const router = express.Router();

// Importar funciones desde el esquema de consulta
const {
  silaEmpreExistEmpleadosConsulta,
  consultaEmpleados,

} = require("../schema/empleados.consulta"); // Cambia la ruta según tu estructura

// Función para crear una respuesta JSON estándar
const jsonResponse = (status, data) => ({
  status,
  data,
});

// Log inicial para verificar que el archivo se carga
//console.log("Inicializando router de empleados...");

// Ruta principal que recibe `id_empresa`
router.post("/", async (req, res) => {
  //console.log("Entrando a la ruta principal /...");
  //console.log("Cuerpo de la solicitud:", req.body);

  const { id_empresa } = req.body;

  if (!id_empresa) {
    console.error("id_empresa no proporcionado.");
    return res.status(400).json(
      jsonResponse(400, {
        error: "El id_empresa es obligatorio.",
      })
    );
  }
  console.log("id_empresa en empleados linea 35:", id_empresa);

  // Convertir a número y validar
  const EmpleadoId = parseInt(id_empresa, 10);
  //console.log("id_empleados.js convertido a número:", EmpleadoId);

  if (isNaN(EmpleadoId)) {
    //console.error("El id_empresa no es un número válido.");
    return res.status(400).json(
      jsonResponse(400, {
        error: "El id_empresa debe ser un número válido.",
      })
    );
  }
//console.log("estoy en ruta empleados linea 48")
  try {
    // Verificar si existe la empresa
    const silaEmpresaExiste = await new Promise((resolve, reject) => {
        //console.log("entre a silaEmpresaExiste desde login y tengo", id_empresa);
      silaEmpreExistEmpleadosConsulta(EmpleadoId, (err, exist) => {
        if (err) reject(err);
        else resolve(exist);
      });
    });

    if (!silaEmpresaExiste) {
      //console.log("Empresa no encontrada.");
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
      //console.log("Empleados encontrados:", empleados);
      return res.status(200).json(
        jsonResponse(200, {
          mensaje: "Consulta exitosa.",
          user: empleados,
        })
      );
    } else {
      //console.log("No se encontraron usuarios.");
      return res.status(200).json(
        jsonResponse(200, {
          mensaje: "Los usuarios no existen.",
        })
      );
    }
  } catch (error) {
    //console.error("Error en la operación:", error);
    return res.status(500).json(
      jsonResponse(500, {
        error: "Ocurrió un error al procesar la solicitud.",
      })
    );
  }
});

// Log final para confirmar que se exporta el router
//console.log("Exportando el router de empleados...");
module.exports = router;
