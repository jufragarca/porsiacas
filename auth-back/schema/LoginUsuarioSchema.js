const db = require("../conexion"); // Asegúrate de que esta sea la conexión correcta a la base de datos

// Función que verifica los tipos de datos de correo y contraseña
const verificarTipoDato = (correo, password, telefono) => {
  // Primer console.log con los valores iniciales recibidos
  console.log("estoy en LoginUsuarioSchema", "Correo:", correo, "password:", password, "telefono:", telefono);

  return new Promise((resolve, reject) => {
    // Revisamos el tipo de dato de correo, password y telefono
    if (typeof correo === 'string' && typeof password === 'string' && typeof telefono === 'number') {
      console.log(
        "Entré a verificarTipoDato con los valores:",
        "correo:", correo, "Tipo de correo:", typeof correo, // Mostrar tipo de dato de correo
        "password:", password, "Tipo de password:", typeof password, // Mostrar tipo de dato de password
        "telefono:", telefono, "Tipo de telefono:", typeof telefono // Mostrar tipo de dato de telefono
      );
    } else {
      // Convertir los datos si no son del tipo esperado
      correo = String(correo);
      password = String(password);
      telefono = Number(telefono);
    }

    // Llenar la variable con los nuevos datos convertidos
    const datos = {
      correo,
      password,  // Asegúrate de usar 'nombre_area' en lugar de 'nombre'
      telefono
    };

    // Imprimir los datos después de que hayan sido convertidos
    console.log("Datos finales después de la verificación:", 
                "correo:", datos.correo, "Tipo de correo:", typeof datos.correo, 
                "password:", datos.password, "Tipo de password:", typeof datos.password,
                "telefono:", datos.telefono, "Tipo de telefono:", typeof datos.telefono);

    resolve(datos); // Resolver con el objeto JSON que contiene los datos
  });
};

// Función que realiza el login del usuario
const logearUsuario = async (datos) => {
  // Mostrar los datos que se van a usar para realizar el login
  console.log("Datos para logear usuario:", datos);

  return new Promise((resolve, reject) => {
    // Consulta SQL para verificar si el correo y la contraseña coinciden con algún usuario en la base de datos
    const query = `
      SELECT * FROM empleados WHERE correo = ? AND password = ? AND telefono = ?
    `;

    // Ejecutar la consulta utilizando parámetros para evitar inyecciones SQL
    db.query(query, [datos.correo, datos.password, datos.telefono], (err, results) => {
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
