// Declaración global de la constante 'datos'
let datos = {}; // Inicializamos como un objeto vacío

// Conexión a la base de datos
const db = require("../conexion"); // Asegúrate de que esta sea la conexión correcta a la base de datos

// Función para verificar los tipos de datos
const validarDatosBack = (id_empresa, id_area, nombre) => {
  return new Promise((resolve, reject) => {
    console.log("Entré a verificarTipoDato con los valores:", 
                "id_empresa:", id_empresa, 
                "id_area:", id_area, 
                "nombre:", nombre);
                
    // Verificar el tipo de cada variable e imprimirlo en la consola
    console.log("Tipo de dato de id_empresa:", typeof id_empresa);
    console.log("Tipo de dato de id_area:", typeof id_area);
    console.log("Tipo de dato de nombre:", typeof nombre);
    
    // Llenar la constante 'datos' con los valores obtenidos
    datos = {
        id_empresa,
        id_area,
        nombre
    };

    // Imprimir los valores en el objeto JSON
    console.log("Datos finales después de la verificación:", datos);

    resolve(datos); // Resolver con el objeto JSON
  });
};

// Función para cargar las áreas relacionadas con el id_empresa
const areasCargadas = (id_empresa) => {
  return new Promise((resolve, reject) => {
    // Verificación de los valores de la constante global 'datos'
    console.log("Datos para cargar áreas:", datos);

    // Consulta para cargar las áreas relacionadas con el id_empresa
    const query = `SELECT * from area where id_empresa=?;`;

    // Ejecutar la consulta utilizando parámetros para evitar inyecciones SQL
    db.query(query, [id_empresa], (err, results) => {
      if (err) {
        console.error("Error en la consulta para cargar áreas:", err);
        return reject(err);
      }

      // Imprimir el resultado de la consulta
      console.log("Resultado de la consulta de áreas:", results);

      // Verificar si se encontraron áreas
      if (results.length > 0) {
        console.log("Áreas encontradas:", results);
        resolve(results); // Devolver las áreas encontradas
      } else {
        console.log("No se encontraron áreas para esta empresa.");
        resolve([]); // No se encontraron áreas
      }
    });
  });
};

// Exportar las funciones para que puedan ser utilizadas en otros módulos
module.exports = {
    validarDatosBack,
    areasCargadas
};
