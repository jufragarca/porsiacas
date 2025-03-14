const db = require("../conexion"); // Asegúrate de que esta sea la conexión correcta a la base de datos

// Función que verifica los tipos de datos de correo y PASSWORD
const verificarTipoDato = (correo, PASSWORD, telefono) => {
  // Primer console.log con los valores iniciales recibidos
  console.log("estoy en LoginUsuarioSchema", "Correo:", correo, "PASSWORD:", PASSWORD, "telefono:", telefono);

  return new Promise((resolve, reject) => {
    // Revisamos el tipo de dato de correo, PASSWORD y telefono
    if (typeof correo === 'string' && typeof PASSWORD === 'string' && typeof telefono === 'number') {
      console.log(
        "Entré a verificarTipoDato con los valores:",
        "correo:", correo, "Tipo de correo:", typeof correo, // Mostrar tipo de dato de correo
        "PASSWORD:", PASSWORD, "Tipo de PASSWORD:", typeof PASSWORD, // Mostrar tipo de dato de PASSWORD
        "telefono:", telefono, "Tipo de telefono:", typeof telefono // Mostrar tipo de dato de telefono
      );
    } else {
      // Convertir los datos si no son del tipo esperado
      correo = String(correo);
      PASSWORD = String(PASSWORD).toUpperCase();  // Convertir PASSWORD a mayúsculas
      telefono = Number(telefono);
    }

    // Llenar la variable con los nuevos datos convertidos
    const datos = {
      correo,
      PASSWORD,  // Asegúrate de que PASSWORD esté en mayúsculas
      telefono
    };

    // Imprimir los datos después de que hayan sido convertidos
    console.log("Datos finales después de la verificación:", 
                "correo:", datos.correo, "Tipo de correo:", typeof datos.correo, 
                "PASSWORD:", datos.PASSWORD, "Tipo de PASSWORD:", typeof datos.PASSWORD,
                "telefono:", datos.telefono, "Tipo de telefono:", typeof datos.telefono);

    resolve(datos); // Resolver con el objeto JSON que contiene los datos
  });
};

// Función que realiza el login del usuario
const logearUsuario = async (datos) => {
  // Mostrar los datos que se van a usar para realizar el login
  console.log("Datos para logear usuario:", datos);

  return new Promise((resolve, reject) => {
    // Consulta SQL para verificar si el correo y la PASSWORD coinciden con algún usuario en la base de datos
    const query = `
      SELECT * FROM empleados WHERE correo = ? AND PASSWORD = ? AND telefono = ?
    `;

    // Ejecutar la consulta utilizando parámetros para evitar inyecciones SQL
    db.query(query, [datos.correo, datos.PASSWORD, datos.telefono], (err, results) => {
      if (err) {
        // Si ocurre un error en la consulta, se muestra un mensaje de error
        console.error("Error en la consulta para logear al usuario:", err);
        return reject(err);
      }

      // Mostrar el resultado de la consulta, que puede ser un usuario encontrado
      console.log("Resultado de la consulta de login:", results);
      resolve(results); // Resolver con los resultados de la consulta
    });
  });
};

// Exportar las funciones para que puedan ser utilizadas en otros archivos
module.exports = {
  verificarTipoDato, // Exportar la función que valida los tipos de datos
  logearUsuario,     // Exportar la función que realiza el login del usuario
};
