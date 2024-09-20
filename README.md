
# Gestión de Pólizas para Agentes de Seguros

Este proyecto es una API RESTful desarrollada con Node.js que permite a los agentes de seguros gestionar clientes, pólizas y asegurados. La aplicación incluye autenticación con JWT, tareas automáticas con node-cron y está documentada con Swagger.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Variables de Entorno](#variables-de-entorno)
- [Estructura de la Base de Datos](#estructura-de-la-base-de-datos)
- [Documentación de la API](#documentación-de-la-api)
- [Tareas Programadas](#tareas-programadas)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)


## Instalación

Para instalar el proyecto en tu máquina local, sigue estos pasos:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/gestor-polizas.git
   ```

2. Navega a la carpeta del proyecto:

   ```bash
   cd gestor-polizas
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Crea un archivo `.env` en el directorio raíz con las variables de entorno necesarias (ver sección [Variables de Entorno](#variables-de-entorno)).

5. Configura tu base de datos PostgreSQL y aplica las migraciones de Prisma:

   ```bash
   npx prisma migrate dev
   ```

6. Genera el cliente de Prisma:

   ```bash
   npx prisma generate
   ```

## Uso

Para ejecutar la aplicación en modo desarrollo:

```bash
npm run dev
```

Para ejecutar la aplicación en producción:

```bash
npm start
```

## Variables de Entorno

Configura las siguientes variables en tu archivo `.env`:

```bash
DATABASE_URL=postgresql://<USER>:<PASSWORD>@localhost:5432/<DATABASE_NAME>
JWT_SECRET=tu_secreto_para_jwt
PORT=3000
```

- `DATABASE_URL`: URL de conexión a la base de datos PostgreSQL.
- `JWT_SECRET`: Clave secreta utilizada para firmar y verificar tokens JWT.
- `PORT`: Puerto en el que se ejecutará la API.

## Estructura de la Base de Datos

El esquema de la base de datos está gestionado con **Prisma ORM** y contiene las siguientes tablas:

- **Agente**: Maneja los datos de los agentes de seguros.
- **Cliente**: Contiene los datos de los clientes que contratan pólizas.
- **Póliza**: Registra las pólizas de seguros, incluyendo tipo, vigencia, precio, y estado.
- **Asegurado**: Representa a las personas aseguradas bajo una póliza específica.

### Relación entre los modelos

- Un **Agente** tiene varios **Clientes** y **Pólizas**.
- Un **Cliente** está asociado a un **Agente** y puede tener varias **Pólizas**.
- Una **Póliza** tiene múltiples **Asegurados**.

## Documentación de la API

La API está documentada con **Swagger**. Puedes acceder a la documentación interactiva en la ruta:

```
/api-docs
```

### Endpoints principales

- **POST** `/login`: Autentica un agente y devuelve un token JWT.
- **GET** `/polizas`: Obtiene todas las pólizas.
- **GET** `/polizas/vencidas`: Obtiene pólizas vencidas antes de una fecha específica.
- **POST** `/polizas`: Crea una nueva póliza.
- **PUT** `/polizas/{numeroDePoliza}`: Actualiza una póliza existente.
- **DELETE** `/polizas/{numeroDePoliza}`: Elimina una póliza.

### Ejemplo de Payload para Crear una Póliza

```json
{
  "fechaInicio": "2024-01-01",
  "fechaVigencia": "2025-01-01",
  "aseguradora": "Aseguradora XYZ",
  "tipoPoliza": "GASTOS_MEDICOS",
  "precio": 1200.50,
  "estado": "VIGENTE",
  "clienteId": 1,
  "agenteId": 1,
  "asegurados": [
    {
      "nombre": "Juan Pérez",
      "edad": 35
    },
    {
      "nombre": "María Gómez",
      "edad": 29
    }
  ]
}
```

## Tareas Programadas

Este proyecto utiliza **node-cron** para ejecutar tareas automáticas. La tarea principal es la actualización diaria del estado de las pólizas, que vence automáticamente las pólizas cuya fecha de vigencia ha pasado.

- **Actualización diaria**: Cambia el estado de pólizas a "VENCIDA" cuando la fecha de vigencia es anterior al día actual.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución de JavaScript en el servidor.
- **Express.js**: Framework para crear APIs RESTful.
- **Prisma ORM**: ORM para interactuar con la base de datos PostgreSQL.
- **JWT (JSON Web Tokens)**: Manejo de autenticación y autorización.
- **PostgreSQL**: Base de datos relacional utilizada para almacenar los datos de pólizas, agentes, clientes y asegurados.
- **Swagger**: Herramienta de documentación para la API.
