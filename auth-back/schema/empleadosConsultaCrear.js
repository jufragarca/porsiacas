// Declaración global de la constante 'datos'
let datos = {}; // Inicializamos como un objeto vacío

// Conexión a la base de datos
const db = require("../conexion"); // Asegúrate de que esta sea la conexión correcta a la base de datos

// Función para verificar los tipos de datos
const verificarTipoDato = (nombre, id_empresa, correo, id_cargo, jefe) => {
  return new Promise((resolve, reject) => {
    console.log(
      "Entré a verificarTipoDato en empleadosConsultaCrear con nombre:",
      nombre,
      "id_empresa:",
      id_empresa,
      "correo:",
      correo,
      "id_cargo:",
      id_cargo,
      "jefe:",
      jefe
    );

    const id = parseInt(jefe, 10); // Convertir 'jefe' a entero

    // Mostrar los tipos de datos antes de la consulta
    console.log("Tipos de datos y valores antes de la consulta:", {
      nombre: { tipo: typeof nombre, valor: nombre },
      id_empresa: { tipo: typeof id_empresa, valor: id_empresa },
      correo: { tipo: typeof correo, valor: correo },
      id_cargo: { tipo: typeof id_cargo, valor: id_cargo },
      jefe: { tipo: typeof jefe, valor: jefe },
    });

    // Consulta SQL para obtener id_cargo e id_empresa
    const query = "SELECT id_cargo, id_empresa FROM empleados WHERE id = ?"; 
    console.log("Consulta SQL:", query);

    // Ejecutar la consulta
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error en la consulta:", err);
        return reject(err);
      }

      console.log("Resultados de la consulta:", results);

      // Asignar el valor de 'id_cargo' y 'id_empresa' a 'datos'
      const id_cargo = parseInt(results[0]?.id_cargo, 10) || 0; // Convertir a entero y manejar valores nulos o indefinidos
      const id_empresa = parseInt(results[0]?.id_empresa, 10) || 0; // Convertir a entero y manejar valores nulos o indefinidos

      // Mantener los valores originales y solo modificar los que vienen de la consulta
      datos = {
        nombre: nombre,
        id_empresa: id_empresa,
        correo: correo,
        id_cargo: id_cargo,
        jefe: id_cargo, // Se asigna el id_cargo como jefe
      };

      // Imprimir los tipos de datos y valores después de la modificación
      console.log("Tipos de datos y valores después de la consulta:", {
        nombre: { tipo: typeof datos.nombre, valor: datos.nombre },
        id_empresa: { tipo: typeof datos.id_empresa, valor: datos.id_empresa },
        correo: { tipo: typeof datos.correo, valor: datos.correo },
        id_cargo: { tipo: typeof datos.id_cargo, valor: datos.id_cargo },
        jefe: { tipo: typeof datos.jefe, valor: datos.jefe },
      });

      resolve(datos); // Resolver con el objeto JSON
    });
  });
};

// Ejemplo de otra función que utiliza la constante global 'datos'
const siElEmpleadoExisteConsulta = () => {
  return new Promise((resolve, reject) => {
    // Verificación de los valores de la constante global 'datos'
    console.log("Verificando campos antes de la inserción:", {
      nombre: { tipo: typeof datos.nombre, valor: datos.nombre },
      id_empresa: { tipo: typeof datos.id_empresa, valor: datos.id_empresa },
      correo: { tipo: typeof datos.correo, valor: datos.correo },
      id_cargo: { tipo: typeof datos.id_cargo, valor: datos.id_cargo },
      jefe: { tipo: typeof datos.jefe, valor: datos.jefe },
    });

    // Consulta para verificar si el empleado ya existe
    const query = "SELECT * FROM empleados WHERE correo = ? AND nombre = ?";
    console.log("Verificando campos despues de la primera consulta:", {
      nombre: { tipo: typeof datos.nombre, valor: datos.nombre },
      id_empresa: { tipo: typeof datos.id_empresa, valor: datos.id_empresa },
      correo: { tipo: typeof datos.correo, valor: datos.correo },
      id_cargo: { tipo: typeof datos.id_cargo, valor: datos.id_cargo },
      jefe: { tipo: typeof datos.jefe, valor: datos.jefe },
    });
    db.query(
      query,
      [datos.correo, datos.nombre],
      (err, results) => {
        if (err) {
          console.error("Error en la consulta de existencia del empleado:", err);
          return reject(err);
        }

        // Si ya existe, devolver true
        if (results.length > 0) {
          resolve(true);
        } else {
          // Verificar si algún campo está vacío antes de insertar
          if (
            !datos.nombre ||
            !datos.id_empresa ||
            !datos.correo ||
            !datos.id_cargo ||
            !datos.jefe
          ) {
            const errorMessage =
              "Error: Todos los campos deben estar completos antes de insertar el nuevo empleado.";
            console.error(errorMessage);
            return reject(new Error(errorMessage));
          }

          // Insertar el nuevo empleado
          const insertQuery = `
            INSERT INTO empleados (nombre, id_empresa, correo, id_cargo, jefe)
            VALUES (?, ?, ?, ?, ?)
          `;

          db.query(
            insertQuery,
            [
              datos.nombre,
              datos.id_empresa,
              datos.correo,
              datos.id_cargo,
              datos.jefe,
            ],
            (insertErr, insertResults) => {
              if (insertErr) {
                console.error("Error al insertar el nuevo empleado:", insertErr);
                return reject(insertErr);
              }

              console.log("Empleado insertado correctamente:", insertResults);
              resolve(false); // El empleado no existía y se insertó correctamente
            }
          );
        }
      }
    );
  });
};

// Exportar las funciones para que puedan ser utilizadas en otros módulos
module.exports = {
  verificarTipoDato,
  siElEmpleadoExisteConsulta,
};
