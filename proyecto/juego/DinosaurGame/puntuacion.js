export class Puntuacion{
    puntuacion = 0;
    MAYOR_PUNTUACION = "MayorPuntuacion";

    constructor(contexto, escala){
        this.contexto = contexto;
        this.canvas = contexto.canvas;
        this.escala = escala;
    }

    actualizar(frameDelta){
        this.puntuacion += frameDelta * 0.01;
    }

    reinicio(){
        this.puntuacion = 0;
    }

    setMayorPuntuacion(){
        const mayorPuntuacion = Number(localStorage.getItem(this.MAYOR_PUNTUACION));
        if(this.puntuacion > mayorPuntuacion){
            localStorage.setItem(this.MAYOR_PUNTUACION,Math.floor(this.score));
        }
    }

    dibujar(){
        const mayorPuntuacion = Number(localStorage.getItem(this.MAYOR_PUNTUACION));
        const y = 20 * this.escala;

        const fontSize = 10 * this.escala;
        this.contexto.font = `${fontSize}px Emulogic`;
        this.contexto.fillStyle = "grey";
        const puntacionX = this.canvas.width - 75 * this.escala;
        const mayorPuntuacionX = puntacionX - 125 * this.escala;

        const puntuacionPlantilla = Math.floor(this.score).toString().padStart(6,0);
        const mayorPuntuacionPlantilla = mayorPuntuacion.toString().padStart(6,0);

        this.contexto.fillText(puntuacionPlantilla, puntacionX, y);
        this.contexto.fillText(`Mejor ${mayorPuntuacionPlantilla}`,mayorPuntuacionX, y);
    }
}