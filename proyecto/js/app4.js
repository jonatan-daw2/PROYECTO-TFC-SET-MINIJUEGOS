document.addEventListener("readystatechange",cargarEventos,false);

function cargarEventos(evento){
    if(document.readyState=="interactive"){
        document.getElementById("enviar").addEventListener("click",comprobarNombre,false);
        document.getElementById("top").addEventListener("click",ranking,false);
        //document.getElementById("login").addEventListener("click",login,false);
        //document.getElementsByTagName("body").addEventListener("onload",volumen,false);
    }
}

function comprobarNombre(){
    xhttp = new XMLHttpRequest();
    let usu = document.getElementById("usu").value;
    xhttp.open("GET", "busquedas.php?usu="+ usu, false);
    xhttp.addEventListener("readystatechange", gestionarRespuesta, false)
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(null);
}

function gestionarRespuesta() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        document.getElementById("respuesta").innerHTML = xhttp.responseText
        console.log(xhttp.responseText);
        if (xhttp.responseText == "") {
            document.getElementById("respuesta").style.display = "none";
        }else{
            document.getElementById("respuesta").style.display = "block";
            document.getElementById("ranking").style.display = "none";
        }
    }
}

function ranking(){
    xhttp = new XMLHttpRequest();
    let usu = document.getElementById("usu").value = "";
    xhttp.open("GET", "busquedas.php?usu="+ usu, false);
    xhttp.addEventListener("readystatechange", gestionRanking, false)
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(null);
}

function gestionRanking() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        document.getElementById("ranking").innerHTML = xhttp.responseText
        console.log(xhttp.responseText);
        if (xhttp.responseText == "") {
            document.getElementById("ranking").style.display = "none";
        }else{
            document.getElementById("ranking").style.display = "block";
            document.getElementById("respuesta").style.display = "none";
        }
    }
}
