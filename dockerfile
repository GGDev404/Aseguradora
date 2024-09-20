# Usar la imagen oficial de Node.js
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo package.json y el package-lock.json al contenedor
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente a la carpeta de trabajo
COPY . .

# Instalar Prisma


# Compilar Prisma
RUN npx prisma generate


# Exponer el puerto que usa la aplicación (por ejemplo, 3000)
EXPOSE 3000

RUN node src/swagger.js

# Comando para ejecutar la aplicación
CMD ["node", "src/server.js"]


