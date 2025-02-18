// Declaración global de la constante 'datos'
let datos = {}; // Inicializamos como un objeto vacío

// Conexión a la base de datos
const db = require("../conexion"); // Asegúrate de que esta sea la conexión correcta a la base de datos

// Función para verificar los tipos de datos
const verificarTipoDato = (id, nombre, id_empresa, correo, id_cargo, jefe) => {
  return new Promise((resolve, reject) => {
    console.log("Entré a verificarTipoDato con los valores:", 
                "id:", id, 
                "nombre:", nombre, 
                "id_empresa:", id_empresa, 
                "correo:", correo, 
                "id_cargo:", id_cargo, 
                "jefe:", jefe);

    // Verificar el tipo de cada variable e imprimirlo en la consola
    console.log("Tipo de dato de id:", typeof id);
    console.log("Tipo de dato de nombre:", typeof nombre);
    console.log("Tipo de dato de id_empresa:", typeof id_empresa);
    console.log("Tipo de dato de correo:", typeof correo);
    console.log("Tipo de dato de id_cargo:", typeof id_cargo);
    console.log("Tipo de dato de jefe:", typeof jefe);

    // Llenar la constante 'datos' con los valores obtenidos
    datos = {
      id: id,
      nombre: nombre,         // Primero 'nombre'
      id_empresa: id_empresa, // Luego 'id_empresa'
      correo: correo,         // Luego 'correo'
      id_cargo: id_cargo,     // Luego 'id_cargo'
      jefe: jefe              // Finalmente 'jefe'
    };

    // Imprimir los valores en el objeto JSON
    console.log("Datos finales después de la consulta:", datos);

    resolve(datos); // Resolver con el objeto JSON
  });
};

// Función para actualizar el empleado
const actualizarEmpleado = () => {
  return new Promise((resolve, reject) => {
    // Verificación de los valores de la constante global 'datos'
    console.log("Datos del empleado a actualizar:", datos);

    // Consulta para actualizar los datos del empleado
    const query = `
      UPDATE empleados
      SET nombre = ?, 
          id_empresa = ?, 
          correo = ?, 
          id_cargo = ?, 
          jefe = ?
      WHERE id = ?;
    `;

    // Ejecutar la consulta utilizando parámetros para evitar inyecciones SQL
    db.query(query, 
      [datos.nombre, datos.id_empresa, datos.correo, datos.id_cargo, datos.jefe, datos.id], 
      (err, results) => {
        if (err) {
          console.error("Error en la consulta de actualización del empleado:", err);
          return reject(err);
        }

        // Imprimir el resultado de la consulta
        console.log("Resultado de la actualización:", results);

        // Verificar si alguna fila fue afectada
        if (results.affectedRows > 0) {
          console.log("Empleado actualizado correctamente.");
          resolve(true); // El empleado fue actualizado correctamente
        } else {
          console.log("No se realizaron cambios en el empleado.");
          resolve(false); // No hubo cambios
        }
      }
    );
  });
};

// Exportar las funciones para que puedan ser utilizadas en otros módulos
module.exports = {
  verificarTipoDato,
  actualizarEmpleado
};
