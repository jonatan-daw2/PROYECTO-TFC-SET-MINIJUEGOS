import { Imagen } from "./imagenes.js";
import { Bird } from "./pajaro.js";
import { Tuberias } from "./tuberias.js";

const urlParams = new URLSearchParams(window.location.search);
const num = urlParams.get('num');

export const numero = num;

const canvas = document.getElementById("canvasGame");
const contexto_canvas = canvas.getContext("2d");
const highScoreDiv = document.getElementById("highScore");
const imagen = new Image();
let frames = -1;
if(num == 2 || num == 3){
    imagen.src = "imagenes/juego"+ num +".png";
}else{
    imagen.src = "imagenes/juego.png";
}


//Suelo y cielo
let mapa = new Imagen(contexto_canvas, imagen);

//Pajaro
let pajaro = new Bird(contexto_canvas, imagen);

//Tuberias
let tuberias = new Tuberias(contexto_canvas, imagen);

//control de los estados del juego
const estado = {
    corriendo : 0,
    listo : 0,
    juego : 1,
    perdio : 2
}

//retencion del estado
let estadoJuego = estado.corriendo;

//grados de inclinacion del pajaro
const grados = Math.PI/180;

//puntuacion
let score = 0;
let highScore = 0;

//sonido
const sonido1 = new Audio();
sonido1.src = "sonidos/sfx_swooshing.wav";

const sonido2 = new Audio();
sonido2.src = "sonidos/sfx_flap.wav";

function dibujar() {
    contexto_canvas.fillStyle = "#70c5ce";
    contexto_canvas.fillRect(0, 0, canvas.width, canvas.height);
    mapa.dibujarCielo();
    tuberias.dibujar();
    mapa.dibujarSuelo();
    pajaro.dibujar();
    dibujarTextoInicio();
    dibujarPuntuacion();
    gameOver();
}

document.addEventListener("click", function(event){
    switch(estado.corriendo){
        case estado.listo:
            estado.corriendo = estado.juego;
            sonido1.play();
            break;
        case estado.juego:
            pajaro.aleteo();
            sonido2.play();
            break;
        case estado.perdio:
            let rectangulo = canvas.getBoundingClientRect();
            let clickX = event.clientX - rectangulo.left;
            let clickY = event.clientY - rectangulo.top;
            if(score > highScore){
                highScore = score;
                localStorage.setItem("highScore", highScore);
                contexto_canvas.fillText(highScore, 225, 228);
                contexto_canvas.strokeText(highScore, 225, 228);
            }
            highScoreDiv.textContent = "Puntuacion mas alta: " + highScore;
            //alert("murio");
            // const startBtn = {
            //     x : 120,
            //     y : 263,
            //     w : 83,
            //     h : 29
            // }
            //Boton de start
            if(clickX >= (canvas.width/2 - 90/2) && clickX <= (canvas.width/2 - 190) + 225 && clickY >= 200 && clickY <= 180 + 60){
                const urlParams = new URLSearchParams(window.location.search);
                const apodo = urlParams.get('apodo');
                $.post('../../guardarPuntuacion.php',{
                    puntuacion: score,
                    apodo: apodo,
                    idJuego : 5
                },function(datos,estadoPeticion){
                    console.log("Información: " + datos);
                    console.log("Estado de la petición: " + estadoPeticion);
                });
                estado.corriendo = estado.listo;
                tuberias.reiniciar();
                //console.log(estado.corriendo);
            }
            break;
    }
});

//Fin del juego
function gameOver() {
    let sX = 175;
    let sY = 228;
    let w = 225;
    let h = 43;
    let x = canvas.width/2 - 225/2;
    let y = 150;
    if(estado.corriendo == estado.perdio){
        contexto_canvas.drawImage(imagen, sX, sY, w, h, x, y, w, h);
        sX = 175;
        sY = 390;
        w = 225;
        h = 60;
        x = canvas.width/2 - 225/2;
        y = 200;
        contexto_canvas.drawImage(imagen, sX, sY, w, h, x, y, w, h);
    }
}

//Dibujar texto de inicio
function dibujarTextoInicio(){
    let sX = 0;
    let sY = 228;
    let w = 173;
    let h = 152;
    let x = canvas.width/2 - 173/2;
    let y = 80;
    if(estado.corriendo == estado.listo){
        contexto_canvas.drawImage(imagen, sX, sY, w, h, x, y, w, h);
    } 
}

function dibujarPuntuacion(){
    contexto_canvas.fillStyle = "white";
    contexto_canvas.strokeStyle = "black";
    //localStorage.setItem("highScore", highScore);
    if(estado.corriendo == estado.juego){
        score =  tuberias.puntuacion;
        contexto_canvas.lineWidth = 2;
        contexto_canvas.font = "25px Emulogic";
        contexto_canvas.fillText(score, canvas.width/2.3, 50);
        contexto_canvas.strokeText(score, canvas.width/2.3, 50);
    }
    if(estado.corriendo == estado.perdio){
        contexto_canvas.lineWidth = 2;
        contexto_canvas.font = "25px Emulogic";
        contexto_canvas.fillText(score, canvas.width/2.3, 50);
        contexto_canvas.strokeText(score, canvas.width/2.3, 50);
    }else if(estado.corriendo == estado.perdio){
        //puntuacion de la partida
        contexto_canvas.font = "25px Emulogic";
        contexto_canvas.fillText(score, 225, 50);
        contexto_canvas.strokeText(score, 225, 50);
    }
}

//actualizar
function update(){
    estadoJuego = estado.corriendo;
    pajaro.actualizar(estadoJuego, frames, grados);
    mapa.actualizarMovimientoSuelo(estadoJuego);
    tuberias.actualizar(estadoJuego, frames);
    //console.log(estado.corriendo);
    if(pajaro.modificacionEstado != estadoJuego || tuberias.modificacionEstado != estadoJuego){
        if(pajaro.modificacionEstado == 2 || tuberias.modificacionEstado == 2){
            estado.corriendo = estado.perdio;
            pajaro.modificacionEstado = 0;
            tuberias.modificacionEstado = 0;
        }
    }
}

//Actualizacion
function loop() {
    update();
    dibujar();
    frames++;
    //console.log(frames);
    //console.log(estado.corriendo);
    //console.log("puntuacion Maxima " + highScore);
    //console.log("puntuacion " + score);
    requestAnimationFrame(loop);
}

loop();

