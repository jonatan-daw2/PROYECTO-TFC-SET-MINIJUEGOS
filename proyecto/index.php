<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Inicio</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Agregamos los estilos de Bootstrap -->
    <link rel="stylesheet" href="../proyecto/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="../proyecto/css/inicio.css">
    <style>
    </style>
</head>
<body>
    <!--<audio src="musicaFondo.mp3" id="audioRegistro" autoplay loop></audio>-->
    <!-- Agregamos la barra de menú -->
    <nav class="navbar navbar-expand-md navbar-dark">
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <h1><a class="nav-link" href="../proyecto/index.php">Proyecto Curso</a></h1>
                </li>
            </ul>
        </div>
    </nav>

    <!-- Agregamos los botones centrados en la página -->
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="d-flex flex-column align-items-center">
                    <h1 class="nav-link">SET MINI JUEGOS</h1>
                    <a class="btn btn-primary mt-3" href="login.php" id="login">Login</a>
                    <a class="btn btn-secondary mt-3" href="registro.php" id="registro">Registro</a>
                </div>
            </div>
        </div>
    </div>

    <footer>
        <b>By Jontan Rosario Matos, Daw-2</b>
    </footer>

    <!-- Agregamos los scripts necesarios de Bootstrap -->
    <script src="../proyecto/bootstrap/jquery-3.2.1.slim.min.js"></script>
    <script src="../proyecto/bootstrap/bootstrap.min.js"></script>
</body>
</html>
