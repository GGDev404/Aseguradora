const prisma = require('../models/prismaClient');

// Obtener todos los clientes
const getClientes = async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los clientes' });
  }
};

// Crear un nuevo cliente
const createCliente = async (req, res) => {
  try {
    const { nombre, telefono, email, agenteId } = req.body;

    const cliente = await prisma.cliente.create({
      data: {
        nombre,
        telefono,
        email,
        agenteId,
      },
    });

    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el cliente' });
  }
};

// Actualizar un cliente
const updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, telefono, email } = req.body;

    const cliente = await prisma.cliente.update({
      where: { id: parseInt(id) },
      data: { nombre, telefono, email },
    });

    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
};

// Eliminar un cliente
const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.cliente.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Cliente eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el cliente' });
  }
};

module.exports = { getClientes, createCliente, updateCliente, deleteCliente };
