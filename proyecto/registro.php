<?php session_start(); ?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Registro</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Agregamos los estilos de Bootstrap -->
    <link rel="stylesheet" href="../proyecto/bootstrap/bootstrap.min.css">
    <script src="../proyecto/js/app.js"></script>
    <link rel="stylesheet" href="../proyecto/css/registro.css">
</head>
<style>
    
</style>
<body>
    <?php
    include("funcion.php");
    include("db.php");

    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        $nombre = "";
        $apellidos = "";
        $edad = "";
        $apodo = "";
        $password = "";
        $password2 = "";
    }

    if (isset($_POST["nombre"]) and isset($_POST["apellidos"]) and isset($_POST["edad"]) and isset($_POST["apodo"]) and isset($_POST["password"]) and isset($_POST["password2"])) {
        $nombre = filtrado($_POST["nombre"]);
        $apellidos = filtrado($_POST["apellidos"]);
        $edad = filtrado($_POST["edad"]);
        $apodo = filtrado($_POST["apodo"]);
        $password = md5(filtrado($_POST["password"]));
        $password2 = (filtrado($_POST["password2"]));
    }

    if ($_SERVER['REQUEST_METHOD'] != "GET") {
        
        $dato = strtoupper($apodo);

        $consulta_tabla = $mysqli->query("SELECT nombre from setjuegos.jugador where UPPER(nombre)='$dato';");

        $comprobacionApodo;
        $resultado;
        if($consulta_tabla->num_rows > 0){
            while($row = $consulta_tabla->fetch_assoc()){
                $comprobacionApodo = $row["nombre"];
            }
            if($comprobacionApodo == $apodo){
                $resultado = "Ya existe";
            }
        }else{
            $resultado = "";
            $nivel = 0;
            $partidas = 0;
            $media = 0;
            $max = 0;
            $monedas = 0;

            $idJugador = 0;

            $consulta_preparada = $mysqli->prepare("INSERT INTO setjuegos.jugador (nombre, nivel, partidasTotales, mediaPuntos, maximaPuntuacion, monedas) VALUES (?,?,?,?,?,?)");
            $consulta_preparada->bind_param("siidii", $apodo, $nivel, $partidas, $media, $max, $monedas);
            $consulta_preparada->execute();

            if($consulta_preparada->param_count > 0){
                
                $consulta_preparada = $mysqli->query("SELECT idJugador from setjuegos.jugador where nombre='$apodo'");
                if($consulta_preparada->num_rows > 0){
                    while($row = $consulta_preparada->fetch_assoc()){
                        $idJugador = $row["idJugador"];
                    }
                }
            }

            $consulta_preparada =  $mysqli->prepare("INSERT INTO setjuegos.usuario (nombre, apodo, pass, apellidos, edad, idJugador) VALUES (?,?,?,?,?,?)");
            $consulta_preparada->bind_param("ssssii", $nombre, $apodo, $password, $apellidos, $edad, $idJugador);
            $consulta_preparada->execute();

            if($consulta_preparada->param_count > 0){
                $_SESSION["apodo"] = $apodo;
                header("Location:sesion.php");
            }
            
        }
       
    }

    ?>
    <!--<audio src="musicaFondo.mp3" id="audioRegistro" autoplay loop></audio>-->
    <!-- Agregamos la barra de menú -->
    <nav class="navbar navbar-expand-md navbar-dark">
        <a class="navbar-brand" href="index.php">INICIO</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="navbar-brand login" href="login.php">LOGIN</a>
                </li>
            </ul>
        </div>
    </nav>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="bg-blue">
                    <!-- Agregamos el formulario con los campos solicitados -->
                    <form action="registro.php" method="post" id="formu">
                        <div class="form-group">
                            <label for="nombre">Nombre</label>
                            <input type="text" class="form-control" id="nombre" name="nombre" required value=<?php if (!empty($nombre) && $_SERVER['REQUEST_METHOD'] != "GET") {
                                                                                                                    echo "$nombre";
                                                                                                                } else {
                                                                                                                    echo "";
                                                                                                                } ?>>
                            <p id="errorN"></p>
                        </div>
                        <div class="form-group">
                            <label for="apellidos">Apellidos</label>
                            <input type="text" class="form-control" id="apellidos" name="apellidos" required value=<?php if (!empty($apellidos)) {
                                                                                                                        echo "$apellidos";
                                                                                                                    } ?>>
                            <p id="errorA"></p>
                        </div>
                        <div class="form-group">
                            <label for="edad">Edad</label>
                            <input type="number" class="form-control" id="edad" name="edad" value=<?php if (!empty($edad)) {
                                                                                                        echo "$edad";
                                                                                                    } ?> required>
                            <p id="errorE"></p>
                        </div>
                        <div class="form-group">
                            <label for="apodo">Apodo</label>
                            <input type="text" class="form-control" id="apodo" name="apodo" required value=<?php if (!empty($apodo)) {
                                                                                                                echo "$apodo";
                                                                                                            } ?>>
                            <p id="errorAp"><?php if (!empty($apodo)) {
                                                echo "$resultado";
                                            } ?></p>
                        </div>
                        <div class="form-group">
                            <label for="password">Contraseña</label>
                            <input type="password" class="form-control" id="password" name="password" required>
                            <p id="errorP"></p>
                        </div>
                        <div class="form-group">
                            <label for="password2">Repite contraseña</label>
                            <input type="password" class="form-control" id="password2" name="password2" required>
                            <p id="errorP2"></p>
                        </div>
                        <input type="button" id="enviar" class="btn btn-primary" value="Enviar"></input>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <footer>
        <b> By Jontan Rosario Matos, Daw-2</b>
    </footer>
    <!-- Agregamos los scripts necesarios de Bootstrap -->
    <script src="../proyecto/bootstrap/jquery-3.2.1.slim.min.js"></script>
    <script src="../proyecto/bootstrap/bootstrap.min.js"></script>
</body>

</html>

</html>