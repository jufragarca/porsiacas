const express = require("express");
const app = express();

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para manejar formularios si es necesario
const consultarEmpleados = (req, res) => {
  console.log("Cuerpo de la solicitud recibido:", req.body); // Depuración
  const { id_empresa } = req.body;

  if (!id_empresa) {
    console.error("id_empresa no proporcionado");
    return res.status(400).json({
      error: "El id_empresa es necesario para consultar los empleados",
    });
  }

  // Lógica para consultar empleados
  consultarEmpleadosPorIdEmpresa(id_empresa, (err, empleados) => {
    if (err) {
      console.error("Error al consultar empleados:", err);
      return res.status(500).json({ error: "Error al recuperar los empleados" });
    }

    res.status(200).json({
      mensaje: "Información de empleados recuperada exitosamente.",
      empleados: empleados,
    });
  });
};
