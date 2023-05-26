export class Terreno{
    
    constructor(contexto,anchura,altura,velocidad,escala){
        this.contexto = contexto;
        this.canvas = contexto.canvas;
        this.anchura = anchura;
        this.altura = altura;
        this.velocidad = velocidad;
        this.escala = escala;

        //manejo de la imagen ground
        this.x = 0;
        this.y = this.canvas.height - this.altura;
        this.terrenoImagen = new Image();
        this.terrenoImagen.src = "imagenes/ground.png";

    }
    //Dibuja el terreno
    dibujar(){
        //dibujamos el terreno
        this.contexto.drawImage(this.terrenoImagen,this.x,this.y,this.anchura,this.altura);
        //Pasada la distancia del sprite se queda sin terreno
        //Creamos otra imagen que coja la anchura del mismo y se la sume a la posicion x
        this.contexto.drawImage(this.terrenoImagen,this.x+this.anchura,this.y,this.anchura,this.altura);
        //En caso de x sea menor que la anchura negativa vuelve al incio de la imagen
        if(this.x < -this.anchura){
            this.x = 0;
        }
    }

    //velocidad de movimiento del mapa
    actualizar(velocidad, frame){
        this.x -= velocidad * frame * this.velocidad * this.escala;
    }

    reinicio(){
        this.x = 0;
    }
}