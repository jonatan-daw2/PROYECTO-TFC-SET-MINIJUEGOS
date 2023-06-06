import { numero } from "./flappyBird.js";
import { Bird } from "./pajaro.js"
export class Tuberias {
  posicion = [];

  constructor(contexto, imagen) {
    this.contexto = contexto;
    this.canvas = contexto.canvas;
    //imagen del juego
    this.imagen = imagen;

    this.top = { sX: 553, sY: 0 };
    this.bottom = { sX: 502, sY: 0 };

    this.w = 53;
    this.h = 400;
    this.hueco = 85;
    this.maxYPos = -150;
    this.dx = 2;

    //imagen
    this.pajaroImagen = new Image();
    if (numero == 2 || numero == 3) {
      this.pajaroImagen.src = "imagenes/juego" + numero + ".png";
    } else {
      this.pajaroImagen.src = "imagenes/juego.png";
    }

    //objeto suelo
    this.pajaro = new Bird(this.contexto, this.pajaroImagen);

    //estado del juego
    this.modificacionEstado = 0;

    //puntuacion
    this.puntuacion = 0;

    //sonido
    this.sonido1 = new Audio();
    this.sonido1.src = "sonidos/sfx_point.wav";

    this.sonido2 = new Audio();
    this.sonido2.src = "sonidos/sfx_hit.wav";
  }

  //Dibujado de las tuberias
  //Dibujado de las tuberias
  // Dibujado de las tuberias
  dibujar() {
    for (let i = 0; i < this.posicion.length; i++) {
      let p = this.posicion[i];

      let topYPos = p.y;
      let bottomYPos = p.y + this.h + this.hueco;

      // Tuberia superior
      this.contexto.drawImage(this.imagen, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h);

      // Tuberia inferior
      this.contexto.drawImage(this.imagen, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos, this.w, this.h);

      // Pintar zona de paso en verde
      // this.contexto.fillStyle = "green";
      // this.contexto.fillRect(p.x, topYPos + this.h, this.w, this.hueco);

      // Pintar bordes de las tuberias en rojo
      // this.contexto.beginPath();
      // this.contexto.rect(p.x, topYPos, this.w, this.h);
      // this.contexto.strokeStyle = "red";
      // this.contexto.lineWidth = 2;
      // this.contexto.rect(p.x, bottomYPos, this.w, this.h);
      // this.contexto.strokeStyle = "red";
      // this.contexto.lineWidth = 2;
      // this.contexto.stroke();
    }
  }




  //va mostrando tuberias a medida que trancurre la partida
  actualizar(estado, frames) {
    if (estado !== 1) {
      return;
    }

    if (frames % 100 === 0) {
      this.posicion.push({ x: this.canvas.width, y: this.maxYPos * (Math.random() + 1) });
    }

    for (let i = 0; i < this.posicion.length; i++) {
      let p = this.posicion[i];

      // Colisiones con las tuberías
      let bottomTuboYPos = p.y + this.h + this.hueco;

      //tuberia inferior
      if (
          this.pajaro.x + this.pajaro.radio > p.x &&
          this.pajaro.x - this.pajaro.radio < p.x + this.w &&
          this.pajaro.y + this.pajaro.radio > bottomTuboYPos &&
          this.pajaro.y - this.pajaro.radio < bottomTuboYPos + this.h
        ) {
          this.modificacionEstado = 2;
          this.sonido2.play();
        }

        //tuberia superior
        if (
          this.pajaro.x + this.pajaro.radio > p.x &&
          this.pajaro.x - this.pajaro.radio < p.x + this.w &&
          this.pajaro.y + this.pajaro.radio > p.y &&
          this.pajaro.y - this.pajaro.radio < p.y + this.h
        ) {
          this.modificacionEstado = 2;
          this.sonido2.play();
        }

      //mover las tuberias hacia la izquierda
      p.x -= this.dx;

      if (p.x + this.w <= 0) {
        this.posicion.shift();
        this.puntuacion += 1;
        this.sonido1.play();
      }
    }
  }


  //al perder reiniciaremos el array
  reiniciar() {
    this.posicion = [];
    this.puntuacion = 0;
  }
}