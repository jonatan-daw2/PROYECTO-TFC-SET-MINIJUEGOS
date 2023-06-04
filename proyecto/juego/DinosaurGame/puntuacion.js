export class Puntuacion {
    puntuacion = 0;
    MAYOR_PUNTUACION = "MayorPuntuacion";
  
    constructor(contexto, escala) {
      this.contexto = contexto;
      this.canvas = contexto.canvas;
      this.escala = escala;
  
      // Verificar y establecer la puntuación máxima almacenada en el almacenamiento local
      const mayorPuntuacion = Number(localStorage.getItem(this.MAYOR_PUNTUACION));
      if (isNaN(mayorPuntuacion)) {
        localStorage.setItem(this.MAYOR_PUNTUACION, "0");
      }
    }
  
    actualizar(frameDelta) {
      this.puntuacion += frameDelta * 0.01;
    }
  
    reinicio() {
      this.puntuacion = 0;
    }
  
    setMayorPuntuacion() {
      const mayorPuntuacion = Number(localStorage.getItem(this.MAYOR_PUNTUACION));
      if (isNaN(mayorPuntuacion) || this.puntuacion > mayorPuntuacion) {
        localStorage.setItem(this.MAYOR_PUNTUACION, Math.floor(this.puntuacion).toString());
      }
    }
  
    dibujar() {
      const mayorPuntuacion = Number(localStorage.getItem(this.MAYOR_PUNTUACION));
      const y = 20 * this.escala;
  
      const fontSize = 10 * this.escala;
      this.contexto.font = `${fontSize}px Emulogic`;
      this.contexto.fillStyle = "grey";
      const puntuacionX = this.canvas.width - 75 * this.escala;
      const mayorPuntuacionX = puntuacionX - 125 * this.escala;
  
      const puntuacionPlantilla = Math.floor(this.puntuacion).toString().padStart(6, "0");
      const mayorPuntuacionPlantilla = mayorPuntuacion.toString().padStart(6, "0");
  
      this.contexto.fillText(puntuacionPlantilla, puntuacionX, y);
      this.contexto.fillText(`Mejor ${mayorPuntuacionPlantilla}`, mayorPuntuacionX, y);
    }
  }
  