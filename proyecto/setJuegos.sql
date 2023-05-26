CREATE DATABASE IF NOT EXISTS setJuegos;

CREATE TABLE jugador (
  idJugador INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50),
  nivel INT NOT NULL DEFAULT 0,
  partidasTotales INT NOT NULL DEFAULT 0,
  mediaPuntos FLOAT NOT NULL DEFAULT 0,
  maximaPuntuacion FLOAT NOT NULL DEFAULT 0,
  monedas INT NOT NULL DEFAULT 0
);

CREATE TABLE usuario (
  idUsuario INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50),
  apodo VARCHAR(50),
  pass VARCHAR(50),
  apellidos VARCHAR(100),
  edad INT,
  idJugador INT,
  FOREIGN KEY (idJugador) REFERENCES jugador(idJugador)
);

CREATE TABLE juego (
  idJuego INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50)
);

CREATE TABLE puntuaciones (
  idJugador INT,
  idJuego INT,
  puntuacion INT,
  FOREIGN KEY (idJugador) REFERENCES jugador(idJugador),
  FOREIGN KEY (idJuego) REFERENCES juego(idJuego),
  PRIMARY KEY (idJugador, idJuego)
);

CREATE TABLE tienda (
  idProducto INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50),
  imagen LONGBLOB NOT NULL,
  precio INT NOT NULL DEFAULT 0
);

ALTER TABLE usuario
ADD FOREIGN KEY (idJugador) REFERENCES jugador(idJugador);
