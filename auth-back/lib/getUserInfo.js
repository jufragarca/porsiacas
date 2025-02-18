function getUserInfo(user) {
  return {
    nit: user.nit,
    correo_empresa: user.correo_empresa,
    password: user.password,  // Si quieres devolver el password (no es usual por seguridad)
  };
}

module.exports = getUserInfo;
