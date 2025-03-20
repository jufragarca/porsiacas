const express = require('express');
const router = express.Router();

let resultados = []; // Almacén temporal de resultados

router.post('/', (req, res) => {
  console.log('Nuevo resultado recibido de Flask');
  console.log('Cuerpo de la petición:', req.body);

  if (!req.body) {
    return res.status(400).json({ error: 'Petición vacía' });
  }

  resultados.push(req.body);
  res.status(200).json({ message: 'Resultado recibido exitosamente' });
});

router.get('/', (req, res) => {
  res.json(resultados);
});

// 🚨 Esto debe estar bien escrito y no debe haber otro `module.exports`
module.exports = router;
