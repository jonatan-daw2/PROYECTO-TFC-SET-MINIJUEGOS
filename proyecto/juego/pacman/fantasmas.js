class Fantasmas{
    // ok
    constructor(x, y, anchura, altura, velocidad, imagenX, imagenY, imagenAnchura, imagenAltura, rango){
        this.x = x;
        this.y = y;
        this.anchura = anchura-1;
        this.altura = altura-1;
        this.velocidad = velocidad;
        this.direccion = DERECHA;
        this.imagenX = imagenX;
        this.imagenY = imagenY;
        this.imagenAnchura = imagenAnchura;
        this.imagenAltura = imagenAltura;
        this.rango = rango;
        this.obejtivoAleatorioIndex = parseInt(Math.floor(Math.random() * objetivoFantasmas.length));
        setInterval(() => {this.cambioAleatorioDireccion();}, 3000);
        
        //naranja
        setInterval(() => {fantasmas[1].cambioAleatorioDireccion();}, 5000);
        //rojo
        setInterval(() => {fantasmas[1].objetivo = comecocos}, 1000);
    }

    //ok

    cambioAleatorioDireccion(){
        let adicion = 1;
        this.obejtivoAleatorioIndex += adicion;
        this.obejtivoAleatorioIndex = this.obejtivoAleatorioIndex%7;
        return this.obejtivoAleatorioIndex;
    }

    actitudAzul(){
        let eleccion_azul = Math.floor(Math.random() * 2)+1;
        if(eleccion_azul == 1){
            fantasmas[3].objetivo = comecocos;
            console.log("Persigue");
        }else{
            fantasmas[3].objetivo = objetivoFantasmas[this.obejtivoAleatorioIndex];
            console.log("No persigue");
        }
    }


    //ok
    procesoMovimiento(){
        if(this.enRangoPacman()){
            this.objetivo = comecocos;
            /*if(fantasmas[2].objetivo == comecocos){
                fantasmas[2].objetivo = objetivoFantasmas[this.obejtivoAleatorioIndex];
            }*/
            if(fantasmas[2].objetivo == this.objetivo){
                fantasmas[2].objetivo = objetivoFantasmas[this.obejtivoAleatorioIndex];
            }
        }else{
            fantasmas[0].objetivo = comecocos;
            this.objetivo = objetivoFantasmas[this.obejtivoAleatorioIndex];
        }
        this.cambioDireccion();
        this.moverHaciaDelante();
        if(this.colisones()){
            this.moverHaciaAtras();
        }
    }

    //ok
    moverHaciaDelante(){
        switch(this.direccion){
            case 4:
                 this.x += this.velocidad;
                 break;
            case 3:
                 this.y -= this.velocidad;
                 break;
            case 2:
                 this.x -= this.velocidad;
                 break;
            case 1:
                 this.y += this.velocidad;
                 break;
        }
    }

    //ok
    moverHaciaAtras(){
        switch(this.direccion){
            case 4:
                 this.x -= this.velocidad;
                 break;
            case 3:
                 this.y += this.velocidad;
                 break;
            case 2:
                 this.x += this.velocidad;
                 break;
            case 1:
                 this.y -= this.velocidad;
                 break;
        }
    }
    
    //ok
    colisones(){//310 else el if 90
        let colisionado = false;

       
        if (mapa[parseInt(this.y / tamanioBloques)][parseInt(this.x / tamanioBloques)] == 1 ||
            mapa[parseInt(this.y / tamanioBloques + 0.9999)][parseInt(this.x / tamanioBloques)] == 1 ||
            mapa[parseInt(this.y / tamanioBloques)][parseInt(this.x / tamanioBloques + 0.9999)] == 1 ||
            mapa[parseInt(this.y / tamanioBloques + 0.9999)][parseInt(this.x / tamanioBloques + 0.9999)] == 1) {
            colisionado = true;
        }else{
            if((this.x<18 && (this.direccion != 4)) && this.y==200){
                this.x = 400;
            }else if((this.x>400 && (this.direccion != 2)) && this.y==200){
                this.x = 18;
            }
        }
        return colisionado;
    }

    //ok
    enRangoPacman(){
        let distanciaX = Math.abs(comecocos.getPosicionX() - this.getPosicionX());
        let distanciaY = Math.abs(comecocos.getPosicionY() - this.getPosicionY());

        if(Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY) <= this.rango){
            return true;
        }

        return false;
    }

    //ok
    cambioDireccion(){
        let direccionTemporal = this.direccion;

        this.direccion = this.calcularDireccion(mapa,parseInt(this.objetivo.x /tamanioBloques),parseInt(this.objetivo.y /tamanioBloques));

        if(typeof this.direccion == "undefined"){
            this.direccion = direccionTemporal;
            return;
        }

        if (this.getPosicionY() != this.getEstadoY() && (this.direccion == IZQUIERDA ||this.direccion == DERECHA)) {
            this.direccion = ARRIBA;
        }
        if (this.getPosicionX() != this.getEstadoX() && this.direccion == ARRIBA) {
            this.direccion = IZQUIERDA;
        }
        this.moverHaciaDelante();
        if (this.colisones()) {
            this.moverHaciaAtras();
            this.direccion = direccionTemporal;
        } else {
            this.moverHaciaAtras();
        }
        console.log(this.direccion);
        //console.log("Posicion "+this.cambioAleatorioDireccion());
        //console.log(fantasmas[3].objetivo);
    }

    //ok
    calcularDireccion(mapa, destinoX, destinoY){
        let mp = [];
        for(let i=0; i<mapa.length; i++){
            mp[i] = mapa[i].slice();
        }

        let cola = [{x:this.getPosicionX(), y:this.getPosicionY(), correctaX:this.getEstadoX(), correctaY:this.getEstadoY(), movimientos:[]}];

        while(cola.length > 0){
            let salida = cola.shift();
            if(salida.x == destinoX && salida.y == destinoY){
                //alert("hola")
                return salida.movimientos[0];
            }else{
                mp[salida.y][salida.x] = 1;
                let listaVecinos = this.aniadirVecinos(salida, mp);
                for (let i = 0; i < listaVecinos.length; i++) {
                    //alert("xd");
                    cola.push(listaVecinos[i]);

                }
            }
        }
        return 1; //de serie
    }
    

    //ok
    aniadirVecinos(salida, mp){
        let cola = [];
        let numFilas = mp.length;
        let numCols = mp[0].length;

        if(salida.x - 1 >= 0 && salida.x-1 < numFilas && mp[salida.y][salida.x-1] != 1){
            let movimientosTemporales = salida.movimientos.slice();
            movimientosTemporales.push(IZQUIERDA);
            cola.push({x:salida.x-1, y:salida.y, movimientos:movimientosTemporales});
        }
        if(salida.x + 1 >= 0 && salida.x+1 < numFilas && mp[salida.y][salida.x+1] != 1){
            let movimientosTemporales = salida.movimientos.slice();
            movimientosTemporales.push(DERECHA);
            cola.push({x:salida.x+1, y:salida.y, movimientos:movimientosTemporales});
        }
        if(salida.y - 1 >= 0 && salida.y-1 < numCols && mp[salida.y-1][salida.x] != 1){
            let movimientosTemporales = salida.movimientos.slice();
            movimientosTemporales.push(ARRIBA);
            cola.push({x:salida.x, y:salida.y-1, movimientos:movimientosTemporales});
        }
        if(salida.y + 1 >= 0 && salida.y+1 < numCols && mp[salida.y+1][salida.x] != 1){
            let movimientosTemporales = salida.movimientos.slice();
            movimientosTemporales.push(ABAJO);
            cola.push({x:salida.x, y:salida.y+1, movimientos:movimientosTemporales});
        }
        return cola;
    }

   

    //ok
    dibujar(){
        contexto_canvas.save();
        contexto_canvas.drawImage(fantasmaFrame,this.imagenX,this.imagenY,this.imagenAnchura,this.imagenAltura,this.x,this.y,this.anchura,this.altura);
        contexto_canvas.restore();
        contexto_canvas.beginPath();
        contexto_canvas.strokeStyle='red';
        contexto_canvas.arc(this.x + tamanioBloques/2, this.y + tamanioBloques/2, this.rango * tamanioBloques, 0, 2 * Math.PI);
        contexto_canvas.stroke();
    }

    //ok
    getPosicionX(){
        let pos = parseInt(this.x/tamanioBloques);
        return pos;
    }

    //ok
    getPosicionY(){
        let pos = parseInt(this.y/tamanioBloques);
        return pos;
    }

    //ok
    getEstadoX(){
        let estado = parseInt((this.x + 0.99 * tamanioBloques)/tamanioBloques);
        return estado;
    }

    //ok
    getEstadoY(){
        let estado = parseInt((this.y + 0.99 * tamanioBloques)/tamanioBloques);
        return estado;
    }
    
    cambiarAnimacion(){
        this.frame = this.frame == this.maxframe ? 1 : this.frame + 1;
    }
}

let actualizarFantasmas = () => {
    for (let i = 0; i < fantasmas.length; i++) {
        fantasmas[i].procesoMovimiento();
    }
};

let dibujarFantasmas = () => {
    for (let i = 0; i < fantasmas.length; i++) {
        fantasmas[i].dibujar();
    }
};