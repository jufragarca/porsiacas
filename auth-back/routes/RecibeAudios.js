const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../conexion');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

console.log("Servidor escuchando en /RecibeAudios");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../audios/archivos_audios');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

router.post('/', upload.single('audio'), (req, res) => {
  console.log("Nueva solicitud recibida en /RecibeAudios");

  const { id_usuario, score } = req.body;
  if (!id_usuario || !score || !req.file) {
    console.error("Error: Falta id_usuario, score o el archivo de audio");
    return res.sendStatus(400);
  }

  const audio = req.file.filename;
  console.log('Archivo recibido correctamente:', audio);
  console.log(`id_usuario recibido: ${id_usuario}`);

  const query = 'INSERT INTO audios (id_usuario, score, audio) VALUES (?, ?, ?)';
  
  db.query(query, [id_usuario, score, audio], (err) => {
    if (err) {
      console.error('Error al guardar el audio en la BD:', err);
      return res.sendStatus(500);
    }

    console.log('Audio guardado correctamente en la BD');
    console.log(`Enviando id_usuario: ${id_usuario} a auth-back/audios/prueba.py`);

    const rutaPython = path.join(__dirname, '../audios/prueba.py');
    const comando = `python "${rutaPython}" ${id_usuario}`;

    console.log(`Ejecutando: ${comando}`);

    exec(comando, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al ejecutar prueba.py: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`STDERR: ${stderr}`);
        return;
      }
      console.log(`Salida de prueba.py: ${stdout}`);
    });

    res.sendStatus(200);
  });
});

module.exports = router;
