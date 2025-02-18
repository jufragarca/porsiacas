const router = require("express").Router(); // Importa el enrutador de Express para manejar rutas
const { jsonResponse } = require("../lib/jsonResponse"); // Función personalizada para formatear las respuestas JSON
const { obtenerEmpleadosPorNit } = require("../schema/EmpresasDashboard"); // Importa la función obtenerEmpleadosPorNit

// Define la ruta para el dashboard de empresas
router.post("/dashboard", async (req, res) => {
    const { nit } = req.body; // Extrae el NIT del cuerpo de la solicitud

    // Verifica si el NIT fue proporcionado
    if (!nit) {
        return res.status(400).json(jsonResponse(400, { error: "El NIT es obligatorio." }));
    }
    else
    {
        console.log("soy severa gnorrea",nit);
    }
    try {
        // Llama a la función para obtener empleados por el NIT
        const empleados = await obtenerEmpleadosPorNit(nit);

        // Si no se encuentran empleados, responde con un mensaje
        if (!empleados || empleados.length === 0) {
            return res
                .status(404)
                .json(jsonResponse(404, { message: "No se encontraron empleados para el NIT proporcionado." }));
        }

        // Responde con los empleados encontrados
        res.status(200).json(jsonResponse(200, { empleados }));
    } catch (error) {
        console.error("Error al obtener empleados:", error.message);
        res.status(500).json(jsonResponse(500, { error: "Error interno del servidor." }));
    }
});

module.exports = router; // Exporta el enrutador para que pueda ser utilizado en la configuración principal de rutas
