const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require("../conexion");
const path = require('path');
const fs = require('fs'); // Se agrega para manejar archivos y directorios

console.log("🔥 Servidor escuchando en /RecibeAudios");

// Middleware para parsear JSON y datos de formularios
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Configuración de `multer` para guardar el archivo de audio
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../audios/archivos_audios'); // ✅ Ruta corregida

    // Verificar si la carpeta existe, si no, crearla
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
    console.log('📁 Destino del archivo:', uploadPath);
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName);
    console.log('🎙️ Archivo guardado como:', fileName);
  }
});

const upload = multer({ storage: storage });

// ✅ Ruta para recibir un solo audio + `id_usuario` + `score`
router.post('/', upload.single('audio'), (req, res) => {
  
  console.log("📩 Nueva solicitud recibida en /RecibeAudios");
  console.log("🔍 req.body completo:", req.body);
  console.log("🔍 req.file:", req.file);

  const { id_usuario, score } = req.body; // Obtener datos enviados

  console.log('📌 ID Usuario recibido:', id_usuario);
  console.log('⭐ Score recibido:', score);

  // Verificación de datos recibidos
  if (!id_usuario) {
    console.log('⚠️ ERROR: No se recibió `id_usuario`');
    return res.status(400).json({ error: 'No se recibió id_usuario' });
  }

  if (!score) {
    console.log('⚠️ ERROR: No se recibió `score`');
    return res.status(400).json({ error: 'No se recibió score' });
  }

  if (!req.file) {
    console.log('⚠️ ERROR: No se recibió ningún archivo de audio');
    return res.status(400).json({ error: 'No se recibió ningún archivo de audio.' });
  }

  const audio = req.file.filename; // Nombre del archivo guardado
  console.log('✅ Archivo recibido correctamente:', audio);
  
  // 🔍 Verificar el formato MIME del audio recibido
  console.log('🎵 Formato del archivo recibido:', req.file.mimetype);

  // Insertar datos en la base de datos
  const query = 'INSERT INTO audios (id_usuario, score, audio) VALUES (?, ?, ?)';
  const values = [id_usuario, score, audio];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('❌ Error al guardar el audio en la BD:', err);
      return res.status(500).json({ error: 'Error al guardar el audio.' });
    }
    console.log('✅ Audio guardado correctamente en la BD');
    res.status(200).json({ message: 'Audio guardado correctamente.' });
  });
});

module.exports = router;
