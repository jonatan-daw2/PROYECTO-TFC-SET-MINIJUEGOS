document.addEventListener("readystatechange",cargarEventos,false);

function cargarEventos(evento){
    if(document.readyState=="interactive"){
        document.getElementById("login").addEventListener("click",login,false);
        document.getElementById("registro").addEventListener("click",registro,false);
        //document.getElementsByTagName("body").addEventListener("onload",volumen,false);
    }

}

function login(){
    location.href = 'http://localhost/TETRIS/proyecto/login.php';
}

function registro(){
    location.href = 'http://localhost/TETRIS/proyecto/registro.php';
}