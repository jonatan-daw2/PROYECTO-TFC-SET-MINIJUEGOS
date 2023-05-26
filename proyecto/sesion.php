<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Sesion</title>
    <link rel="stylesheet" href="../proyecto/bootstrap/bootstrap.min.css">
    <script src="../proyecto/js/app4.js"></script>
    <link rel="stylesheet" href="../proyecto/css/sesion.css">
  </head>
  <style>

  </style>
  <body>
  <?php
    session_start();
    include("funcion.php");

    if($_SERVER['REQUEST_METHOD'] != "GET"){
        session_destroy();
        header("Location:index.php");
    }
  ?>
  <nav class='navbar navbar-expand-lg navbar-dark bg-dark'>
    <div class='container-fluid'>
            <a class='navbar-brand' href='sesion.php'>Set Juegos</a>
            <button class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
                <span class='navbar-toggler-icon'></span>
            </button>
            <div class='collapse navbar-collapse' id='navbarNav'>
            <ul class='navbar-nav ms-auto'>
                <li class='nav-item'>
                    <a class='nav-link' href='#' id="top">RANKING</a>
                </li>
                <li class='nav-item'>
                    <a class='nav-link jugar' href='../proyecto/juego/tetris/tetris.html' id="jugar">JUGAR</a>
                </li>
                <li class='nav-item'>
                    <form action='sesion.php' method='post' class='d-flex'>
                        <input class='form-control me-2' type='search' placeholder='Buscar' aria-label='Buscar' id='usu'>
                        <input class='btn btn-outline-light' type='button' id="enviar" value="Enviar"></input>
                    </form>
                </li>
                <li class='nav-item'>
                    <form action="sesion.php" method="post">
                        <button class='btn-lg' id='out' type="submit">LogOut</button>
                    </form>
                </li>
            </ul>
        </div>
    </div>
</nav>
<div id="bienvenido">
    <h1><?php echo "Bienvenido ". $_SESSION["apodo"];?></h1>
</div>

<p style='display:none;' id="respuesta"></p>
<p style='display:none;' id="ranking"></p>

<script src="../proyecto/bootstrap/jquery-3.2.1.slim.min.js"></script>
    <script src="../proyecto/bootstrap/bootstrap.min.js"></script>
</body>
</html>
