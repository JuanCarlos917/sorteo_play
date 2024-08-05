# Etapa de construcción
FROM node:20-alpine AS build

WORKDIR /app

# Copiar archivos package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando para correr la aplicación
CMD ["npm", "run", "dev"]