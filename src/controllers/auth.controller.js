const { hashPassword, comparePassword } = require('../utils/hashPassword');
const { generateToken } = require('../utils/jwt');
const prisma = require('../models/prismaClient');

// Registro de un nuevo agente
const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Verificar si el correo ya existe
    const existingAgente = await prisma.agente.findUnique({ where: { email } });
    if (existingAgente) {
      return res.status(400).json({ error: 'El correo ya está registrado.' });
    }

    // Hashear la contraseña
    const hashedPassword = await hashPassword(password);

    // Crear el agente en la base de datos
    const agente = await prisma.agente.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'Agente registrado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error en el registro del agente.' });
  }
};

// Inicio de sesión
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar al agente por su correo
    const agente = await prisma.agente.findUnique({ where: { email } });
    if (!agente) {
      return res.status(404).json({ error: 'Agente no encontrado.' });
    }

    // Comparar las contraseñas
    const isPasswordValid = await comparePassword(password, agente.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Contraseña incorrecta.' });
    }

    // Generar el token JWT
    const token = generateToken(agente.id);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión.' });
  }
};

module.exports = { register, login };
