// Obtenemos el elemento canvas
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

const urlParams = new URLSearchParams(window.location.search);
const apodo = urlParams.get('apodo');
const num = urlParams.get('num');

var headRightImage = null;
var headLeftImage = null;
var headUpImage = null;
var headDownImage = null;
var bodyHorizontalImage = null;
var bodyVerticalImage = null;
var tailRightImage = null;
var tailLeftImage = null;
var tailUpImage = null;
var tailDownImage = null;
var bodyRightDownImage = null;
var bodyRightUpImage = null;
var bodyLeftDownImage = null;
var bodyLeftUpImage = null;
var appleImage = null;


// Cargamos las imágenes
if (num == 1 || num == 2 || num == 3) {
    headRightImage = new Image();
    headRightImage.src = "imagenes/headRightDefault"+num+".png"

    headLeftImage = new Image();
    headLeftImage.src = "imagenes/headLeftDefault"+num+".png";

    headUpImage = new Image();
    headUpImage.src = "imagenes/headUpDefault"+num+".png";

    headDownImage = new Image();
    headDownImage.src = "imagenes/headDownDefault"+num+".png";

    bodyHorizontalImage = new Image();
    bodyHorizontalImage.src = "imagenes/bodyLeftRightDefault"+num+".png";

    bodyVerticalImage = new Image();
    bodyVerticalImage.src = "imagenes/bodyUpDownDefault"+num+".png";

    tailRightImage = new Image();
    tailRightImage.src = "imagenes/tailLeftDefault"+num+".png";

    tailLeftImage = new Image();
    tailLeftImage.src = "imagenes/tailRightDefault"+num+".png";

    tailUpImage = new Image();
    tailUpImage.src = "imagenes/tailDownDefault"+num+".png";

    tailDownImage = new Image();
    tailDownImage.src = "imagenes/tailUpDefault"+num+".png";

    bodyRightDownImage = new Image();  // Nueva imagen para cuerpo girado a la derecha y hacia abajo
    bodyRightDownImage.src = "imagenes/bodyRightDownDefault"+num+".png";

    bodyRightUpImage = new Image();  // Nueva imagen para cuerpo girado a la derecha y hacia arriba
    bodyRightUpImage.src = "imagenes/bodyRightUpDefault"+num+".png";

    bodyLeftDownImage = new Image();  // Nueva imagen para cuerpo girado a la izquierda y hacia abajo
    bodyLeftDownImage.src = "imagenes/bodyLeftDownDefault"+num+".png";

    bodyLeftUpImage = new Image();  // Nueva imagen para cuerpo girado a la izquierda y hacia arriba
    bodyLeftUpImage.src = "imagenes/bodyLeftUpDefault"+num+".png";

    appleImage = new Image();
    appleImage.src = "imagenes/appleDefault"+num+".png";
} else {
    headRightImage = new Image();
    headRightImage.src = "imagenes/headRightDefault.png";

    headLeftImage = new Image();
    headLeftImage.src = "imagenes/headLeftDefault.png";

    headUpImage = new Image();
    headUpImage.src = "imagenes/headUpDefault.png";

    headDownImage = new Image();
    headDownImage.src = "imagenes/headDownDefault.png";

    bodyHorizontalImage = new Image();
    bodyHorizontalImage.src = "imagenes/bodyLeftRightDefault.png";

    bodyVerticalImage = new Image();
    bodyVerticalImage.src = "imagenes/bodyUpDownDefault.png";

    tailRightImage = new Image();
    tailRightImage.src = "imagenes/tailLeftDefault.png";

    tailLeftImage = new Image();
    tailLeftImage.src = "imagenes/tailRightDefault.png";

    tailUpImage = new Image();
    tailUpImage.src = "imagenes/tailDownDefault.png";

    tailDownImage = new Image();
    tailDownImage.src = "imagenes/tailUpDefault.png";

    bodyRightDownImage = new Image();  // Nueva imagen para cuerpo girado a la derecha y hacia abajo
    bodyRightDownImage.src = "imagenes/bodyRightDownDefault.png";

    bodyRightUpImage = new Image();  // Nueva imagen para cuerpo girado a la derecha y hacia arriba
    bodyRightUpImage.src = "imagenes/bodyRightUpDefault.png";

    bodyLeftDownImage = new Image();  // Nueva imagen para cuerpo girado a la izquierda y hacia abajo
    bodyLeftDownImage.src = "imagenes/bodyLeftDownDefault.png";

    bodyLeftUpImage = new Image();  // Nueva imagen para cuerpo girado a la izquierda y hacia arriba
    bodyLeftUpImage.src = "imagenes/bodyLeftUpDefault.png";

    appleImage = new Image();
    appleImage.src = "imagenes/appleDefault.png";
}


var gameStart = "start";
var gameState = "running";
var gameOverText = "GAME OVER";
var gameStartText = "Pulsa el espacio para empezar";

//puntuacion
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("highScore");
var score = 0;
var highScore = 0;

// Tamaño de las imágenes
var imageSize = 20;

// Posición y tamaño inicial de la serpiente
var snakeSegments = [
    { x: 3, y: 1 },
    { x: 2, y: 1 },
    { x: 1, y: 1 }
];

// Posición inicial de la manzana
var apple = { x: 10, y: 10 };

// Dirección inicial de la serpiente
var direction = "right";

// Contador de longitud de la serpiente
var snakeLength = snakeSegments.length;

// Evento de teclado para cambiar la dirección
document.addEventListener("keydown", function (event) {
    var key = event.keyCode;
    if (key === 37 && direction !== "right") {
        direction = "left";
    } else if (key === 38 && direction !== "down") {
        direction = "up";
    } else if (key === 39 && direction !== "left") {
        direction = "right";
    } else if (key === 40 && direction !== "up") {
        direction = "down";
    } else if (key === 32 && gameState === "game over") { // Spacebar key code is 32
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
        }
        drawScore();
        resetGame();
    } else if (key === 32 && gameStart === "start") {
        gameStart = "finish";
        gameLoop();
    }
});

// Función para verificar si la serpiente ha llenado todo el lienzo
function checkWinCondition() {
    var totalSegments =
        (canvas.width / imageSize) * (canvas.height / imageSize);
    return snakeSegments.length === totalSegments;
}

//dibujar puntuacion
function drawScore() {
    scoreElement.textContent = "Puntuacion: " + score;
    highScoreElement.textContent = "Puntuacion mas alta: " + highScore;
}

// Muestra el mensaje de inicio en el centro del canvas
function showGameInitMessage() {
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    context.font = "25px Arial";
    context.fillStyle = "red";
    context.textAlign = "center";
    context.fillText(gameStartText, centerX, centerY);
}

// Function to reset the game
function resetGame() {
    // Reset the snake segments
    snakeSegments = [
        { x: 3, y: 1 },
        { x: 2, y: 1 },
        { x: 1, y: 1 }
    ];

    // Reset the apple position
    apple = { x: 10, y: 10 };

    // Reset the snake direction and length
    direction = "right";
    snakeLength = snakeSegments.length;

    // Reset the game state
    gameState = "running";

    //iniciamos en 0
    score = 0;

    //imprimimos el valor de nuevo
    drawScore();

    // Restart the game loop
    gameLoop();
}

// Función para cargar la imagen de la cabeza según la dirección
function loadHeadImage() {
    if (direction === "right") {
        return headRightImage;
    } else if (direction === "left") {
        return headLeftImage;
    } else if (direction === "up") {
        return headUpImage;
    } else if (direction === "down") {
        return headDownImage;
    }
}

// Función para cargar la imagen de la cola según la dirección
function loadTailImage() {
    var tailDirection = getTailDirection();
    if (tailDirection === "right") {
        return tailRightImage;
    } else if (tailDirection === "left") {
        return tailLeftImage;
    } else if (tailDirection === "up") {
        return tailUpImage;
    } else if (tailDirection === "down") {
        return tailDownImage;
    }
}

// Función para obtener la dirección de la cola de la serpiente
function getTailDirection() {
    var tail = snakeSegments[snakeSegments.length - 1];
    var beforeTail = snakeSegments[snakeSegments.length - 2];
    if (tail.x > beforeTail.x) {
        return "right";
    } else if (tail.x < beforeTail.x) {
        return "left";
    } else if (tail.y > beforeTail.y) {
        return "down";
    } else if (tail.y < beforeTail.y) {
        return "up";
    }
}

// Función principal del juego
function gameLoop() {
    if (gameState === "running") {
        // Movemos la serpiente
        var head = { x: snakeSegments[0].x, y: snakeSegments[0].y };

        if (direction === "right") {
            head.x++;
        } else if (direction === "left") {
            head.x--;
        } else if (direction === "up") {
            head.y--;
        } else if (direction === "down") {
            head.y++;
        }

        //Verificamos si la cabeza choca consigo misma
        for (var i = 1; i < snakeSegments.length; i++) {
            if (head.x === snakeSegments[i].x && head.y === snakeSegments[i].y) {
                gameState = "game over";
                var centerX = canvas.width / 2;
                var centerY = canvas.height / 2;
                context.font = "30px Arial";
                context.fillStyle = "red";
                context.textAlign = "center";
                context.fillText(gameOverText, centerX, centerY);
                var restartTextY = centerY + 50;
                context.font = "20px Arial";
                context.fillText("Pulsa espacio", centerX, restartTextY);
                $.post('../../guardarPuntuacion.php', {
                    puntuacion: score,
                    apodo: apodo,
                    idJuego: 4
                }, function (datos, estadoPeticion) {
                    console.log("Información: " + datos);
                    console.log("Estado de la petición: " + estadoPeticion);
                });
                return;
            }

        }

        // Verificamos si la cabeza alcanza los límites del lienzo
        if (
            head.x < 0 ||
            head.x >= canvas.width / imageSize ||
            head.y < 0 ||
            head.y >= canvas.height / imageSize
        ) {
            gameState = "game over";
            var centerX = canvas.width / 2;
            var centerY = canvas.height / 2;
            context.font = "30px Arial";
            context.fillStyle = "red";
            context.textAlign = "center";
            context.fillText(gameOverText, centerX, centerY);

            $.post('../../guardarPuntuacion.php', {
                puntuacion: score,
                apodo: apodo,
                idJuego: 4
            }, function (datos, estadoPeticion) {
                console.log("Información: " + datos);
                console.log("Estado de la petición: " + estadoPeticion);
            });

            var restartTextY = centerY + 50;
            context.font = "20px Arial";
            context.fillText("Pulsa espacio", centerX, restartTextY);
            return;
        }

        // Agregamos la nueva cabeza a la serpiente
        snakeSegments.unshift(head);

        // Verificamos si la serpiente ha comido la manzana
        if (head.x === apple.x && head.y === apple.y) {
            // Generamos una nueva posición para la manzana
            apple.x = Math.floor(Math.random() * canvas.width / imageSize);
            apple.y = Math.floor(Math.random() * canvas.height / imageSize);
            score++;
            drawScore();
            // Incrementamos la longitud de la serpiente
            snakeLength++;
            // Verificamos si se ha alcanzado la condición de victoria
            if (checkWinCondition()) {
                gameState = "game over";
                var centerX = canvas.width / 2;
                var centerY = canvas.height / 2;
                context.font = "30px Arial";
                context.fillStyle = "green";
                context.textAlign = "center";
                context.fillText("¡Has ganado!", centerX, centerY);

                var restartTextY = centerY + 50;
                context.font = "20px Arial";
                context.fillText("Pulsa espacio para reiniciar", centerX, restartTextY);
                return;
            }
        } else {
            // Si no ha comido, eliminamos la cola de la serpiente
            snakeSegments.pop();
        }

        // Dibujamos el fondo del canvas
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Dibujamos la serpiente
        for (var i = 0; i < snakeSegments.length; i++) {
            var segment = snakeSegments[i];

            // Dibujamos la cabeza
            if (i === 0) {
                var headImage = loadHeadImage();
                context.drawImage(headImage, segment.x * imageSize, segment.y * imageSize, imageSize, imageSize);
            }
            // Dibujamos la cola
            else if (i === snakeSegments.length - 1) {
                var tailImage = loadTailImage();
                context.drawImage(tailImage, segment.x * imageSize, segment.y * imageSize, imageSize, imageSize);
            }
            // Dibujamos el cuerpo
            else {
                var nextSegment = snakeSegments[i + 1];
                var prevSegment = snakeSegments[i - 1];

                // Determinamos la orientación del cuerpo
                var bodyOrientation;
                if (nextSegment.x === prevSegment.x) {
                    bodyOrientation = "vertical";
                } else {
                    bodyOrientation = "horizontal";
                }

                // Seleccionamos la imagen del cuerpo según la orientación y cambios de dirección
                var bodyImage;
                if (bodyOrientation === "vertical") {
                    bodyImage = bodyVerticalImage;
                    if ((prevSegment.y > segment.y && nextSegment.x > segment.x) || (nextSegment.y > segment.y && prevSegment.x > segment.x)) {
                        bodyImage = bodyRightUpImage;
                    } else if ((prevSegment.y < segment.y && nextSegment.x > segment.x) || (nextSegment.y < segment.y && prevSegment.x > segment.x)) {
                        bodyImage = bodyRightDownImage;
                    } else if ((prevSegment.y > segment.y && nextSegment.x < segment.x) || (nextSegment.y > segment.y && prevSegment.x < segment.x)) {
                        bodyImage = bodyLeftUpImage;
                    } else if ((prevSegment.y < segment.y && nextSegment.x < segment.x) || (nextSegment.y < segment.y && prevSegment.x < segment.x)) {
                        bodyImage = bodyLeftDownImage;
                    }
                } else {
                    bodyImage = bodyHorizontalImage;
                    if ((prevSegment.x > segment.x && nextSegment.y > segment.y) || (nextSegment.x > segment.x && prevSegment.y > segment.y)) {
                        bodyImage = bodyRightDownImage;
                    } else if ((prevSegment.x < segment.x && nextSegment.y > segment.y) || (nextSegment.x < segment.x && prevSegment.y > segment.y)) {
                        bodyImage = bodyRightUpImage;
                    } else if ((prevSegment.x > segment.x && nextSegment.y < segment.y) || (nextSegment.x > segment.x && prevSegment.y < segment.y)) {
                        bodyImage = bodyLeftDownImage;
                    } else if ((prevSegment.x < segment.x && nextSegment.y < segment.y) || (nextSegment.x < segment.x && prevSegment.y < segment.y)) {
                        bodyImage = bodyLeftUpImage;
                    }
                }

                context.drawImage(bodyImage, segment.x * imageSize, segment.y * imageSize, imageSize, imageSize);
            }
        }
        // Dibujamos la manzana
        context.drawImage(appleImage, apple.x * imageSize, apple.y * imageSize, imageSize, imageSize);
        // if (checkCollision()) {
        //     gameState = "game over";
        //   }
    }
   
    setTimeout(gameLoop, 95);
}

// mostramos el mensaje antes de inciar
showGameInitMessage()