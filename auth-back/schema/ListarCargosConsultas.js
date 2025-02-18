// ListarCargosConsultas.js
const db = require("../conexion"); // Importa la conexión a la base de datos

// Función para consultar los cargos basados en el id_empresa
const consultaCargos = (id_empresa) => {
  return new Promise((resolve, reject) => {
    console.log("Ejecutando consulta con id_empresa:", id_empresa);

    // Definir la consulta SQL
    const query = "SELECT id, nombre, id_area, id_empresa FROM cargo WHERE id_empresa = ?";

    // Ejecutar la consulta
    db.query(query, [id_empresa], (err, results) => {
      if (err) {
        console.error("Error en la consulta:", err);
        return reject(err); // Rechazamos la promesa en caso de error
      }

      // Si hay resultados, los pasamos a la promesa
      if (results && results.length > 0) {
        resolve(results); // Resolvemos la promesa con los resultados
      } else {
        resolve([]); // Si no hay resultados, resolvemos con un array vacío
      }
    });
  });
};

module.exports = { consultaCargos };
