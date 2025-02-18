// Declaración global de las constantes 'datos' y 'datos2'
let datos = {};
let datos2 = {}; // Inicializamos como un objeto vacío

// Conexión a la base de datos
const db = require("../conexion"); // Asegúrate de que esta sea la conexión correcta a la base de datos

// Función para verificar los tipos de datos
const verificarTipoDato = (nombre, id_area, id_empresa) => {
  return new Promise((resolve, reject) => {
    console.log(
      `Entré a verificarTipoDato con los siguientes datos: \nNombre: ${nombre} \nID Área: ${id_area} \nID Empresa: ${id_empresa}`
    );

    // Convertir id_empresa e id_area a enteros
    id_empresa = Number(id_empresa);
    id_area = Number(id_area);

    // Mostrar los tipos de datos antes de la consulta
    console.log("Tipos de datos y valores antes de la consulta:", {
      nombre: { tipo: typeof nombre, valor: nombre },
      id_area: { tipo: typeof id_area, valor: id_area },
      id_empresa: { tipo: typeof id_empresa, valor: id_empresa },
    });

    // Asignamos los valores a la constante global 'datos'
    datos = {
      nombre: nombre,
      id_area: id_area,
      id_empresa: id_empresa,
    };

    resolve(datos); // Resolver con el objeto JSON
  });
};

// Función para verificar si el cargo ya existe
const siElEmpleadoExisteConsulta = () => {
  return new Promise((resolve, reject) => {
    console.log("Verificando existencia del cargo con los datos:", datos);

    const queryVerificar = "SELECT * FROM cargo WHERE nombre = ? AND id_area = ? AND id_empresa = ?";

    db.query(queryVerificar, [datos.nombre, datos.id_area, datos.id_empresa], (err, results) => {
      if (err) {
        console.error("Error en la consulta de existencia del cargo:", err);
        return reject({
          success: false,
          message: "Error en la consulta de existencia del cargo",
          error: err,
        });
      }

      if (results.length > 0) {
        console.log("El cargo ya existe.");
        resolve({
          success: true,
          message: "El cargo ya existe",
          data: results,
        });
      } else {
        console.log("El cargo no existe, listo para inserción.");
        resolve({
          success: false,
          message: "El cargo no existe",
        });
      }
    });
  });
};

// Función para insertar un nuevo cargo
const insertarCargo = (nombre, idArea, idEmpresa) => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO cargo (nombre, id_area, id_empresa) VALUES (?, ?, ?)";

    db.query(query, [nombre, idArea, idEmpresa], (err, results) => {
      if (err) {
        console.error("Error al insertar el cargo:", err);
        return reject(err);
      }

      console.log("Cargo insertado con éxito:", results);

      // Devuelve un objeto con los datos relevantes
      resolve({
        insertId: results.insertId, // ID del nuevo registro
        nombre: nombre,
        idArea: idArea,
        idEmpresa: idEmpresa,
      });
    });
  });
};


// Exportar las funciones
module.exports = {
  verificarTipoDato,
  siElEmpleadoExisteConsulta,
  insertarCargo,
};
