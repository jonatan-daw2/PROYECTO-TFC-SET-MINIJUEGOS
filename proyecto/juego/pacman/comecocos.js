class Comecocos{
    eat = document.getElementById('sound');
     
    constructor(x, y, anchura, altura, velocidad){
        this.x = x;
        this.y = y;
        this.anchura = anchura-1;
        this.altura = altura-1;
        this.velocidad = velocidad;
        this.direccion = DERECHA;
        this.proximaDirec = this.direccion;
        this.frame = 1;
        this.maxframe = 7;
        this.eat.volume = 0.1
        //apuntar aqui quizas
        setInterval(() => {this.cambioAnimacion();}, 100);
    }

    procesoMovimiento(){
        this.cambioDireccion();
        this.moverHaciaDelante();
        if(this.colisones()){
            this.moverHaciaAtras();
        }
    }

    comer(){
        // document.getElementById('sound').play();
        for(let i=0; i<mapa.length; i++){
            for(let j=0; j<mapa[0].length; j++){
                if(mapa[i][j] == 2 && this.getPosicionX() == j && this.getPosicionY() == i){
                    mapa[i][j] = 3;
                    puntuacion++;
                    
                    this.eat.play();
                    
                    if(i==3 && j==19 || i==3 && j==1 || i==17 && j==1 || i==17 && j==19){
                        puntuacion += 50;
                        //poder = true;
                        //alert("Entro");
                        /*NO FUNCIONA*/
                        /*setTimeout(() => {
                            this.velocidad = 5;
                        }, 5000);*/
                    }
                }
            }
        }
    }

    /*modificarVelocidad(){
        if(this.comer()){
            alert("Aumento")
            this.velocidad = 10;
        }
    }*/

    moverHaciaDelante(){
        switch(this.direccion){
            case DERECHA:
                 this.x += this.velocidad;
                 break;
            case ARRIBA:
                 this.y -= this.velocidad;
                 break;
            case IZQUIERDA:
                 this.x -= this.velocidad;
                 break;
            case ABAJO:
                 this.y += this.velocidad;
                 break;
        }
    }

    moverHaciaAtras(){
        switch(this.direccion){
            case DERECHA:
                 this.x -= this.velocidad;
                 break;
            case ARRIBA:
                 this.y += this.velocidad;
                 break;
            case IZQUIERDA:
                 this.x += this.velocidad;
                 break;
            case ABAJO:
                 this.y -= this.velocidad;
                 break;
        }
    }
    
    colisones(){
        if(mapa[this.getPosicionY()][this.getPosicionX()] == 1 ||
           mapa[this.getEstadoY()][this.getPosicionX()] == 1 || 
           mapa[this.getPosicionY()][this.getEstadoX()] == 1 ||
           mapa[this.getEstadoY()][this.getEstadoX()] == 1){
            return true;
        }else{
            if((this.x<18 && (this.direccion != 4)) && this.y==200){
                this.x = 400;
            }else if((this.x>400 && (this.direccion != 2)) && this.y==200){
                this.x = 18;
            }
            return false;
        }
    }

    //ok
    colisionesFantasmas(){
        for (let i = 0; i < fantasmas.length; i++) {
            let fantasma = fantasmas[i];
            if(fantasma.getPosicionX() == this.getPosicionX() && fantasma.getPosicionY() == this.getPosicionY()){
                return true;
            }
        }
        return false;
    }

    cambioDireccion(){
        if(this.direccion == this.proximaDirec) return;

        let direccionTemporal = this.direccion;
        this.direccion = this.proximaDirec;
        this.moverHaciaDelante();
        if(this.colisones() == true){
            this.moverHaciaAtras();
            this.direccion = direccionTemporal;
        }else{
            this.moverHaciaAtras();
        }
    }

    cambioAnimacion(){
        let tramo = 0;
        if(this.frame == this.maxframe){
            this.frame = 1;
            tramo = this.frame;
        }else{
            tramo = this.frame++;
        }
        return tramo
    }

    dibujar(){
        contexto_canvas.save();
        contexto_canvas.translate(this.x + tamanioBloques/2, this.y + tamanioBloques/2);
        contexto_canvas.rotate((this.direccion*90*Math.PI)/180);
        contexto_canvas.translate(-this.x - tamanioBloques/2, -this.y - tamanioBloques/2);
        contexto_canvas.drawImage(comecocosFrame,(this.frame-1) * tamanioBloques,0,tamanioBloques,tamanioBloques,this.x,this.y,this.anchura,this.altura);
        contexto_canvas.restore();
    }

    getPosicionX(){
        let pos = parseInt(this.x/tamanioBloques);
        return pos;
    }

    getPosicionY(){
        let pos = parseInt(this.y/tamanioBloques);
        return pos;
    }

    
    getEstadoX(){
        let estado = parseInt((this.x + 0.99 * tamanioBloques)/tamanioBloques);
        return estado;
    }

    getEstadoY(){
        let estado = parseInt((this.y + 0.99 * tamanioBloques)/tamanioBloques);
        return estado;
    }
    
}
