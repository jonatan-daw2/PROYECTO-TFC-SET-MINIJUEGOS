export class Cactus{

    constructor(contexto, x, y, anchura, altura, imagen){
        this.contexto = contexto;
        this.x = x;
        this.y = y;
        this.anchura = anchura;
        this.altura = altura;
        this.imagen = imagen;
    }

    actualizar(velocidad, velocidadJuego, frameDelta, escala){
        this.x -= velocidad * velocidadJuego * frameDelta * escala;
    }

    dibujar(){
        this.contexto.drawImage(this.imagen, this.x, this.y, this.anchura, this.altura);
    }

    //colision cactus
    colision(sprite) {
        const margen = 1.4;
        if (
          sprite.x < this.x + this.anchura / margen &&
          sprite.x + sprite.anchura / margen > this.x &&
          sprite.y < this.y + this.altura / margen &&
          sprite.altura + sprite.y / margen > this.y
        ) {
          return true;
        } else {
          return false;
        }
    }
}