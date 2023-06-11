const urlParams = new URLSearchParams(window.location.search);
const apodo = urlParams.get('apodo');
//Guardamos en unvariable constante del canvas en si que sera donde se generará el juego
const canvas = document.getElementById("tetris");
const siguienteCanvas = document.getElementById("siguiente");

//El tipo de animacion respecto a nuestro objeto canvas
const contexto_canvas = canvas.getContext("2d");
const contexto_canvasSiguientes = siguienteCanvas.getContext("2d"); 

//Tamaño de la matriz
const tabla = matriz(10,20);
const tablaPieza = matriz(19,19);

//colores de las piezas
const colores = [null,"red","lightblue","violet","green","yellow","orange","darkblue"];

//Crearemos un jugador con su informacion, sera de tipo objeto
const jugador = {   
                    //objeto de la posicion
                    posicion: {x: 0, y: 0},
                    //Reprentari la forma de una T
                    //Empieza por 0 debido a la rotaciond de la figura que requerira del espacio para poder ser girada
                    jugadorMatriz: null,
                    puntuacion: 0,
                    nivel: 1,
                    lineas: 0,
                    siguientePieza: null
                };

//Para que el escalado de las piezas se vea correctamente
//10 columnas y 20 filas tiene el tetris de normal
//Por lo tanto anchura = 200 y altura = 400 eso dividido entre 20 dara 10 de anchura(columnas) y 20 de altura(filas)
contexto_canvas.scale(20,20);
contexto_canvasSiguientes.scale(20,20);

//---------------------------------------------------------------------------------
//Recargamos el juego en cada frame para actualizar la pantalla
let ultimoTiempo = 0;
//Con esto haremos que vaya mas rapida o mas lenta la caida de la pieza
let intervalo_caida = 1000;
//contador de reduccion de ese tiempo
let contador_caida = 0;

let actualizacion = null;
let gameOver = false;

let musica = document.getElementById("music");
musica.volume = 0.1;
function actualizar(tiempo = 0){
    //tiempo recibido en el momento actual - el ultimo tiempo recibido
    const tiempo_aux = tiempo - ultimoTiempo;
    ultimoTiempo = tiempo;

    //guarda del valor de actualizacion
    contador_caida += tiempo_aux;

    //Si el contador es mayor al intervalo pues se desplazara la pieza
    if(contador_caida > intervalo_caida){
        //para el desplazamiento de la pieza
        //jugador.posicion.y++;
        //la inicializamos en 0 de nuevo
        //contador_caida = 0;
        caidaPieza();
    }
    
    //console.log(ultimoTiempo); 
    //hay que redibujar el canvas
    dibujarMapa();

    //Aqui llamaremos a la función de manera recursiva al hacer esta funcion
    actualizacion = requestAnimationFrame(actualizar);

}
//---------------------------------------------------------------------------------

//Dibujara en la matriz la figura y en la posicion que se deba
function dibujarMatriz(matriz, posicioPieza){
    matriz.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value!==0){
                //contexto_canvas.strokeStyle = "white";
                //contexto_canvas.strokeRect(x + posicioPieza.x, y + posicioPieza.y, 0, 0);
                contexto_canvas.fillStyle = colores[value];
                contexto_canvas.fillRect(x + posicioPieza.x, y + posicioPieza.y, 1, 1);
                contexto_canvas.lineWidth = 0.09;
                contexto_canvas.strokeStyle = 'black'; // color del borde
                contexto_canvas.strokeRect(x + posicioPieza.x, y + posicioPieza.y, 1, 1); // dibujar el borde del rectángulo
            }
        });
    });
}

//Haremos una funcion para pintar el canvas y no saturar con updates
function dibujarMapa(){

    //color de fondo del tetris 
    contexto_canvas.fillStyle = "black";

    //forma del canvas
    contexto_canvas.fillRect(0, 0, canvas.width, canvas.height);

    //llamaremos a la funcion dibujaMatriz para enviar la pieza dentro de la propia matriz

    //redibujamos el tablero cada vez que ya tenemos sobre la tabla
    dibujarMatriz(tabla, {x:0, y:0});
    //despues dibujamos la pieza del tablero
    dibujarMatriz(jugador.jugadorMatriz, jugador.posicion);
    dibujarSiguienteMatriz(jugador.siguientePieza, {x:1,y:1});
}

function dibujarSiguienteMatriz(matriz, posicionPieza){
    contexto_canvasSiguientes.fillStyle = "black";

    //forma del canvas
    contexto_canvasSiguientes.fillRect(0, 0, siguienteCanvas.width, siguienteCanvas.height);

    matriz.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value!==0){
                //contexto_canvas.strokeStyle = "white";
                //contexto_canvas.strokeRect(x + posicioPieza.x, y + posicioPieza.y, 0, 0);
                contexto_canvasSiguientes.fillStyle = colores[value];
                contexto_canvasSiguientes.fillRect(x + posicionPieza.x, y + posicionPieza.y, 1, 1);
                contexto_canvasSiguientes.lineWidth = 0.09;
                contexto_canvasSiguientes.strokeStyle = 'black'; // color del borde
                contexto_canvasSiguientes.strokeRect(x + posicionPieza.x, y + posicionPieza.y, 1, 1); // dibujar el borde del rectángulo
            }
        });
    });
}
//------------------------------------------------------------------------------

//Nuestra matriz que iremos ademas rellenando debera ser acorde al tamaño que ya tenemos de la misma de 10x20

function matriz(anchura, altura){
    const matrix = [];

    //lo rellenara hasta que de false la altura
    while(altura--){
        //rellenamos la matriz con 0 con el tamaño de la anchura
        matrix.push(new Array(anchura).fill(0));
    }
    //console.table(matrix); asi comprobamos si se ve la matriz como la queremos
    return matrix;
}
//-------------------------------------------------------------------------------

//Eventos para los controles en el teclado
//El evento keydown tiene la covertura más amplia de teclas que producen información contextual

function caidaPieza(){
    jugador.posicion.y++;
    if(colisiones(tabla,jugador)==true){
        jugador.posicion.y--;
        merge(tabla, jugador);
        playerReset();
        eliminacionLineas();
        actualizarPuntuacion();
    }

    contador_caida = 0;
}

document.addEventListener("keydown", event => {
    if(event.key=="ArrowDown"){
        caidaPieza();
    }
    if(event.key=="ArrowRight"){
        //jugador.posicion.x++;
        colisionLateral(1);
    }
    if(event.key=="ArrowLeft"){
        //jugador.posicion.x--;
        colisionLateral(-1);
    }
    if(event.key=="z"){
        //rotacion horaria
        rotacionJugador();
    }
});
//-------------------------------------------------------------------------------------

//tema de colisiones, para que la pieza este limitada a la tabla
//Debe recibir la matriz de la pieza y sus posiciones y el tablero
/*function colisiones(tabla,jugador){
    const matriz = jugador.jugadorMatriz;
    const pos = jugador.posicion;

    //deberemos de recorrer la matriz del jugador
    //se recorre primero en horizontal y luego en vertical
    for(let y=0; y<matriz.length; ++y){
        for(let x=0; x<matriz[y].length; ++x){
            //En caso de que colisione
            //En caso de que haya uno es cuando se comprueba
            if(matriz[y][x] !== 0 && (tabla[y + pos.y] && tabla[y + pos.y][x + pos.x])!==0){
                //console.log(jugador.posicion);
                return true;
            }
        }
    }
    return false;
}*/

function colisiones(tabla,jugador){
    const matriz = jugador.jugadorMatriz;
    const pos = jugador.posicion;

    for(let y=0; y<matriz.length; ++y){
        for(let x=0; x<matriz[y].length; ++x){
            if(matriz[y][x] !== 0 && 
              (tabla[y + pos.y] && tabla[y + pos.y][x + pos.x]) !== 0){
                
                return true;
            }
        }
    }
    
    return false;
}




function colisionLateral(direccion){
    jugador.posicion.x += direccion;
    if(colisiones(tabla,jugador)){
        jugador.posicion.x -= direccion;
    }
}

function merge(tabla, jugador){
    jugador.jugadorMatriz.forEach((row,y) =>  {
        row.forEach((value,x) => {
            if(value !== 0){
                tabla[y + jugador.posicion.y][x + jugador.posicion.x] = value;
            }
        });
    });
    //console.table(tabla);
}

function playerReset(){
    const piezas = ["L","J","S","Z","I","O","T"];
    let numeroRandom = Math.floor(Math.random() * 7);
    intervalo_caida = 1500 - ((jugador.nivel-1)*100);
    //console.log(piezaRandom);
    if(jugador.siguientePieza===null){
        jugador.jugadorMatriz = crearPieza(piezas[numeroRandom]);
    }else{
        jugador.jugadorMatriz = jugador.siguientePieza;
    }
    jugador.siguientePieza = crearPieza(piezas[numeroRandom]);
    jugador.posicion.x = (tabla[0].length/2 | 0 ) - (jugador.jugadorMatriz[0].length/2 | 0);
    jugador.posicion.y = 0;
    if(colisiones(tabla,jugador)){
        tabla.forEach(fila => fila.fill(0));
        //alert("fin del juego");
        // cancelAnimationFrame(actualizacion);
        puntuacionPartida = jugador.puntuacion;
        //alert(puntuacionPartida);
        $.post('../../guardarPuntuacion.php', {
            puntuacion: puntuacionPartida,
            apodo: apodo,
            idJuego: 1
        }, function (datos, estadoPeticion) {
            console.log("Información: " + datos);
            console.log("Estado de la petición: " + estadoPeticion);
        });
        jugador.puntuacion = 0;
        jugador.nivel = 0;
        jugador.lineas = 0;
        actualizarPuntuacion();
        gameOver = true;

        contexto_canvas.fillStyle = 'black';
        contexto_canvas.globalAlpha = 0.75;
        contexto_canvas.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);

        contexto_canvas.globalAlpha = 1;
        contexto_canvas.fillStyle = 'white';
        contexto_canvas.font = '36px monospace';
        contexto_canvas.textAlign = 'center';
        contexto_canvas.textBaseline = 'middle';
        contexto_canvas.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
    }
}


function rotacionJugador(){
    const posicion = jugador.posicion.x;
    let posicion_aux = 1;
    rotacion(jugador.jugadorMatriz);
    while(colisiones(tabla,jugador)){
        jugador.posicion.x += posicion_aux;
        posicion_aux = -(posicion_aux + (posicion_aux>0 ? 1 : -1));
        if(posicion > jugador.jugadorMatriz){
            rotacion(jugador.jugadorMatriz);
            jugador.posicion.x = posicion;
            return;
        }
    }
}

function rotacion(matriz){
    for(let y=0; y<matriz.length; ++y){
        for(let x=0; x<y; ++x){
            [matriz[x][y], matriz[y][x]] = [matriz[y][x], matriz[x][y]];
        }
    }
    matriz.forEach(row => row.reverse());
}

function crearPieza(tipo){
    if(tipo==="T"){
        return [
                    [0,0,0],
                    [3,3,3],
                    [0,3,0],
               ];
    }else if(tipo==="I"){
        return [
                    [0,2,0,0],
                    [0,2,0,0],
                    [0,2,0,0],
                    [0,2,0,0]
               ];
    }else if(tipo==="L"){
        return [
                    [0,6,0],
                    [0,6,0],
                    [0,6,6],
               ];
    }else if(tipo==="J"){
        return [
                    [0,7,0],
                    [0,7,0],
                    [7,7,0],
               ];
    }else if(tipo==="S"){
        return [
                    [0,1,1],
                    [1,1,0],
                    [0,0,0],
               ];
    }else if(tipo==="Z"){
        return [
                    [4,4,0],
                    [0,4,4],
                    [0,0,0],
               ];
    }else if(tipo==="O"){
        return [
                    [5,5],
                    [5,5]
               ];
    }
}

function eliminacionLineas(){
    let contadorLienas = 1;
    salida: for(let y = tabla.length-1; y>0; --y){
        for(let x = 0; x<tabla[y].length; ++x){
            if(tabla[y][x]===0){
                continue salida;
            }
        }
        //console.log(contadorLienas);
        const fila = tabla.splice(y,1)[0].fill(0);
        tabla.unshift(fila);
        //alert(fila);
        ++y;
        
        // parseInt(document.getElementById("linea").innerHTML) mostrara el valor actual que hay en el contador
        //alert("datos filas "+jugador.lineas);
        
        if(jugador.nivel >=1 && jugador.nivel <= 10){
            jugador.puntuacion += (10 * jugador.nivel);          
        }else if(jugador.nivel >=11 && jugador.nivel <=20){
            jugador.puntuacion += (20 * jugador.nivel);         
        }else if(jugador.nivel >=21 && jugador.nivel <= 30){
            jugador.puntuacion += (30 * jugador.nivel);        
        }else if(jugador.nivel >=31 && jugador.nivel <= 40){
            jugador.puntuacion += (40 * jugador.nivel);
        }else if(jugador.nivel >=41 && jugador.nivel <= 50){
            jugador.puntuacion += (50 * jugador.nivel);
        }else if(jugador.nivel >=51 && jugador.nivel <= 60){
            jugador.puntuacion += (60 * jugador.nivel);
        }else if(jugador.nivel >=61 && jugador.nivel <= 70){
            jugador.puntuacion += (70 * jugador.nivel);
        }else if(jugador.nivel >=81 && jugador.nivel <= 90){
            jugador.puntuacion += (80 * jugador.nivel);
        }else if(jugador.nivel >=91 && jugador.nivel <= 99){
            jugador.puntuacion += (90 * jugador.nivel);
        }

        if(jugador.lineas%3===0){
            if(jugador.nivel < 99){
                jugador.nivel++;
            }
        }
        jugador.lineas++;
        //alert(jugador.lineas);
        //alert(( parseInt(document.getElementById("linea").innerHTML)));

    }
}

function actualizarPuntuacion(){
    document.getElementById("puntuacion").innerHTML = jugador.puntuacion;
    document.getElementById("nivel").innerHTML = jugador.nivel;
    document.getElementById("linea").innerHTML = jugador.lineas;
}
//------------------------------------------------------------------------------------
playerReset();
actualizar();