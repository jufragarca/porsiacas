// Conexión a la base de datos
const db = require("../conexion");

// Función para verificar los tipos de datos en la tabla empleados
const verificarTipoDato = (nombre, id_empresa, correo, id_cargo, jefe, telefono, PASSWORD) => {
  return new Promise((resolve) => {
    console.log("Entré a verificarTipoDato en empleadosConsultaCrear con:", {
      nombre,
      id_empresa,
      correo,
      id_cargo,
      jefe,
      telefono,
      PASSWORD,
    });

    // Construir objeto con los datos verificados
    const datos = { nombre, id_empresa, correo, id_cargo, jefe, telefono, PASSWORD };

    resolve(datos);
  });
};

// Función para verificar si el empleado ya existe y, si no, insertarlo
const siElEmpleadoExisteConsulta = (nombre, id_empresa, correo, id_cargo, jefe, telefono, PASSWORD) => {
  return new Promise((resolve, reject) => {
    console.log("Verificando existencia del empleado con:", correo, telefono);

    const query = "SELECT * FROM empleados WHERE correo = ? AND telefono = ?";

    db.query(query, [correo, telefono], (err, results) => {
      if (err) {
        console.error("Error en la consulta de existencia del empleado:", err);
        return reject(err);
      }

      if (results.length > 0) {
        console.log("El empleado ya existe en la base de datos.");
        return resolve(true); // El empleado ya está registrado
      }

      // Insertar el nuevo empleado si no existe
      const insertQuery = `
        INSERT INTO empleados (nombre, id_empresa, correo, id_cargo, jefe, telefono, PASSWORD)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(insertQuery, [nombre, id_empresa, correo, id_cargo, jefe, telefono, PASSWORD], (insertErr, insertResults) => {
        if (insertErr) {
          console.error("Error al insertar el nuevo empleado:", insertErr);
          return reject(insertErr);
        }

        console.log("Empleado insertado correctamente:", insertResults);
        resolve(false); // El empleado no existía y se insertó correctamente
      });
    });
  });
};

// Exportar funciones
module.exports = {
  verificarTipoDato,
  siElEmpleadoExisteConsulta,
};
