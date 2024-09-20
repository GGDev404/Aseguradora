const app = require('./app');
const cron = require('./cron');  // Incluir el cron para que inicie al arrancar el servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
