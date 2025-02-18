// db.js
const mysql = require('mysql2');
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env


// Configuración de la conexión a la base de datos usando las variables de entorno
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'feedback',
});

// Establecer la conexión
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos MySQL desde la conexion');
});

// Exportamos la conexión para utilizarla en otros archivos
module.exports = connection;
