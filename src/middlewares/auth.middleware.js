const { verifyToken } = require('../utils/jwt');

// Middleware de autenticación para proteger rutas
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
  }

  const user = verifyToken(token);
  if (!user) {
    return res.status(403).json({ message: 'Token inválido o expirado.' });
  }

  req.user = user;
  next();
};

module.exports = { authenticateToken };
