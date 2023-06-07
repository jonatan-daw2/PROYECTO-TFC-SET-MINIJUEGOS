# Establece la imagen base de PHP
FROM php:7.4-cli

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY . .

# Instala las dependencias de PHP
RUN composer install

# Expone el puerto necesario para el servidor web PHP
EXPOSE $PORT: 80

# Ejecuta el servidor web PHP
CMD [ "php", "-S", "0.0.0.0:$PORT", "-t", "public/" ]