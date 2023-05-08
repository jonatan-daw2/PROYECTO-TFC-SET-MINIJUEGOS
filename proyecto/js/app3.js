document.addEventListener("readystatechange",cargarEventos,false);

function cargarEventos(evento){
    if(document.readyState=="interactive"){
        document.getElementById("enviar").addEventListener("click",comprobar,false);
        //document.getElementById("login").addEventListener("click",login,false);
        //document.getElementsByTagName("body").addEventListener("onload",volumen,false);
    }

    /*function volumen(){
        document.getElementById("audioRegistro").volume = 0.2;
        return document.getElementById("audioRegistro").volume;
    }*/
}

function comprobar(){
    let apodo = document.getElementById("apodo").value;
    let contrasena = document.getElementById("password").value;

    let contador = 0;

    if(apodo != "" && contrasena !=""){
        document.getElementById("errorAp").style.display="none";
        document.getElementById("errorP").style.display="none";
    }else{
        if(apodo == ""){
            document.getElementById("errorAp").textContent = "Campo vacio";
            document.getElementById("errorAp").style.display="block";
            contador +=1;
        }else{
            document.getElementById("errorAp").style.display="none";
        }
        if(contrasena == ""){
             document.getElementById("errorP").textContent = "Campo vacio";
             document.getElementById("errorP").style.display="block";
             contador +=1;
        }else{
            document.getElementById("errorP").style.display="none";
        }
    }

    if(contador == 0){
        document.getElementById("errorAp").style.display="block";
        document.getElementById("errorP").style.display="block";
        registro();
    }
}

function registro(){
    document.getElementById("formu").submit();
}