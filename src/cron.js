const cron = require('node-cron');
const prisma = require('./models/prismaClient');

// Función para verificar y actualizar el estado de las pólizas
const checkPolizaVencidas = async () => {
  try {
    const today = new Date();

    // Obtener pólizas que están vigentes pero cuya fecha de vigencia ha pasado
    const polizas = await prisma.poliza.findMany({
      where: {
        estado: 'VIGENTE',
        fechaVigencia: { lt: today },
      },
    });

    // Actualizar el estado de todas las pólizas vencidas
    for (const poliza of polizas) {
      await prisma.poliza.update({
        where: { id: poliza.id },
        data: { estado: 'VENCIDA' },
      });
    }

    console.log('Estado de pólizas actualizado');
  } catch (error) {
    console.error('Error al actualizar las pólizas vencidas:', error);
  }
};

// Programar la tarea cron para ejecutarse a medianoche todos los días
cron.schedule('0 0 * * *', async () => {
  console.log('Ejecutando tarea cron de actualización de pólizas vencidas...');
  await checkPolizaVencidas();
});
