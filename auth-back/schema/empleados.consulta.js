// Importar la conexión a la base de datos
const db = require("../conexion");

// Función que verifica si una empresa existe en la base de datos
const silaEmpreExistEmpleadosConsulta = (id_empresa, callback) => {
  console.log("Entré a silaEmpreExistEmpleadosConsulta con id_empresa:", id_empresa); 

  try {
    const idEmpresaNumero = parseInt(id_empresa, 10); // Aseguramos que sea un entero

    if (isNaN(idEmpresaNumero)) {
      throw new Error("id_empresa no es un número válido");
    }

    // Realizar una consulta para verificar si la empresa existe en la base de datos
    const query = "SELECT * from empresa WHERE id = ?";
    
db.query(query, [idEmpresaNumero], (err, results) => {
  if (err) {
    callback(err, null);
    return;
  }
  console.log("Resultado de la consulta empresa:", results); // Imprimir los resultados de la consulta
  // Verificamos si la empresa existe
  const existe = results.length > 0; // Cambié 'count' por 'length' para verificar si hay resultados
  console.log("Resultado de existencia:", existe);
  callback(null, existe);
});
} catch (err) {
  console.error("Error dentro de silaEmpreExistEmpleadosConsulta:", err);
  callback(err, null);
}

};

// Función que consulta la tabla empleados con filtros opcionales
const consultaEmpleados = (id_empresa, nombre, correo, id_cargo, jefe, callback) => {
  //console.log("Entré a consultaEmpleados con id_empresa:", id_empresa);

  // Parámetros para la consulta
  const params = [id_empresa];
  let query = "SELECT * FROM empleados WHERE id_empresa = ?";

  // Agregar dinámicamente condiciones según los parámetros disponibles
  if (nombre) {
    query += " AND nombre = ?";
    params.push(nombre);
  }
  if (correo) {
    query += " AND correo = ?";
    params.push(correo);
  }
  if (id_cargo) {
    query += " AND id_cargo = ?";
    params.push(id_cargo);
  }
  if (jefe) {
    query += " AND jefe = ?";
    params.push(jefe);
  }

  //console.log("Consulta generada:", query);
  //console.log("Parámetros utilizados:", params);

  // Ejecutar la consulta
  db.query(query, params, (error, results) => {
    if (error) {
      console.error("Error al consultar empleados:", error);
      return callback(error, null); // Retorna el error al callback
    }

    if (results.length > 0) {
      callback(null, results); // Devuelve los empleados encontrados
    } else {
      callback(null, null); // Si no se encuentran empleados, devuelve null
    }
  });
};

// Función para obtener los cargos (aún no implementada)
const getCargos = async (id_empresa) => {
  try {
    console.log("Entré a getCargos en empleados.consultas con id_empresa:", id_empresa); 
    
  } catch (error) {
    console.error('Error al obtener los cargos:', error);
    throw error;
  }
};

// Exportar las funciones para su uso en otras partes
module.exports = {
  silaEmpreExistEmpleadosConsulta,
  consultaEmpleados,
  getCargos,
};
