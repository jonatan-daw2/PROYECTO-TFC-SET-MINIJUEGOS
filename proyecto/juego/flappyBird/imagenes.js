export class Imagen {

    constructor(contexto, imagen) {
        this.contexto = contexto;
        this.canvas = contexto.canvas;
        this.imagen = imagen;
        //suelo
        this.sX = 276; //0
        this.sY = 0; //10
        this.w = 224; //275
        this.h = 226; //112
        this.x = 0;
        this.y = this.canvas.height - 112; //0

        //cielo
        this.cieloSX = 0; 
        this.cieloSY = 0; 
        this.cieloW = 275; 
        this.cieloH = 112; 
        this.cieloX = 0;
        this.cieloY = this.canvas.height/1.878;

        //estado del juego
        this.modificacionEstado = 0;

        this.dx = 2;
    }

    dibujarSuelo() {
        //suelo
        this.contexto.drawImage(this.imagen, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        this.contexto.drawImage(this.imagen, this.sX, this.sY, this.w, this.h, this.x+this.w, this.y, this.w, this.h);
    }

    dibujarCielo(){
        this.contexto.drawImage(this.imagen, this.cieloSX, this.cieloSY, this.cieloW, this.cieloH, this.cieloX, this.cieloY, this.cieloW, this.cieloH);
        this.contexto.drawImage(this.imagen, this.cieloSX, this.cieloSY, this.cieloW, this.cieloH, this.cieloX+this.cieloH, this.cieloY, this.cieloW, this.cieloH);
    }


    actualizarMovimientoSuelo(estado){
        if(estado == 1 || estado == 0){
            this.x = (this.x - this.dx)%(this.w/2);
            //this.cieloX = (this.cieloX - this.dx)%(this.cieloW/2);
        }
        //console.log("xd");
    }
}