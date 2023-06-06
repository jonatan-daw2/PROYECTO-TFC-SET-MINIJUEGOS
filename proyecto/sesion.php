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

  if ($_SERVER['REQUEST_METHOD'] != "GET") {
    session_destroy();
    header("Location:index.php");
  }

  $base = "setjuegos";
  $usuario = "Jonny";
  $pass = "Ch0k0l4t3";
  $local = "localhost";

  $apodo = $_SESSION["apodo"];

  $mysqli = new mysqli($local, $usuario, $pass, $base);
  if ($mysqli->connect_errno) {
    die("Error al conectar con la base de datos: " . $mysqli->connect_error);
  }
  $monedas;
  $consulta_tabla = $mysqli->query("SELECT monedas from setjuegos.jugador where UPPER(nombre)='$apodo';");
  if ($consulta_tabla->num_rows > 0) {
    while ($row = $consulta_tabla->fetch_assoc()) {
      $monedas = $row["monedas"];
    }
  }

  if ($_SERVER['REQUEST_METHOD'] != "GET") {
    session_destroy();
  }
  ?>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="sesion.php">Set Juegos</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="perfil.php" id="perfil">PERFIL</a>
          </li>
          <li class="nav-item">
            <a class="nav-link jugar" href="juegos.php" id="jugar">JUGAR</a>
          </li>
          <li class="nav-item">
            <a class="nav-link jugar" href="tienda.php" id="tienda">TIENDA</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" id="top">RANKING</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="monedas">MONEDAS:&nbsp;<?php echo $monedas ?></a>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <form action="sesion.php" method="post" class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar" id="usu" />
              <input class="btn btn-outline-light" type="button" id="enviar" value="Enviar" />
            </form>
          </li>
          <li class="nav-item">
            <form action="sesion.php" method="post">
              <button class="btn-lg" id="out" type="submit">LogOut</button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div id="container">
    <div id="bienvenido">
      <h1 id="mensaje"><?php echo "Bienvenido " . "<br>" . $_SESSION["apodo"]; ?></h1>
    </div>
  </div>

  <p style="display:none;" id="respuesta"></p>
  <p style="display:none;" id="ranking"></p>

  <script>
    window.addEventListener("DOMContentLoaded", function() {
      var mensajeElement = document.getElementById("mensaje");
      var mensaje = "Bienvenido <?php echo $_SESSION['apodo']; ?>"; // Obtiene el mensaje de bienvenida desde PHP

      mensajeElement.textContent = mensaje;
      mensajeElement.style.backgroundColor = "rgba(128, 128, 128, 0.5)"; // Color de fondo gris transparente
      mensajeElement.style.padding = "20px";
      mensajeElement.style.borderRadius = "10px";
      mensajeElement.style.width = "auto"; // Establece el ancho automático

      // Obtén el ancho del mensaje y establece el ancho del recuadro en consecuencia
      var mensajeWidth = mensajeElement.offsetWidth;
      mensajeElement.style.width = mensajeWidth + "px";
    });
  </script>
  <script src="../proyecto/bootstrap/jquery-3.2.1.slim.min.js"></script>
  <script src="../proyecto/bootstrap/bootstrap.min.js"></script>
</body>

</html>