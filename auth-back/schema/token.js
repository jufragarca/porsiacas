// Ruta para renovar el Access Token usando el Refresh Token
router.post('/token', (req, res) => {
  const { refreshToken } = req.body;

  app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Acceso a la ruta protegida concedido' });
});

  if (!refreshToken) return res.sendStatus(401);

  // Verificar si el refreshToken existe en la base de datos
  const query = 'SELECT * FROM tokens WHERE token = ?';
  db.query(query, [refreshToken], (err, results) => {
      if (err) {
          console.error('Error en la consulta de la base de datos:', err);
          return res.status(500).json({ message: 'Error en el servidor' });
      }

      if (results.length === 0) {
          return res.status(403).json({ message: 'Refresh token no válido' });
      }

      // Verificar y generar nuevo Access Token
      jwt.verify(refreshToken, 'tu_secreto_refresh', (err, user) => {
          if (err) return res.status(403);

          const newAccessToken = generateAccessToken(user);
          res.json({ accessToken: newAccessToken });
      });
  });
});
