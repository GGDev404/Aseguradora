const prisma = require('../models/prismaClient');
const bcrypt = require('bcrypt');

// Obtener todos los agentes
const getAgentes = async (req, res) => {
  try {
    const agentes = await prisma.agente.findMany();
    res.status(200).json(agentes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los agentes' });
  }
};

// Crear un nuevo agente
const createAgente = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const agente = await prisma.agente.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json(agente);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el agente' });
  }
};

// Actualizar un agente
const updateAgente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, password } = req.body;

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const agente = await prisma.agente.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        email,
        password: hashedPassword,
      },
    });

    res.status(200).json(agente);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el agente' });
  }
};

// Eliminar un agente
const deleteAgente = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.agente.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Agente eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el agente' });
  }
};

module.exports = { getAgentes, createAgente, updateAgente, deleteAgente };
