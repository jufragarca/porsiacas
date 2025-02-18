const db = require("../conexion"); // Asegúrate de que esta sea la conexión correcta a la base de datos

const verificarTipoDato = (id_area, nombre_area, id_empresa) => {
  // Primer console.log con los valores iniciales
  console.log("gonorrea", id_area, nombre_area, id_empresa);

  return new Promise((resolve, reject) => {
    // Verificar y convertir los tipos de datos si es necesario
    if (nombre_area === "nombre") {
      nombre_area = "nombre_area"; // Convertir 'nombre' a 'nombre_area'
    }

    // Verificar y convertir los tipos de datos si es necesario
    if (typeof nombre_area !== "string") {
      nombre_area = String(nombre_area); // Convertir a string si no es un string
    }
    if (typeof id_area !== "number") {
      id_area = Number(id_area); // Convertir a número si no es un número
    }
    if (typeof id_empresa !== "number") {
      id_empresa = Number(id_empresa); // Convertir a número si no es un número
    }

    // Aquí está el console.log después de la conversión
    console.log(
      "Entré a verificarTipoDato con los valores:",
      "id_area:", id_area, "Tipo de id_area:", typeof id_area,
      "nombre_area:", nombre_area, "Tipo de nombre_area:", typeof nombre_area,
      "id_empresa:", id_empresa, "Tipo de id_empresa:", typeof id_empresa
    );

    // Llenar la constante 'datos' con los valores obtenidos
    const datos = {
      id_area,
      nombre_area,  // Asegúrate de usar 'nombre_area' en lugar de 'nombre'
      id_empresa,
    };

    console.log("Datos finales después de la verificación:", datos);
    resolve(datos); // Resolver con el objeto JSON
  });
};

const actualizarArea = async (datos) => {
  console.log("Datos para actualizar área:", datos);

  return new Promise((resolve, reject) => {
    // Consulta para actualizar el área
    const query = `
      UPDATE area
      SET nombre_area = ?, id_empresa = ?
      WHERE id_area = ?;
    `;

    // Ejecutar la consulta utilizando parámetros para evitar inyecciones SQL
    db.query(query, [datos.nombre_area, datos.id_empresa, datos.id_area], (err, results) => {
      if (err) {
        console.error("Error en la consulta para actualizar el área:", err);
        return reject(err);
      }

      console.log("Resultado de la consulta de actualización:", results);
      resolve(results);
    });
  });
};

module.exports = {
  verificarTipoDato,
  actualizarArea,
};
