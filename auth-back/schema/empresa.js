// empresa.js
const db = require("../conexion"); // Asegúrate de que esta sea la conexión correcta a la base de datos

// Función para verificar si la empresa ya existe
const empresaExists = (correo_empresa, callback) => {
  const query = "SELECT * FROM empresa WHERE correo_empresa = ?";
  db.query(query, [correo_empresa], (error, result) => {
    if (error) {
      console.error("Error al verificar si la empresa existe:", error);
      return callback(error);
    }
    return callback(null, result.length > 0);
  });
};

// Función para crear una nueva empresa
const createEmpresa = (
  nit,
  nombre_empresa,
  correo_empresa,
  nombre_contacto,
  celular_contacto,
  password,
  callback
) => {
  const query =
    "INSERT INTO empresa (nit, nombre_empresa, correo_empresa, nombre_contacto, celular_contacto, password) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [nit, nombre_empresa, correo_empresa, nombre_contacto, celular_contacto, password], // Almacena la contraseña en texto plano
    (error, result) => {
      if (error) {
        console.error("Error al crear la empresa:", error);
        return callback(error);
      }
      return callback(null, result);
    }
  );
};

module.exports = {
  empresaExists,
  createEmpresa,
};