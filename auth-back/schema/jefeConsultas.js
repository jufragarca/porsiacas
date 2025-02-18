// Importar la conexión a la base de datos
const db = require("../conexion");

// Función para obtener los cargos de los empleados
const jefeConsultas = (JefeID, callback) => {
  // Aquí va la lógica de la consulta
  const query = "SELECT * FROM empleados WHERE id_empresa = ?";

  
  db.query(query, [JefeID], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Exportar la función para su uso en otras partes
module.exports = { jefeConsultas };