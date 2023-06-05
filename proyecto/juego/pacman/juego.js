const urlParams = new URLSearchParams(window.location.search);
const apodo = urlParams.get('apodo');
const num = urlParams.get('num');
const imagen = document.getElementById('animacion');

if(num == 1 || num == 2 || num == 3){
    imagen.src = "comecocos"+num+".gif";
}

const canvas = document.getElementById("canvas");
const contexto_canvas = canvas.getContext("2d");

const comecocosFrame = document.getElementById("animacion");
const fantasmaFrame = document.getElementById("fantasmas");
//const fantasmaVulnerableFrame = document.getElementById("fantasmasVulnerables");


let frames = 60;
let tamanioBloques = 20;
let color = "#1341AC";

//wallSpaceWidth
let espacioAnchuraMuro = tamanioBloques / 1.7;
//wallOffset
let muroTamanio = (tamanioBloques - espacioAnchuraMuro) / 2;
let colorEspacioMuros = "black";

let colorCocos = "orange";
let puntuacion = 0;
let listaVecinos = 0;
let acabo = false;

const DERECHA = 4;
const ARRIBA = 3;
const IZQUIERDA = 2;
const ABAJO = 1;

let vidas = 3;
let fantasmas = [];
//let fantasmaVulnerable = [];
//                           rojo       naranja      rosa        azul
let localizacionFantasmas = [{ x: 0, y: 0 }, { x: 176, y: 0 }, { x: 0, y: 121 }, { x: 176, y: 121 }];

let mapa = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let anchoMapa = mapa[0].length * tamanioBloques;
let altoMapa = mapa.length * tamanioBloques;
let objetivoFantasmas = [{ x: 1 * tamanioBloques, y: 1 * tamanioBloques },
{ x: 1 * tamanioBloques, y: (mapa.length - 2) * tamanioBloques },
{ x: (mapa[0].length - 2) * tamanioBloques, y: tamanioBloques },
{ x: (mapa[0].length - 2) * tamanioBloques, y: (mapa.length - 2) * tamanioBloques },
{ x: 1, y: 1, },
{ x: 4, y: 5, },
{ x: 1, y: 9, },
{ x: 4, y: 10, },
{ x: 4, y: 14, },
{ x: 0, y: 19, },
{ x: 8, y: 7, },
{ x: 8, y: 13 },
{ x: 8, y: 13 },
{ x: 15, y: 7 },
{ x: 15, y: 12 },
{ x: 21, y: 19 },
{ x: 21, y: 10 },
{ x: 21, y: 1 }];

/*let anchoMapa = mapa[0].length * tamanioBloques;
let altoMapa = mapa.length * tamanioBloques;

let esquinaSuperiorIzquierda = { x: 0, y: 0 };
let esquinaSuperiorDerecha = { x: anchoMapa, y: 0 };
let esquinaInferiorIzquierda = { x: 0, y: altoMapa };
let esquinaInferiorDerecha = { x: anchoMapa, y: altoMapa };

let objetivoFantasmas = [
    esquinaSuperiorIzquierda,
    esquinaSuperiorDerecha,
    esquinaInferiorIzquierda,
    esquinaInferiorDerecha
  ];*/
let spacePressed = false;

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        spacePressed = true;
        loop(); // Iniciar el juego cuando se presione la tecla de espacio
    }
});

function creacionLienzo(x, y, anchura, altura, color) {
    contexto_canvas.fillStyle = color;
    contexto_canvas.fillRect(x, y, anchura, altura);
}

function loop() {
    if (!spacePressed) {
        dibujar();
        contexto_canvas.font = "20px emulogic";
        contexto_canvas.fillStyle = "yellow";
        contexto_canvas.fillText("START!!", 130, 200);
        requestAnimationFrame(loop);
        return; // Salir del bucle si la tecla de espacio no ha sido presionada
    }
    dibujar();
    actualizar();
    console.log(mapa);
}

function actualizar() {
    //cosas
    comecocos.procesoMovimiento();
    comecocos.comer();
    /*for(let i=0; i<fantasmas.length; i++){
        fantasmas[i].procesoMovimiento();
    }*/
    actualizarFantasmas();
    if (comecocos.colisionesFantasmas() == true) {
        reiniciarJuego();
    }
    if (puntuacion >= 419) {
        clearInterval(intervalo);
        dibujarVictoria();
    }
}

function reiniciarJuego() {
    crearComecocos();
    crearFantasmas();
    vidas--;
    if (vidas == 0) {
        finDelJuego();
        $.post('../../guardarPuntuacion.php', {
            puntuacion: puntuacion,
            apodo: apodo,
            idJuego: 2
        }, function (datos, estadoPeticion) {
            console.log("Información: " + datos);
            console.log("Estado de la petición: " + estadoPeticion);
        });
    }
};

function finDelJuego() {
    dibujarFinJuego();
    clearInterval(intervalo);
}




function dibujarFinJuego() {
    contexto_canvas.font = "20px emulogic";
    contexto_canvas.fillStyle = "red";
    contexto_canvas.fillText("GAME OVER!!", 100, 200);
}

function dibujarVictoria() {
    contexto_canvas.font = "20px emulogic";
    contexto_canvas.fillStyle = "yellow";
    contexto_canvas.fillText("WINNER!!", 130, 200);
}

function dibujarVidas() {
    contexto_canvas.font = "20px emulogic";
    contexto_canvas.fillStyle = "green";
    contexto_canvas.fillText("Lives: ", 200, tamanioBloques * (mapa.length + 1) + 10);
    for (let i = 0; i < vidas; i++) {
        contexto_canvas.drawImage(comecocosFrame, 2 * tamanioBloques, 0, tamanioBloques, tamanioBloques, 320 + i * tamanioBloques, tamanioBloques * mapa.length + 12, tamanioBloques, tamanioBloques);
    }
}

function dibujar() {
    //dibujamos aqui el lienzo
    creacionLienzo(0, 0, canvas.width, canvas.height, "black");
    dibujarIntervalos();
    dibujoCocos();
    comecocos.dibujar();
    dibujarPuntuacion();
    dibujarFantasmas();
    dibujarVidas();
}

function dibujoCocos() {
    let cont = 0;
    for (let i = 0; i < mapa.length; i++) {
        for (let j = 0; j < mapa[0].length; j++) {
            if (mapa[i][j] == 2) {
                cont++;
                if (i == 3 && j == 19 || i == 3 && j == 1 || i == 17 && j == 1 || i == 17 && j == 19) {
                    cont++;
                    contexto_canvas.beginPath();
                    contexto_canvas.arc(j * tamanioBloques + tamanioBloques / 2, i * tamanioBloques + tamanioBloques / 2, tamanioBloques / 3, 0, 2 * Math.PI);
                    contexto_canvas.fillStyle = colorCocos;
                    contexto_canvas.fill();
                    contexto_canvas.closePath();
                } else {
                    creacionLienzo(j * tamanioBloques + tamanioBloques / 3, i * tamanioBloques + tamanioBloques / 3, tamanioBloques / 3, tamanioBloques / 3, colorCocos);
                }
            }

        }
    }
    //console.log(cont);
}

function dibujarPuntuacion() {
    contexto_canvas.font = "20px emulogic";
    contexto_canvas.fillStyle = "green";
    contexto_canvas.fillText("Score:", 0, tamanioBloques * (mapa.length + 1) + 10);
    contexto_canvas.fillStyle = "white";
    contexto_canvas.fillText(puntuacion, 120, tamanioBloques * (mapa.length + 1) + 10);
}


let intervalo = setInterval(loop, 1000 / frames);
let fantasmaAzul = setInterval(() => { fantasmas[3].actitudAzul(); }, 10000);
//console.log(fantasmaAzul);


//dibujamos la forma del laberinto
function dibujarIntervalos() {
    for (let i = 0; i < mapa.length; i++) {
        for (let j = 0; j < mapa[0].length; j++) {
            //Muro cuando es 1
            if (mapa[i][j] == 1) {
                creacionLienzo(j * tamanioBloques, i * tamanioBloques, tamanioBloques, tamanioBloques, color);
            }
            if (j > 0 && mapa[i][j - 1] == 1) {
                creacionLienzo(j * tamanioBloques, i * tamanioBloques + muroTamanio, espacioAnchuraMuro + muroTamanio, espacioAnchuraMuro, colorEspacioMuros)
            }
            if (j < mapa[0].length - 1 && mapa[i][j + 1] == 1) {
                creacionLienzo(j * tamanioBloques + muroTamanio, i * tamanioBloques + muroTamanio, espacioAnchuraMuro + muroTamanio, espacioAnchuraMuro, colorEspacioMuros);
            }
            if (i > 0 && mapa[i - 1][j] == 1) {
                creacionLienzo(j * tamanioBloques + muroTamanio, i * tamanioBloques, espacioAnchuraMuro, espacioAnchuraMuro + muroTamanio, colorEspacioMuros)
            }
            if (i < mapa.length - 1 && mapa[i + 1][j] == 1) {
                creacionLienzo(j * tamanioBloques + muroTamanio, i * tamanioBloques + muroTamanio, espacioAnchuraMuro, espacioAnchuraMuro + muroTamanio, colorEspacioMuros);
            }
        }

    }
}

function crearComecocos() {
    comecocos = new Comecocos(tamanioBloques, tamanioBloques, tamanioBloques, tamanioBloques, tamanioBloques / 10);
};

function crearFantasmas() {
    fantasmas = [];
    for (let i = 0; i < 4; i++) {
        let nuevosFantasmas = new Fantasmas(9 * tamanioBloques + (i % 2 == 0 ? 0 : 1) * tamanioBloques,
            10 * tamanioBloques + (i % 2 == 0 ? 0 : 1) * tamanioBloques,
            tamanioBloques,
            tamanioBloques,
            (tamanioBloques / 8) / 2,
            localizacionFantasmas[i % 4].x,
            localizacionFantasmas[i % 4].y,
            124,
            116,
            6 + i);
        fantasmas.push(nuevosFantasmas);
    }
    fantasmas[0].rango = 75;
}

/*function crearFantasmasVulnerables(){
    //alert("entro");
    let localizacionFantasmasVulnerable = [{x:fantasmas[0].x, y:fantasmas[0].y}, {x:fantasmas[1].x, y:fantasmas[1].y}, {x:fantasmas[2].y, y:fantasmas[2].y},{x:fantasmas[3].y, y:fantasmas[3].y}];
    fantasmaVulnerable = [];
    for(let i=0; i<4; i++){
        let nuevosFantasmas = new Fantasmas( 9 * tamanioBloques + (i % 2 == 0 ? 0 : 1) * tamanioBloques,
        10 * tamanioBloques + (i % 2 == 0 ? 0 : 1) * tamanioBloques,
        tamanioBloques,
        tamanioBloques,
        (tamanioBloques/8)/2,
        localizacionFantasmasVulnerable[i % 4].x,
        localizacionFantasmasVulnerable[i % 4].y,
        124,
        116,
        6+i);
        fantasmas.push(nuevosFantasmas);
    }
}*/

//obejtivoAleatorioIndex = parseInt(Math.random() * objetivoFantasmas.length);

/*function dibujarFantasmas(){
    for(let i=0; i<fantasmas.length; i++){
        fantasmas[i].dibujar();
    }
}*/

crearComecocos();
crearFantasmas();
/*if(comecocos.comer()){
    alert("Comio bola");
    crearFantasmasVulnerables();
}else{
    alert("inicio")
    crearFantasmas();
}*/


loop();

document.addEventListener("keydown", event => {
    if (event.key == "ArrowDown" || event.key == "s") {
        comecocos.proximaDirec = ABAJO;
    }
    if (event.key == "ArrowUp" || event.key == "w") {
        comecocos.proximaDirec = ARRIBA;
    }
    if (event.key == "ArrowLeft" || event.key == "a") {
        ;
        comecocos.proximaDirec = IZQUIERDA;
    }
    if (event.key == "ArrowRight" || event.key == "d") {
        comecocos.proximaDirec = DERECHA;
    }
});