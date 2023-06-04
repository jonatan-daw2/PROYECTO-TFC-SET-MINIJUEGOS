<?php session_start();?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Agregamos los estilos de Bootstrap -->
    <link rel="stylesheet" href="../proyecto/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="../proyecto/css/login.css">
    <script src="../proyecto/js/app3.js"></script>
</head>
<body>
    <?php
        include("funcion.php");
        
        if($_SERVER["REQUEST_METHOD"] == "GET"){
            $apodo = "";
        }

        if(isset($_POST["apodo"]) and isset($_POST["password"])){
            $apodo = filtrado($_POST["apodo"]);
            $password = md5(filtrado($_POST["password"]));
        }

        if($_SERVER['REQUEST_METHOD'] != "GET"){
            $base = "setjuegos";
            $usuario = "Jonny";
            $pass = "Ch0k0l4t3";
            $local = "localhost";
            $dato = strtoupper($apodo);

            $mysqli = new mysqli($local,$usuario,$pass,$base);

            $consulta_tabla = $mysqli->query("SELECT apodo from setjuegos.usuario where UPPER(apodo)='$dato' AND pass='$password';");
            if($consulta_tabla->num_rows > 0){
                $_SESSION["apodo"] = $apodo;
                header("Location:sesion.php");
            }else{
                $resultado = "no coinciden los datos";
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
                    <a class="navbar-brand registro" href="registro.php">REGISTRO</a>
                </li>
            </ul>
        </div>
    </nav>

    <!-- Agregamos los botones centrados en la página -->
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="bg-blue">
                    <!-- Agregamos el formulario con los campos solicitados -->
                    <form action="login.php" method="post" id="formu">
                        <div class="form-group">
                            <label for="apodo">Apodo</label>
                            <input type="text" class="form-control" id="apodo" name="apodo" required value=<?php if(!empty($apodo)){echo "$apodo";}?>>
                            <p id="errorAp"><p>
                        </div>
                        <div class="form-group">
                            <label for="password">Contraseña</label>
                            <input type="password" class="form-control" id="password" name="password" required>
                            <p id="errorP"><?php if(!empty($apodo) && !empty($password)){
                                                    echo "$resultado";
                                                  } ?><p>
                        </div>
                        <input type="button" id="enviar" class="btn btn-primary" value=Enviar></input>
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