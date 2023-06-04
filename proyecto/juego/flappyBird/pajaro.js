import { Imagen } from "./imagenes.js";
export class Bird {
    animaciones = [];
    constructor(contexto, imagen) {
        this.contexto = contexto;
        this.canvas = contexto.canvas;
        //imagen del juego
        this.imagen = imagen;

        //posiciones dentro de la imagen
        this.animaciones = [
            { sX: 276, sY: 112 },
            { sX: 276, sY: 139 },
            { sX: 276, sY: 164 },
            { sX: 276, sY: 139 }
        ];
        this.x = 50;
        this.y = 150;
        this.w = 34;
        this.h = 26;

        //fotogramas
        this.frame = 0;
        this.periodo = 0;

        //gravedad pajaro cuando se haga click en el canvas
        this.gravedad = 0.25;

        //salto del pajaro para lo mismo
        this.salto = 4.6;

        //velociadad
        this.velocidad = 0;

        //rotacion del pajaro
        this.rotacion = 0;

        //radio del pajaro
        this.radio = 12;

        //imagen
        this.imagenSuelo = new Image();
        this.imagenSuelo.src = "imagenes/juego.png";
        //objeto suelo
        this.suelo = new Imagen(this.contexto,this.imagenSuelo);

        //estado del juego
        this.modificacionEstado = 0;

        //sonido
        this.sonido = new Audio();
        this.sonido.src = "sonidos/sfx_die.wav";
    }

    dibujar() {
        let pajaro = this.animaciones[this.frame];
        this.contexto.save();
        this.contexto.translate(this.x, this.y);
        this.contexto.rotate(this.rotacion);
        this.contexto.drawImage(this.imagen, pajaro.sX, pajaro.sY, this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);

        // Dibujar el radio del pájaro
        // this.contexto.beginPath();
        // this.contexto.arc(0, 0, this.radio, 0, Math.PI * 2);
        // this.contexto.strokeStyle = "red";
        // this.contexto.lineWidth = 2;
        // this.contexto.stroke();

        this.contexto.restore();
    }    

    //al ahcer click "volar"
    aleteo(){
        this.velocidad = -this.salto;
    }

    actualizar(estado, frames, grados) {
        // Si el periodo es "listo", el pájaro vuela
        this.periodo = estado == 0  ? 10 : 5;
        // Aumentamos el frame en uno por cada periodo
        this.frame += frames % this.periodo == 0 ? 1 : 0;
        // Los frames van de 0 a la longitud del array de animaciones y luego vuelven a 0
        this.frame = this.frame % this.animaciones.length;

        //comprobar el estado del juego dependiendo de lo que haga el usuario
        if(estado ==  0){
            //reiniciamos la posicion en caso de que hayamos perdido y empecemos de nuevo
            this.y = 150;
            //Tambien volvemos a poner la velocidad a 0
            this.velocidad = 0;
            this.rotacion = 0 * grados;
        }else{
            //si el jugador no hace click el pajaro empieza a caer
            this.velocidad += this.gravedad;
            this.y += this.velocidad;
            //Si toca el suelo se para en el suelo
            this.suelo.h = 112;
            if(this.y + this.h/2 >= this.canvas.height - this.suelo.h){
                //console.log(this.suelo.h);
                this.y = this.canvas.height - this.suelo.h - this.h/2;
                if(estado == 1){
                    this.modificacionEstado = 2;
                    this.sonido.play();
                    //console.log(estado);
                }
            }

            //Si la velocidad es mayo que el salto es que esta en caida libre el pajaro
            if(this.velocidad >= this.salto){
                this.rotacion = 90 * grados;
                this.frame = 1;
            }else{
                this.rotacion = -25 * grados;
            }

            /*if(this.rotacion == 90 * grados && this.modificacionEstado == 2){
                //si el pajaro acaba cayendo y la rotacion del mismo es de 90 grados el pajaro dejade de aletar
                this.frame = 1;
            }*/
        }
        //console.log("frames "+ this.frame);
        //console.log("periodo "+ periodo);
    }
}


