const db = require("../conexion"); // Importa la conexión a la base de datos desde el archivo `conexion.js`

// Función para verificar si el NIT y el correo de una empresa existen en la base de datos
const empresaExists = (nit, correo_empresa, callback) => {
  const query = "SELECT * FROM empresa WHERE nit = ? AND correo_empresa = ?"; // Consulta SQL para buscar una empresa con el NIT y correo proporcionados
  
  // Ejecuta la consulta en la base de datos
  db.query(query, [nit, correo_empresa], (error, result) => {
    if (error) {
      console.error("Error al verificar si la empresa existe:", error); // Imprime un mensaje de error en la consola si ocurre un problema
      return callback(error); // Retorna el error al callback para que sea manejado externamente
    }
    return callback(null, result.length > 0, result[0]); 
    // Si no hay errores, llama al callback:
    // - Primer argumento: null (sin error)
    // - Segundo argumento: true si la empresa existe, false si no
    // - Tercer argumento: el primer registro de la empresa encontrada, si existe
  });
};

// Función para verificar la contraseña ingresada por el usuario
const verifyPassword = (inputPassword, storedPassword) => {
  // Compara la contraseña ingresada (`inputPassword`) con la almacenada en la base de datos (`storedPassword`)
  return inputPassword === storedPassword;
  // Nota: Esto utiliza texto plano para la comparación. Es recomendable usar un sistema de hash seguro como bcrypt para la seguridad.
};

// Exporta las funciones para que puedan ser utilizadas en otros módulos del proyecto
module.exports = {
  empresaExists,
  verifyPassword,
};
