<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>Sesion</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="../proyecto/bootstrap/bootstrap.min.css">
  <script src="../proyecto/js/app4.js"></script>
  <link rel="stylesheet" href="../proyecto/css/juegos.css">
</head>
<style>

</style>

<body id="juegos">
  <?php
  session_start();
  $apodo = $_SESSION['apodo'];

  $base = "setjuegos";
  $usuario = "Jonny";
  $pass = "Ch0k0l4t3";
  $local = "localhost";

  $mysqli = new mysqli($local, $usuario, $pass, $base);

  $idJugador;

  $consulta_tabla = $mysqli->query("SELECT idJugador from setjuegos.jugador where UPPER(nombre)='$apodo';");
  if ($consulta_tabla->num_rows > 0) {
    while ($row = $consulta_tabla->fetch_assoc()) {
      $idJugador = $row["idJugador"];
    }
  } 

  $skin = 1;
  $skinsSelcciondas = [];
  $idProducto;
  $snake = 0;
  $pacman = 0;
  $flap = 0;
  $dinosaur;
  $letraDino;

  $consulta_tabla = $mysqli->query("SELECT idProducto from setjuegos.skins where skinSeleccionada = '$skin' and idJugador = '$idJugador';");
  if ($consulta_tabla->num_rows > 0) {
    while ($row = $consulta_tabla->fetch_assoc()) {
      $idProducto = $row["idProducto"];
      array_push($skinsSelcciondas, $idProducto);
    }
  } 

  for($i=0; $i<count($skinsSelcciondas); $i++){
    if($skinsSelcciondas[$i] == 1 || $skinsSelcciondas[$i] == 2 || $skinsSelcciondas[$i] == 3){
      $snake = $skinsSelcciondas[$i];
      if($snake == 1){
        $snake = 1;
      }else if($snake == 2){
        $snake = 2;
      }else if($snake == 3){
        $snake = 3;
      }
    }
    if($skinsSelcciondas[$i] == 4 || $skinsSelcciondas[$i] == 5 || $skinsSelcciondas[$i] == 6){
      $pacman = $skinsSelcciondas[$i];
      if($pacman == 4){
        $pacman = 1;
      }else if($pacman == 5){
        $pacman = 2;
      }else if($pacman == 6){
        $pacman = 3;
      }
      
    }
    if($skinsSelcciondas[$i] == 7 || $skinsSelcciondas[$i] == 8){
      $flap = $skinsSelcciondas[$i];
      if($flap == 7){
        $flap = 2;
      }else{
        $flap = 3;
      }
    }
    if($skinsSelcciondas[$i] == 9 || $skinsSelcciondas[$i] == 10 || $skinsSelcciondas[$i] == 11){
      $dinosaur = $skinsSelcciondas[$i];
      if($dinosaur == 9){
        $letraDino = "B";
      }else if($dinosaur == 10){
        $letraDino = "G";
      }else if($dinosaur == 11){
        $letraDino = "P";
      }
    }else{
      $dinosaur = "";
      $letraDino = "";
    }
  }
  
  ?>
  <nav class='navbar navbar-expand-lg navbar-dark bg-dark'>
    <div class='container-fluid'>
      <a class='navbar-brand' href='sesion.php'>
        Set Juegos
      </a>
      <ul class='navbar-nav'>
        <li class='nav-item'>
          <a class='nav-link' href='perfil.php' id='perfil'>PERFIL</a>
        </li>
        <li class='nav-item'>
          <a class='nav-link' href='tienda.php' id='tienda'>TIENDA</a>
        </li>
      </ul>
    </div>
  </nav>

  <!-- Adding 5 cards -->
  <div class="container center">
    <div class="row">
      <div class="col">
        <div class="card">
          <img src="imagenes/tetris.png" class="card-img-top" alt="Image 1">
          <div class="card-body">
            <h5 class="card-title">Tetris</h5>
            <p class="card-text">Let's play!</p>
            <?php
            $url = "../proyecto/juego/tetris/tetris.html?apodo=" . urlencode($apodo);
            ?>
            <a href="<?php echo $url; ?>" class="btn btn-primary play-button">PLAY</a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <img src="imagenes/pacman.png" class="card-img-top" alt="Image 2">
          <div class="card-body">
            <h5 class="card-title">Pacman</h5>
            <p class="card-text">Let's play!</p>
            <?php
            $url = "../proyecto/juego/pacman/pacman.html?apodo=" . urlencode($apodo). "&num=". urlencode($pacman);
            ?>
            <a href="<?php echo $url; ?>" class="btn btn-primary play-button">PLAY</a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <img src="imagenes/dinosaur.png" class="card-img-top" alt="Image 3">
          <div class="card-body">
            <h5 class="card-title">Dinosaur</h5>
            <p class="card-text">Let's play!</p>
            <?php
            $url = "../proyecto/juego/DinosaurGame/dinosaur.html?apodo=" . urlencode($apodo). "&num=". urlencode($dinosaur). "&letra=". urlencode($letraDino);
            ?>
            <a href="<?php echo $url; ?>" class="btn btn-primary play-button">PLAY</a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <img src="imagenes/snake.png" class="card-img-top" alt="Image 4">
          <div class="card-body">
            <h5 class="card-title">Snake</h5>
            <p class="card-text">Let's play!</p>
            <?php
            $url = "../proyecto/juego/snake/prueba3.html?apodo=" . urlencode($apodo) . "&num=" . urlencode($snake);
            ?>
            <a href="<?php echo $url; ?>" class="btn btn-primary play-button">PLAY</a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <img src="imagenes/flappy.png" class="card-img-top" alt="Image 5">
          <div class="card-body">
            <h5 class="card-title">FlappyBird</h5>
            <p class="card-text">Let's play!</p>
            <?php
            $url = "../proyecto/juego/flappyBird/flappyBird.html?apodo=" . urlencode($apodo) . "&num=". urlencode($flap);
            ?>
            <a href="<?php echo $url; ?>" class="btn btn-primary play-button">PLAY</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script src="../proyecto/bootstrap/jquery-3.2.1.slim.min.js"></script>
  <script src="../proyecto/bootstrap/bootstrap.min.js"></script>
</body>

</html>