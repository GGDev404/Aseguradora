const prisma = require('../models/prismaClient');

// Obtener todas las pólizas
const getPolizas = async (req, res) => {
  try {
    const polizas = await prisma.poliza.findMany({
      include: { cliente: true },
    });
    res.status(200).json(polizas);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: 'Error al obtener las pólizas' });
  }
};

async function createPoliza(req, res) {
  const {
    fechaInicio,
    fechaVigencia,
    clienteId,
    asegurados,
    aseguradora,
    tipoPoliza,
    precio,
    estado,
    agenteId,
  } = req.body;

  try {
    const newPoliza = await prisma.poliza.create({
      data: {
        fechaInicio: new Date(fechaInicio),  // Convertir a Date
        fechaVigencia: new Date(fechaVigencia),  // Convertir a Date
        clienteId,
        aseguradora,
        tipoPoliza,
        precio,
        estado,
        agenteId,
        asegurados: {
          create: asegurados, // Crear asegurados en la misma operación
        },
      },
    });

    res.status(201).json(newPoliza);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Actualizar una póliza
const updatePoliza = async (req, res) => {
  try {
    const { numeroDePoliza } = req.params;
    const { agenteId ,fechaInicio, fechaVigencia, aseguradora, tipoPoliza, precio, estado, asegurados } = req.body;

    const poliza = await prisma.poliza.update({
      where: { numeroDePoliza: parseInt(numeroDePoliza) },
      data: {
        fechaInicio: new Date(fechaInicio),
        fechaVigencia: new Date(fechaVigencia),
        aseguradora,
        tipoPoliza,
        precio,
        estado,
        agenteId,
        asegurados: {
          deleteMany: {}, // Eliminar los asegurados actuales (opcional)
          create: asegurados, // Agregar nuevos asegurados
        },
      },
    });

    res.status(200).json(poliza);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la póliza' });
  }
};

// Eliminar una póliza
const deletePoliza = async (req, res) => {
  try {
    const { numeroDePoliza } = req.params;

    await prisma.poliza.delete({
      where: { numeroDePoliza: parseInt(numeroDePoliza) },
    });

    res.status(200).json({ message: 'Póliza eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la póliza' });
  }
};

// Obtener pólizas del tipo GASTOS MÉDICOS, estado VENCIDA, y fecha de vigencia menor al 15/Febrero/2021
const getPolizasGastosMedicosVencidas = async (req, res) => {
  try {
    const polizas = await prisma.poliza.findMany({
      where: {
        tipoPoliza: 'GASTOS_MEDICOS',
        estado: 'VENCIDA',
        fechaVigencia: {
          lt: new Date('2021-02-15'),
        },
      },
      include: { cliente: true },
    });
    res.status(200).json(polizas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener las pólizas' });
  }
};

// Obtener pólizas por estado y fecha de vigencia
const getPolizasPorEstadoYFecha = async (req, res) => {
  const { estado, fecha } = req.query;
  try {
    const polizas = await prisma.poliza.findMany({
      where: {
        estado,
        fechaVigencia: {
          lt: new Date(fecha), // Usamos la fecha especificada en la query string
        },
      },
      include: { cliente: true },
    });
    res.status(200).json(polizas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener las pólizas' });
  }
};

module.exports = { getPolizas, createPoliza, updatePoliza, deletePoliza , getPolizasPorEstadoYFecha, getPolizasGastosMedicosVencidas};
