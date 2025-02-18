// Asegúrate de que tienes la conexión configurada
const db = require('../conexion');

// Función que verifica si una empresa existe en la base de datos mediante el correo de la empresa
const empresaExiste = (correo_empresa, callback) => {
  const query = "SELECT COUNT(*) AS count FROM empresa WHERE correo_empresa = ?";
  db.query(query, [correo_empresa], (error, results) => {
    if (error) {
      console.error("Error al verificar si la empresa existe:", error);
      return callback(error); // Retorna el error en el callback
    }

    // Verifica si el número de empresas encontradas es mayor que 0, lo que indica que existe
    if (results[0].count > 0) {
      return callback(null, true); // La empresa existe
    } else {
      return callback(null, false); // La empresa no existe
    }
  });
};

// Función que consulta la empresa por su NIT, correo y password
const consultarEmpresaPorCredenciales = (nit, correo_empresa, password, callback) => {
  const query = "SELECT * FROM empresa WHERE nit = ? AND correo_empresa = ? AND password = ?";
  db.query(query, [nit, correo_empresa, password], (error, results) => {
    if (error) {
      console.error("Error al consultar empresa por NIT, correo y password:", error);
      return callback(error); // Retorna el error al callback
    }

    // Si la consulta retorna resultados, devuelve la empresa encontrada
    if (results.length > 0) {
      const empresa = results[0];
      callback(null, empresa); // Devuelve la empresa encontrada
    } else {
      callback(null, null); // Si no se encuentra la empresa, devuelve null
    }
  });
};

module.exports = {
  empresaExiste,
  consultarEmpresaPorCredenciales,
};
