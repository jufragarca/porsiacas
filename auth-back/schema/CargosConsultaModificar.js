// Conexión a la base de datos
const db = require("../conexion"); // Asegúrate de que esta sea la conexión correcta a la base de datos

// Función para verificar los tipos de datos
const verificarTipoDato = (id, nombre, id_area, id_empresa) => {
  return new Promise((resolve, reject) => {
    console.log("Entré a verificarTipoDato con los valores:", 
                "id:", id, 
                "nombre:", nombre, 
                "id_area:", id_area, 
                "id_empresa:", id_empresa);

    // Verificar y convertir los tipos de datos si es necesario
    if (typeof id !== 'number') {
      id = Number(id); // Convertir a número
      console.log("Tipo de dato de id:", typeof id);
    }
    if (typeof nombre !== 'string') {
      nombre = String(nombre); // Convertir a string
      console.log("Tipo de dato de nombre:", typeof nombre);
    }
    if (typeof id_area !== 'number') {
      id_area = Number(id_area); // Convertir a número
      console.log("Tipo de dato de id_area:", typeof id_area);
    }
    if (typeof id_empresa !== 'number') {
      id_empresa = Number(id_empresa); // Convertir a número
      console.log("Tipo de dato de id_empresa:", typeof id_empresa);
    }

    // Llenar la constante 'datos' con los valores obtenidos
    const datos = {
      id: id,
      nombre: nombre,         // Primero 'nombre'
      id_empresa: id_empresa, // Luego 'id_empresa'
      id_area: id_area        // Luego 'id_area'
    };

    // Imprimir los valores en el objeto JSON
    console.log("Datos finales después de la verificación:", datos);

    resolve(datos); // Resolver con el objeto JSON
  });
};

// Función para actualizar el cargo
const actualizarCargo = (id, nombre, id_area, id_empresa) => {
  return new Promise((resolve, reject) => {
    // Consulta para actualizar los datos del cargo
    const query = `
      UPDATE cargo
      SET nombre = ?, id_area = ?, id_empresa = ?
      WHERE id = ?;
    `;

    // Ejecutar la consulta utilizando parámetros para evitar inyecciones SQL
    db.query(query, 
      [nombre, id_area, id_empresa, id], 
      (err, results) => {
        if (err) {
          console.error("Error en la consulta de actualización del cargo:", err);
          return reject(err);
        }

        // Imprimir el resultado de la consulta
        console.log("Resultado de la actualización:", results);

        // Verificar si alguna fila fue afectada
        if (results.affectedRows > 0) {
          console.log("Cargo actualizado correctamente.");
          resolve(true); // El cargo fue actualizado correctamente
        } else {
          console.log("No se realizaron cambios en el cargo.");
          resolve(false); // No hubo cambios
        }
      }
    );
  });
};

// Exportar las funciones para que puedan ser utilizadas en otros módulos
module.exports = {
  verificarTipoDato,
  actualizarCargo
};
