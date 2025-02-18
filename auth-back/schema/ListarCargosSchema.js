const { db } = require("./db"); // Asegúrate de tener la conexión a la base de datos configurada

// Función para consultar los cargos en la base de datos
const consultaCargos = (id_empresa, nombre = "", id_area = null, id_cargo = null, callback) => {
  const query = `
    SELECT id, nombre, id_area, id_empresa
    FROM cargos
    WHERE id_empresa = ?
    ${nombre ? "AND nombre LIKE ?" : ""}
    ${id_area ? "AND id_area = ?" : ""}
    ${id_cargo ? "AND id = ?" : ""}
  `;
  
  const params = [id_empresa];
  if (nombre) params.push(`%${nombre}%`);
  if (id_area) params.push(id_area);
  if (id_cargo) params.push(id_cargo);

  db.query(query, params, (err, results) => {
    if (err) return callback(err, null);
    return callback(null, results);
  });
};

module.exports = {
  consultaCargos,
};
