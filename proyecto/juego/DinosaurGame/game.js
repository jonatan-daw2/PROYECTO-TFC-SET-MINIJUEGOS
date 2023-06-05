//importamos Jugador
import { Jugador } from './jugador.js';
import { Terreno } from './terreno.js';
import { CactusAjustes } from './cactusAjustes.js';
import { Puntuacion } from './puntuacion.js';

const urlParams = new URLSearchParams(window.location.search);
const apodo = urlParams.get('apodo');
const num = urlParams.get('num');
const letra = urlParams.get('letra');

export const numeroDino = num;
export const letraDino = letra;

const canvas = document.getElementById("mapa");
const contexto_canvas = canvas.getContext("2d");

//Velocidad del juego
const velocidad_juego_base = 0.75;
const incremento_velocidad = 0.00001;

//Escalado para navegadores, etc
let escala = null;
let tiempoAnterior = null;

//dimensiones mapa
const anchura_mapa = 800;
const altura_mapa = 200;

//escalado de la imagen dinosaurio
const achura_jugador = 89 / 1.4; //Proporcion dinosaurio
const alura_jugador = 92 / 1.4; //Proporcion dinosaurio

//salto dinosaurio
const altura_salto_max = altura_mapa;
const altura_salto_min = 150;

//tamaño dinosuario
const terreno_anchura = 2400;
const terreno_altura = 24;

//velocidad de los cactus y el terreno
const velocidad_terreno_cactus = 0.5

//Jugador y lo usamos gracias a la importacion de la clase juego
let jugador = null;

//Objeto terreno
let terreno = null;

//Objeto cactus
let cactus = null;

//velocidad
let velocidad = velocidad_juego_base;

//cactus imagenes redimensionado
const cactus_conf = [{ width: 48 / 1.5, height: 100 / 1.5, imagen: 'imagenes/cactus_1.png' },
{ width: 68 / 1.5, height: 100 / 1.5, imagen: 'imagenes/cactus_2.png' },
{ width: 98 / 1.5, height: 100 / 1.5, imagen: 'imagenes/cactus_3.png' },]

//pulsa para empezar
let comienzo = true;

//game over
let gameOver = false;

//reinicio
let avisoReinicio = false;

//puntuacion
let puntuacion = null;

let puntaje = null;

function crearSprites() {
  //propiedades de jugador
  const jugador_anchura_mapa = achura_jugador * escala;
  const jugador_altura_mapa = alura_jugador * escala;
  const salto_min_mapa = altura_salto_min * escala;
  const salto_max_mapa = altura_salto_max * escala;

  //propiedades terreno
  const terreno_anchura_mapa = terreno_anchura * escala;
  const terreno_altura_mapa = terreno_altura * escala;

  //jugador, terreno y cactus
  jugador = new Jugador(contexto_canvas, jugador_anchura_mapa, jugador_altura_mapa, salto_min_mapa, salto_max_mapa, escala);
  terreno = new Terreno(contexto_canvas, terreno_anchura_mapa, terreno_altura_mapa, velocidad_terreno_cactus, escala);
  const cactusImagen = cactus_conf.map((cactus) => {
    const imagen = new Image();
    imagen.src = cactus.imagen; return { imagen: imagen, width: cactus.width * escala, height: cactus.height * escala };
  });

  cactus = new CactusAjustes(contexto_canvas, cactusImagen, escala, velocidad_terreno_cactus);

  puntuacion = new Puntuacion(contexto_canvas, escala);

  console.log(jugador.imagenEstatica);
}

function pantalla() {
  escala = escalado();
  canvas.width = anchura_mapa * escala;
  canvas.height = altura_mapa * escala;
  crearSprites();
}

pantalla();

function escalado() {
  const pantalla_altura = Math.min(
    window.innerHeight,
    document.documentElement.clientHeight
  );

  const pantalla_anchura = Math.min(
    window.innerWidth,
    document.documentElement.clientWidth
  );

  //la ventana es mas ancha que la anchura del juego
  if (pantalla_anchura / pantalla_altura < anchura_mapa / altura_mapa) {
    return pantalla_anchura / anchura_mapa;
  } else {
    return pantalla_altura / altura_mapa;
  }
}

function limpiarPantalla() {
  contexto_canvas.fillStyle = 'white';
  contexto_canvas.fillRect(0, 0, canvas.clientWidth, canvas.height);
}

function mostarGameOver() {
  const fontSize = 70 * escala;
  contexto_canvas.font = `${fontSize}px Emulogic`;
  contexto_canvas.fillStyle = "grey";
  const x = canvas.width / 8.5;
  const y = canvas.height / 2;
  contexto_canvas.fillText("GAME OVER", x, y);
}

function reiniciarJuego() {
  if (!avisoReinicio) {
    avisoReinicio = true;
    setTimeout(() => {
      window.addEventListener("keyup", reinicio, { once: true });
      window.addEventListener("touchstart", reinicio, { once: true });
    }, 1000);
  }
}

function reinicio() {
  avisoReinicio = false;
  gameOver = false;
  comienzo = false;
  terreno.reinicio();
  cactus.reinicio();
  puntuacion.reinicio();
  velocidad = velocidad_juego_base;
}

function mostrarTextoComienzo() {
  const fontSize = 20 * escala;
  contexto_canvas.font = `${fontSize}px Emulogic`;
  contexto_canvas.fillStyle = "grey";
  const x = canvas.width / 7.5;
  const y = canvas.height / 2;
  contexto_canvas.fillText("Pulsa el espacio para comenzar", x, y);
}

function actualizarVelocidad(frame) {
  velocidad += frame * incremento_velocidad;
}

function actualizar(tiempo) {
  //console.log(velocidad);
  if (tiempoAnterior === null) {
    tiempoAnterior = tiempo;
    requestAnimationFrame(actualizar);
    return;
  }
  //El tiempo en segundos que tardó en completarse el último frame
  const frameDelta = tiempo - tiempoAnterior;
  tiempoAnterior = tiempo;
  limpiarPantalla();

  if (!gameOver && !comienzo) {
    //actualizamos los objetos del juego
    terreno.actualizar(velocidad, frameDelta);
    cactus.actualizar(velocidad, frameDelta);
    jugador.actualizar(velocidad, frameDelta);
    puntuacion.actualizar(frameDelta);
    actualizarVelocidad(frameDelta);
  }

  if (!gameOver && cactus.colision(jugador)) {
    gameOver = true;
    //reiniciamos el juego
    reiniciarJuego();
    //puntuacion
    puntaje = parseInt(puntuacion.puntuacion);
    $.post('../../guardarPuntuacion.php', {
      puntuacion: puntaje,
      apodo: apodo,
      idJuego: 3
    }, function (datos, estadoPeticion) {
      console.log("Información: " + datos);
      console.log("Estado de la petición: " + estadoPeticion);
    });
    puntuacion.setMayorPuntuacion();
    //console.log(gameOver);
  }

  //dibujamos los objetos del juego
  terreno.dibujar();
  cactus.dibujar();
  jugador.dibujar();
  puntuacion.dibujar();

  if (gameOver) {
    mostarGameOver();
  }

  if (comienzo) {
    mostrarTextoComienzo();
  }

  requestAnimationFrame(actualizar);
}

requestAnimationFrame(actualizar);

window.addEventListener("keyup", reinicio, { once: true });
window.addEventListener("touchstart", reinicio, { once: true });