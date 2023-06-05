import { Cactus } from "./cactus.js";
export class CactusAjustes{

    //valor intervalos del cactus
    CACTUS_MAX_INT = 2000;
    CACTUS_MIN_INT = 500;

    siguienteIntervalo = null;
    cactus = [];

    constructor(contexto, cactusImagen, escala, velocidad){
        this.contexto = contexto;
        this.canvas = contexto.canvas;
        this.cactusImagen = cactusImagen;
        this.escala = escala;
        this.velocidad = velocidad;
        this.modificartiempo();
    }

    //modificar cada cuanto tiempo sale
    modificartiempo(){
       const num = this.numeroAleatorio(this.CACTUS_MIN_INT, this.CACTUS_MAX_INT);

       this.siguienteIntervalo = num;
      // console.log(this.siguienteIntervalo);
    }

    //numero aleatorio para la obtencion del intervalo
    numeroAleatorio(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    //inicializamos la imagenes y llamamos a la funcion cactus de la clase cactus
    crearCactus(){
        const indice = this.numeroAleatorio(0, this.cactusImagen.length - 1);
        const cactusImagen = this.cactusImagen[indice];
        const x = this.canvas.width * 1.5;
        const y = this.canvas.height - cactusImagen.height;
        const cactus = new Cactus(this.contexto, x, y, cactusImagen.width, cactusImagen.height, cactusImagen.imagen);

        this.cactus.push(cactus);
    }

    actualizar(velocidadJuego, frameDelta){
        if(this.siguienteIntervalo <= 0){
            //crear cactus
            this.crearCactus();
            this.modificartiempo();
        }
        this.siguienteIntervalo -= frameDelta;

        this.cactus.forEach((cactus)=>{
            cactus.actualizar(this.velocidad, velocidadJuego, frameDelta, this.escala);
        });

        this.cactus = this.cactus.filter((cactus) => cactus.x > -cactus.anchura);

       // console.log(this.cactus.length);
    }

    dibujar(){
        this.cactus.forEach((cactus) => cactus.dibujar());
    }

    //dinosuario con cactus
    colision(sprite) {
        return this.cactus.some((cactus) => cactus.colision(sprite));
    }

    reinicio(){
        this.cactus = [];
    }
}