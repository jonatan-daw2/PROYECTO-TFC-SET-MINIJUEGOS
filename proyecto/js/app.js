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
    let nombre = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellidos").value;
    let edad = document.getElementById("edad").value;
    let apodo = document.getElementById("apodo").value;
    let contrasena = document.getElementById("password").value;
    let contrasena2 = document.getElementById("password2").value;

    let contador = 0;

    if(nombre != "" && apellidos != ""  && edad != "" && apodo != "" && contrasena != ""){
        document.getElementById("errorN").style.display="none";
        document.getElementById("errorA").style.display="none";
        document.getElementById("errorAp").style.display="none";
        
        if(contrasena.length < 7){
            document.getElementById("errorP").style.display = "block";
            document.getElementById("errorP").textContent = "Contraseña menor a 7 caracteres";
            contador += 1;
        }else{
            let regla1 = /[a-z]/;
            let regla2 = /[A-Z]/;
            if (contrasena.match(regla1) && contrasena.match(regla2)) {
                document.getElementById("errorP").style.display="none";

            }else{
                document.getElementById("errorP").textContent = "Usa mayusculas y minusculas";
                document.getElementById("errorP").style.display="block";
                contador += 1;
            }
        }

        if(contrasena2 != contrasena){
            document.getElementById("errorP2").style.display = "block";
            document.getElementById("errorP2").textContent = "Pon la misma contraseña que arriba";
            contador += 1;
        }else{
            document.getElementById("errorP2").style.display = "block";
        }
        
        if(isNaN(edad)){
            document.getElementById("errorE").textContent = "La edad ha de ser un numero";
            document.getElementById("errorE").style.display="block";
            contador += 1;
        }else{
            document.getElementById("errorE").style.display="none";
        }
        if(parseInt(edad) < 0){
            document.getElementById("errorE").textContent = "La edad ha de ser positiva";
            document.getElementById("errorE").style.display="block";
            contador += 1;
        }else{
            document.getElementById("errorE").style.display="none";
        }

        if(contador == 0){
            document.getElementById("errorAp").style.display="block";
            registro();
        }
    }else{
        if(nombre == ""){
            document.getElementById("errorN").textContent = "Campo vacio";
            document.getElementById("errorN").style.display="block";
       }else{
           document.getElementById("errorN").style.display="none";
       }
       
       if(apellidos == ""){
           document.getElementById("errorA").textContent = "Campo vacio";
           document.getElementById("errorA").style.display="block";
       }else{
           document.getElementById("errorA").style.display="none";
       }
       if(edad == ""){
           document.getElementById("errorE").textContent = "Campo vacio";
           document.getElementById("errorE").style.display="block";
       }else{
           document.getElementById("errorE").style.display="none";
       }
       if(apodo == ""){
           document.getElementById("errorAp").textContent = "Campo vacio";
           document.getElementById("errorAp").style.display="block";
       }else{
           document.getElementById("errorAp").style.display="none";
       }
       if(contrasena == ""){
            document.getElementById("errorP").textContent = "Campo vacio";
            document.getElementById("errorP").style.display="block";
       }else{
           document.getElementById("errorP").style.display="none";
       }if(contrasena2 == ""){
            document.getElementById("errorP").textContent = "Campo vacio";
            document.getElementById("errorP").style.display="block";
       }else{
            document.getElementById("errorP").style.display="none";
       }
    }
}

function registro(){
    document.getElementById("formu").submit();
}
