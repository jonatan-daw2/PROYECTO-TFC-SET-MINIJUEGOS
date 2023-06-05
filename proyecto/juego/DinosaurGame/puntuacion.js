export class Puntuacion {
  puntuacion = 0;
  mayorPuntuacion = 0;

  constructor(contexto, escala) {
    this.contexto = contexto;
    this.canvas = contexto.canvas;
    this.escala = escala;
  }

  actualizar(frameDelta) {
    this.puntuacion += frameDelta * 0.01;
  }

  reinicio() {
    this.puntuacion = 0;
  }

  setMayorPuntuacion() {
    if (this.puntuacion > this.mayorPuntuacion) {
      this.mayorPuntuacion = Math.floor(this.puntuacion);
    }
  }

  dibujar() {
    const y = 20 * this.escala;

    const fontSize = 10 * this.escala;
    this.contexto.font = `${fontSize}px Emulogic`;
    this.contexto.fillStyle = "grey";
    const puntuacionX = this.canvas.width - 75 * this.escala;
    const mayorPuntuacionX = puntuacionX - 125 * this.escala;

    const puntuacionPlantilla = Math.floor(this.puntuacion).toString().padStart(6, "0");
    const mayorPuntuacionPlantilla = this.mayorPuntuacion.toString().padStart(6, "0");

    this.contexto.fillText(puntuacionPlantilla, puntuacionX, y);
    this.contexto.fillText(`Mejor ${mayorPuntuacionPlantilla}`, mayorPuntuacionX, y);
  }
}
