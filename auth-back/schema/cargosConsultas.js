// Importar la conexión a la base de datos
const db = require("../conexion");

// Función para obtener los cargos de los empleados
// En CargosConsultas.js (o donde definas la consulta)

const consultaCargos = (id_empresa, callback) => {
    // Aquí va la lógica de la consulta
    console.log("idEmprsa en CargosConsultas".id_empresa)
    const query = "select * from cargo where id_empresa = ?";
    console.log("cargosConsultas",query);
    db.query(query, [id_empresa], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  };
  
  module.exports = { consultaCargos };
  
// Exportar la función para su uso en otras partes
module.exports = {
  consultaCargos,
};
