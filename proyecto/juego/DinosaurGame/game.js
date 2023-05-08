//importamos Jugador
import {Jugador} from './jugador.js';
import { Terreno } from './terreno.js';

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
const achura_jugador = 89/1.4; //Proporcion dinosaurio
const alura_jugador = 92/1.5; //Proporcion dinosaurio

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

//velocidad
let velocidad = velocidad_juego_base;

function crearSprites(){
  //propiedades de jugador
  const jugador_anchura_mapa = achura_jugador * escala;
  const jugador_altura_mapa = alura_jugador * escala;
  const salto_min_mapa = altura_salto_min * escala;
  const salto_max_mapa = altura_salto_max * escala;

  //propiedades terreno
  const terreno_anchura_mapa = terreno_anchura * escala;
  const terreno_altura_mapa = terreno_altura * escala;

  //jugador hecho
  jugador = new Jugador(contexto_canvas,jugador_anchura_mapa,jugador_altura_mapa,salto_min_mapa,salto_max_mapa,escala);
  terreno = new Terreno(contexto_canvas,terreno_anchura_mapa,terreno_altura_mapa,velocidad_terreno_cactus,escala);
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

function limpiarPantalla(){
    contexto_canvas.fillStyle='white';
    contexto_canvas.fillRect(0,0,canvas.clientWidth,canvas.height);
}

function actualizar(tiempo){
    if(tiempoAnterior===null){
        tiempoAnterior = tiempo;
        requestAnimationFrame(actualizar);
        return;
    }
    //El tiempo en segundos que tardó en completarse el último frame
    const frameDelta = tiempo - tiempoAnterior;
    tiempoAnterior = tiempo;
    limpiarPantalla();
    //actualizamos los objetos del juego
    terreno.actualizar(velocidad, frameDelta);
    jugador.actualizar(velocidad, frameDelta);

    //dibujamos los objetos del juego
    terreno.dibujar();
    jugador.dibujar();
    requestAnimationFrame(actualizar);
}

requestAnimationFrame(actualizar);