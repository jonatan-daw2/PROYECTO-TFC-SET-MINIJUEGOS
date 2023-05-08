# Changelog
Registro de cambios en el proyecto setJuegos

## [0.1.9] - 2024-05-06
### Added
- Creación jugador.js
- Creación terreno.js

- Clase jugador.js
- Definción de constructor
- Funcionalidades: 
    1. Dibujar jugador
    2. controles de jugador
    3. Actualiza animaciones del mismo.
    4. Saltar
    5. Correr

- Clase terreno.js
- Definición de constructor
- Funcionalidades: 
    1. Dibujar terreno constantemente
    2. Actualizar animación del terreno

### Changed
- Creación función Sprites

## [0.1.8] - 2024-05-05
### Added
- Creación Dinosaur Game (dinosaurio de google)
- Implementación de HTML con estilos y canvas
- Escalado de la escena
- Dimensionado de la escena
- Actualización de la escana
- Implementación de frames
- Elección de sprites

## [0.1.7] - 2024-04-09
### Added
- Funcionalidades adicionales:
    1. Implementación en fantasmas de "Dijkstra Algorithm"
    2. Cálculo automático de rutas para capturar a pacman
    3. Actualizacion de cambio de posición en el mapa
    4. Dibujado constante de los fantasmas

### Changed
- Clase comecocos.js: implementación de colisión con fantasmas fantasmas
- Teleportación de los fantasmas por el túnel limitante
- Implentación de sonido en la función comer
- Contador de vidas en la clase juego.js
- Funciones extras clase.js:
    1. Reiniciar juego al colisionar con fantasma
    2. Fin del juego al perder las vidas
    3. Dibujar fin del juego
    4. Dibujar victoria
    5. Dibujar vidas
    6. Dibujar elementos del mapa constantemente
    7. Dibujar puntuación
    8. Actitudes diferentes en los fantasmas

## [0.1.6] - 2024-04-08
### Added
- Funcionalidades adicionales:
    1. Comprobar si pacman esta en rango de fantasma
    2. Cambio de dirección al colisionar calculado
    3. Calcular la dirección
    4. Añadir fantasmas
    5. Dibujar fantasmas
    6. Cambio de animación
    7. Posición exacta de los fantasmas y estado

## [0.1.5] - 2024-04-07
### Added
- Creación fantasmas.js
- Clase Fantasmas
- Definición del constructor
- Funcionalidades: 
    1. Cambio de dirección aletorio de los fantasmas
    2. Procesado de movimiento de los fantasmas
    3. Mover hacia delante
    4. Mover hacia atras
    5. Colisiones con el mapa

### Changed
- Array en clase juego de posiciones del mapa para la funcionalidad
  cambio de dirección aleatorio.
- Array de fantasmas clase Juego
- Localización incial de los fantasmas en el mapa
- Función dibujar cocos
- Función dibujar pacman
- Función dibujar fantasmas

## [0.1.4] - 2024-04-07
### Added
- Funcionalidades adicionales: 
    1. Obtención de la posición de pacman
    2. Obtención del estado de pacman

### Changed
- Apertura de caminos "sin límite" en el mapa
- Telportación de pacman al atraversar las aperturas


## [0.1.2] - 2024-04-05
### Added
- Funcionalidades adicionales: 
    1. Colisiones mapa 
    2. Cambio de dirección
    3. Cambio de animación para el gif de pacman
    4. Impresión de pacman

## [0.1.1] - 2024-04-04
### Added
- Creación comecocos.js
- Clase Comecocos
- Definición del contructor
- Funcionalidades: 
    1. Procesado de movimiento 
    2. Comer 
    3. Mover hacia delante 
    4. Mover hacia atrás

## [0.1.0] - 2024-04-03
### Added
- Redimensionado del mapa en la escena canvas
- Anchura y Altura mapa
- Inserción de frames por segundo
- Creación del Lienzo
- Actualización y loop del mapa
- Dibujado constante del lienzo
- Adición controles de pacman

## [0.0.9] - 2024-04-02
### Added
- Creación comecocos
- Página html con stilos css y canvas
- Script (principal) juego.js 
- Creación del mapa
- Selección de sprites de pacman y fantasmas

## [0.0.8] - 2023-03-14
### Added
- Pagina juego
- Pagina login
- Pagina sesion
- Enlace a juego Tetris

### Changed
- Insercion de usuario al registrarse con sus comprobaciones anteriores
- Inicio de sesion, envio de datos y desplazamiento a la pagina sesion
- Boton que te redirige a login en caso de estar registrado
- Al registrarse o logearse lleva a sesion
- En sesion se puede consultar el ranking de jugadores, informacion de los mismo, cerrar sesion y entrar al juego de tetris
- Musica añadida en el tetris

## [0.0.7] - 2023-03-13
### Added
- Pagina registro

### Changed
- Estilos bootstrap5 a la pagina registro.php
- Control de campos vacios
- Control de datos correctos en los campos con JS y PHP
- Control de inyeccion de codigo PHP
- Control de no repeticion de apodo PHP
- Control de contraseña con cierta seguridad PHP
- Control contraseña md5
- Grabado de datos al recargarse el formulario debido a un error


## [0.0.6] - 2023-03-12
### Changed
- Implementacion nivel, puntuacion, lineas
- Aumento y ganancia de puntos segun el nivel
- Subida de nivel segun el numero de ineas
- Eliminacion de bloques al hacer linea
- Muestra por pantalla puntuacion, nivel y numero de lineas
- Game Over al superar el tope del escenario por la parte superior del mismo


## [0.0.5] - 2023-03-11
### Changed
- Implementacion nivel, puntuacion, lineas
- Aumento y ganancia de puntos segun el nivel
- Subida de nivel segun el numero de ineas
- Eliminacion de bloques al hacer linea
- Muestra por pantalla puntuacion, nivel y numero de lineas
- Game Over al superar el tope del escenario por la parte superior del mismo

## [0.0.4] - 2023-03-10
### Changed
- Agregacion de controles, desplazamiento lateral y de caida (flechas)
- Rotacion de las piezas (z)
- Colision piezas con el escenario canvas al rotar su posicion
- Impresion de varias figuras de manera aletoria
- Rellenado de un color determinado cada pieza
- Contorno de las piezas
- Control de la velocidad de la caida de las piezas

## [0.0.3] - 2023-03-09
### Changed
- Agregacion de controles, desplazamiento lateral y de caida (flechas)
- Rotacion de las piezas (z)
- Colision piezas con el escenario canvas al rotar su posicion
- Impresion de varias figuras de manera aletoria
- Rellenado de un color determinado cada pieza
- Control de la velocidad de la caida de las piezas

## [0.0.2] - 2023-03-08
### Added
- Base de datos tetris

### Changed
- Colision piezas con el escenario canvas
- Impresion de varias figuras de manera aletoria
- Rellenado de un color determinado cada pieza
- Base de datos con 4 tablas
- tabla usuario contiene los datos del usuario: idUsuario(autoincremento,primary key),nombre, apellidos, edad, apodo, contaseña
- atributo apodo no puede repetirse
- tabla jugador contiene: idJuego(primary key), idUsuario(primary key), nivel, partidasJugadas, mediaPuntos, maximaPuntuacion
- tabla logros contiene: idLogros(autoincremento,primary key), nivelLogro, nombre, descripcion, idJuego(foreing key)
- tabla juegos contiene: idJuego(autoincremento, primary key), nombre
 
## [0.0.1] - 2023-03-06
### Added
- Diseño juego de tetris en JS

### Changed
- Impresion escenario canvas
- Impresion de una sola figura en el escenario
- Caida de la pieza
- Rellanado color de la pieza
