const db = require("../conexion");

// Función para verificar y convertir tipos de datos
const verificarTipoDato = (nombre_area, id_empresa) => {
  return new Promise((resolve, reject) => {
    console.log("Entré a verificarTipoDato con los valores:", 
                "nombre_area:", nombre_area, 
                "id_empresa:", id_empresa);

    if (typeof nombre_area !== 'string') {
      nombre_area = String(nombre_area); // Convertir a string
      console.log("Tipo de dato de nombre_area:", typeof nombre_area);
    }
    if (typeof id_empresa !== 'number') {
      id_empresa = Number(id_empresa); // Convertir a número
      console.log("Tipo de dato de id_empresa:", typeof id_empresa);
    }

    // Llenar la constante 'datos' con los valores obtenidos
    const datos = {
      nombre_area: nombre_area,
      id_empresa: id_empresa
    };

    // Imprimir los valores en el objeto JSON
    console.log("Datos finales después de la verificación:", datos);

    resolve(datos); // Resolver con el objeto JSON
  });
};

// Función para insertar una nueva área
const CrearAreaConsulta = (datos) => {
  console.log("Entré a CrearAreaConsulta", datos.nombre_area, datos.id_empresa);
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO area (nombre_area, id_empresa) VALUES (?, ?)";

    db.query(query, [datos.nombre_area, datos.id_empresa], (err, results) => {
      if (err) {
        console.error("Error al insertar el área:", err);
        return reject(err);
      }

      console.log("Área insertada con éxito:", results);

      // Devolver los datos relevantes del área creada
      resolve({
        insertId: results.insertId,
        nombre_area: datos.nombre_area,
        id_empresa: datos.id_empresa,
      });
    });
  });
};

module.exports = {
  CrearAreaConsulta,
  verificarTipoDato
};