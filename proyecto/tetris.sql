CREATE TABLE usuario (
  idUsuario INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  apodo VARCHAR(50) NOT NULL,
  pass VARCHAR(50) NOT NULL,
  apellidos VARCHAR(50) NOT NULL,
  edad INT,
  PRIMARY KEY (idUsuario)
);


CREATE TABLE jugador (
  nivel INT NOT NULL DEFAULT 0,
  partidasJugadas INT NOT NULL DEFAULT 0,
  mediaPuntos FLOAT NOT NULL DEFAULT 0,
  maximaPuntuacion INT NOT NULL DEFAULT 0,
  idUsuario INT NOT NULL,
  idJuego INT NOT NULL,
  FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario),
  FOREIGN KEY (idJuego) REFERENCES juegos(idJuego),
  PRIMARY KEY (idUsuario)
);


CREATE TABLE logros (
  idLogros INT NOT NULL AUTO_INCREMENT,
  nivelLogro INT NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  descripcion TINYBLOB NOT NULL,
  idJuego INT NOT NULL,
  PRIMARY KEY (idLogros),
  FOREIGN KEY (idJuego) REFERENCES juegos(idJuego)
);


CREATE TABLE Juegos (
  idJuego INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  PRIMARY KEY (idJuego)
);
