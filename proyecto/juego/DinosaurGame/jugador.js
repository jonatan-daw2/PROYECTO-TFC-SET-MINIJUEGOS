export class Jugador{

    animaciones = [];

    constructor(contexto, anchura, altura, saltoMax, saltoMin, escala){
        this.contexto = contexto;
        this.canvas = contexto.canvas;
        this.anchura = anchura;
        this.altura = altura;
        this.saltoMax = saltoMax;
        this.saltoMin = saltoMin;
        this.escala = escala;
        
        //manejo de la imagen dinosuarDefault
        this.x = 10 * escala;
        this.y = this.canvas.height - this.altura - 1.5 * escala;
        this.imagenEstatica = new Image();
        this.imagenEstatica.src = "imagenes/DinosaurDefault.png";
        this.imagen = this.imagenEstatica;

        //salto imagen dinosaur con animacion
        this.yDinosaurPosicion = this.y;

        //Animacion sprites
        this.animacion_caminar = 200;
        this.contadorAnimacion = this.animacion_caminar;
        const andar1 = new Image();
        const andar2 = new Image();
        andar1.src = "imagenes/DinosaurWalking1.png";
        andar2.src = "imagenes/DinosaurWalking2.png";

        this.animaciones.push(andar1);
        this.animaciones.push(andar2);

        //salto
        this.salto_presionado = false;
        this.salto_progreso = false;
        this.caida = false;
        this.velocidad_salto = 0.6;
        this.gravedad = 0.4;

        //tecla salto
        window.addEventListener("keydown",this.abajo);
        window.addEventListener("keyup",this.arriba);

        window.addEventListener("keydown",this.abajo);
        window.addEventListener("keyup",this.arriba);

        //salto directamente al presionar la tecla
        window.removeEventListener("touchstart",this.toqueInicio);
        window.removeEventListener("touchend",this.toqueFin);

        window.addEventListener("touchstart",this.toqueInicio);
        window.addEventListener("touchend",this.toqueFin);
    }

    toqueIncio = ()=>{
        this.salto_presionado = true;
    };

    toqueFin = () =>{
        this.salto_presionado = false;
    };

    abajo = (event) => {
        if(event.code === "Space"){
            this.salto_presionado = true;
        }
    };

    arriba = (event) => {
        if(event.code === "Space"){
            this.salto_presionado = false;
        }
    };

    dibujar(){
        this.contexto.drawImage(this.imagen, this.x, this.y, this.anchura, this.altura);
    }

    //velocidad del dinosaurio
    actualizar(velocidad, frame){
        //console.log(this.salto_presionado);
        this.correr(velocidad, frame);
        if(this.salto_progreso){
            this.imagen = this.imagenEstatica;
        }
        this.saltar(frame);
    }

    saltar(frame){
        if(this.salto_presionado){
            this.salto_progreso = true;
        }

        if(this.salto_progreso && !this.caida){
            if(this.y > this.canvas.height - this.saltoMin || 
               (this.y > this.canvas.height - this.saltoMax &&
                this.salto_presionado)){
                    this.y -= this.velocidad_salto * frame * this.escala;
            }else{
                this.caida = true;
            }
        }else{
            if(this.y < this.yDinosaurPosicion){
                this.y += this.gravedad * frame * this.escala;
                if(this.y + this.height > this.canvas.height){
                    this.y = this.yDinosaurPosicion;
                }
            }else{
                this.caida = false;
                this.salto_progreso = false;
            }
        }
    }

    correr(velocidad, frame){
        if(this.contadorAnimacion <= 0){
            if(this.imagen === this.animaciones[0]){
                this.imagen = this.animaciones[1];
            }else{
                this.imagen = this.animaciones[0];
            }
            this.contadorAnimacion = this.animacion_caminar;
        }
        this.contadorAnimacion -= frame * velocidad;
    }
}