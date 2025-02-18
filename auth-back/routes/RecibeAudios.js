const express = require('express'); // Módulo para crear aplicaciones web y manejar solicitudes HTTP.
const router = express.Router(); // Crear un enrutador de Express
const multer = require('multer'); // Middleware para manejar la carga de archivos en solicitudes HTTP.
const db = require("../conexion"); // Módulo personalizado para manejar la conexión a la base de datos.
const path = require('path'); // Módulo para manejar rutas de archivos.

// Configuración de multer para la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../archivos_audios'); // Ruta donde se guardarán los archivos.
    cb(null, uploadPath); // Se confirma la ruta de destino.
    console.log('Destino: ' + uploadPath);
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname); // Se crea un nombre único para cada archivo.
    cb(null, fileName); // Se confirma el nombre del archivo.
    console.log('Nombre del archivo: ' + fileName); // Imprime el nombre del archivo
  }
});

// Inicialización de multer con la configuración de almacenamiento
const upload = multer({ storage: storage });


console.log("estoy en RecibeAudios")
// Ruta para recibir los audios y guardarlos en la base de datos
router.post('/RecibeAudios', upload.fields([
  { name: 'audio1', maxCount: 1 },
  { name: 'audio2', maxCount: 1 },
  { name: 'audio3', maxCount: 1 }
]), (req, res) => {
  const { id } = req.body; // Se obtiene el ID del usuario desde el cuerpo de la solicitud.
  console.log('ID recibido:', id); // Verifica que el id esté presente

  // Verificar si los archivos fueron recibidos
  console.log('Archivos recibidos:', req.files); // Verifica los archivos que llegaron


  const audio1 = req.files['audio1'] ? req.files['audio1'][0].filename : null;
  const audio2 = req.files['audio2'] ? req.files['audio2'][0].filename : null;
  const audio3 = req.files['audio3'] ? req.files['audio3'][0].filename : null;

  // Verificación de si los audios fueron recibidos
  if (!audio1 && !audio2 && !audio3) {
    console.log('No se recibieron audios'); // Agregar un log si no llegaron audios
    return res.status(400).json({ error: 'No se recibieron audios.' });
  }

  // Mostrar los archivos que se guardarán
  console.log('Archivos a guardar:', { audio1, audio2, audio3 });

  // Insertar los datos en la base de datos
  const query = 'INSERT INTO audios (id_usuario, audio1, audio2, audio3) VALUES (?, ?, ?, ?)';
  const values = [id, audio1, audio2, audio3];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al guardar los audios:', err);
      return res.status(500).json({ error: 'Error al guardar los audios.' });
    }
    console.log('Audios guardados correctamente');
    res.status(200).json({ message: 'Audios guardados correctamente.' });
  });
});

module.exports = router; // Exportar el enrutador para que pueda ser utilizado en otros archivos
