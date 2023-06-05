<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>Sesion</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="../proyecto/bootstrap/bootstrap.min.css">
  <script src="../proyecto/js/app4.js"></script>
  <link rel="stylesheet" href="../proyecto/css/perfil.css">
  <style>

  </style>
  <script>
    let dato = false;

    function mostrarOpciones() {
      let opciones = document.getElementById("opciones");
      if (dato === false) {
        opciones.classList.remove("hidden");
        dato = true;
      } else {
        opciones.classList.add("hidden");
        dato = false;
      }
    }
  </script>

</head>

<body id="juegos">
  <?php
  session_start();
  include("funcion.php");
  $apodo = $_SESSION["apodo"];

  $base = "setjuegos";
  $usuario = "Jonny";
  $pass = "Ch0k0l4t3";
  $local = "localhost";

  $apodo = $_SESSION["apodo"];

  $mysqli = new mysqli($local, $usuario, $pass, $base);
  if ($mysqli->connect_errno) {
    die("Error al conectar con la base de datos: " . $mysqli->connect_error);
  }
  $consulta_tabla = $mysqli->query("SELECT nombre, nivel, partidasTotales, mediaPuntos, maximaPuntuacion, monedas from setjuegos.jugador where UPPER(nombre)='$apodo';");

  $nivel;
  $total;
  $media;
  $max;
  $monedas;
  if ($consulta_tabla->num_rows > 0) {
    while ($row = $consulta_tabla->fetch_assoc()) {
      $apodo = $row["nombre"];
      $nivel = $row["nivel"];
      $total = $row["partidasTotales"];
      $media = $row["mediaPuntos"];
      $max = $row["maximaPuntuacion"];
      $monedas = $row["monedas"];
    }
  }

  $idJugador;
  $consulta_tabla = $mysqli->query("SELECT idJugador from setjuegos.jugador where UPPER(nombre)='$apodo';");
  if ($consulta_tabla->num_rows > 0) {
    while ($row = $consulta_tabla->fetch_assoc()) {
      $idJugador = $row["idJugador"];
    }
  }

  $visibilidad;
  $idProducto = [];
  $mostrarONo = [];
  $dato;
  $consulta_tabla = $mysqli->query("SELECT idProducto from setjuegos.compra where idJugador='$idJugador';");
  if ($consulta_tabla->num_rows > 0) {
    while ($row = $consulta_tabla->fetch_assoc()) {
      $dato = $row["idProducto"];
      array_push($idProducto, $dato);
    }
  }

  for ($i = 1; $i <= 11; $i++) {
    $visibilidad = "visibility:hidden";
    for ($j = 0; $j < count($idProducto); $j++) {
      // Verificar si el valor $i está presente en $idProducto
      if (in_array($i, $idProducto)) {
        $visibilidad = "visibility:visible";
      }
    }
    array_push($mostrarONo, $visibilidad);
  }

  if ($_SERVER['REQUEST_METHOD'] != "GET") {
    $elegido = 0;

    // Actualizar los valores seleccionados por los radios en 1 y los no seleccionados en 0 para skinSnake
    if (isset($_POST["skinSnake"])) {
        $opcionSeleccionada = $_POST["skinSnake"];

        // Actualizar a 1 para la opción seleccionada
        $elegido = 1;
        $consulta_compra = $mysqli->prepare("UPDATE setjuegos.skins SET skinSeleccionada = ? WHERE idJugador = ? AND idProducto = ?");
        $consulta_compra->bind_param("iii", $elegido, $idJugador, $opcionSeleccionada);
        $consulta_compra->execute();

        // Actualizar a 0 para las opciones no seleccionadas
        if($opcionSeleccionada == 1){
          $consulta_compra = $mysqli->prepare("UPDATE setjuegos.skins SET skinSeleccionada = 0 WHERE idJugador = ? AND idProducto = 2");
          $consulta_compra->bind_param("i", $idJugador);
          $consulta_compra->execute();

          $consulta_compra = $mysqli->prepare("UPDATE setjuegos.skins SET skinSeleccionada = 0 WHERE idJugador = ? AND idProducto = 3");
          $consulta_compra->bind_param("i", $idJugador);
          $consulta_compra->execute();
        }else if($opcionSeleccionada == 2){
          $consulta_compra = $mysqli->prepare("UPDATE setjuegos.skins SET skinSeleccionada = 0 WHERE idJugador = ? AND idProducto = 1");
          $consulta_compra->bind_param("i", $idJugador);
          $consulta_compra->execute();

          $consulta_compra = $mysqli->prepare("UPDATE setjuegos.skins SET skinSeleccionada = 0 WHERE idJugador = ? AND idProducto = 3");
          $consulta_compra->bind_param("i", $idJugador);
          $consulta_compra->execute();
        }else if($opcionSeleccionada == 3){
          $consulta_compra = $mysqli->prepare("UPDATE setjuegos.skins SET skinSeleccionada = 0 WHERE idJugador = ? AND idProducto = 1");
          $consulta_compra->bind_param("i", $idJugador);
          $consulta_compra->execute();
          
          $consulta_compra = $mysqli->prepare("UPDATE setjuegos.skins SET skinSeleccionada = 0 WHERE idJugador = ? AND idProducto = 2");
          $consulta_compra->bind_param("i", $idJugador);
          $consulta_compra->execute();
        }
        
    }

    // Repetir el mismo patrón para skinPac
    if (isset($_POST["skinPac"])) {
        $opcionSeleccionada = $_POST["skinPac"];

        // Actualizar a 1 para la opción seleccionada
        $elegido = 1;
        $consulta_compra = $mysqli->prepare("UPDATE setjuegos.skins SET skinSeleccionada = ? WHERE idJugador = ? AND idProducto = ?");
        $consulta_compra->bind_param("iii", $elegido, $idJugador, $opcionSeleccionada);
        $consulta_compra->execute();

        // Actualizar a 0 para las opciones no seleccionadas
        if($opcionSeleccionada == 4){
          $consulta_compra = $mysqli->prepare("UPDATE setjuegos.skins SET skinSeleccionada = 0 WHERE idJugador = ? AND idProducto = 5");
          $consulta_compra->bind_param("i", $idJugador);
          $consulta_compra->execute();

          $consulta_compra = $mysqli->prepare("UPDATE setjuegos.skins SET skinSeleccionada = 0 WHERE idJugador = ? AND idProducto = 6");
          $consulta_compra->bind_param("i", $idJugador);
          $consulta_compra->execute();
        }else if($opcionSeleccionada == 5){
          $consulta_compra = $mysqli->prepare("UPDATE setjuegos.skins SET skinSeleccionada = 0 WHERE idJugador = ? AND idProducto = 6");
          $consulta_compra->bind_param("i", $idJugador);
          $consulta_compra->execute();

          $consulta_compra = $mysqli->prepare("UPDATE setjuegos.skins SET skinSeleccionada = 0 WHERE idJugador = ? AND idProducto = 4");
          $consulta_compra->bind_param("i", $idJugador);
          $consulta_compra->execute();
        }else if($opcionSeleccionada == 6){
          $consulta_compra = $mysqli->prepare("UPDATE setjuegos.skins SET skinSeleccionada = 0 WHERE idJugador = ? AND idProducto = 5");
          $consulta_compra->bind_param("i", $idJugador);
          $consulta_compra->execute();
          
          $consulta_compra = $mysqli->prepare("UPDATE setjuegos.skins SET skinSeleccionada = 0 WHERE idJugador = ? AND idProducto = 4");
          $consulta_compra->bind_param("i", $idJugador);
          $consulta_compra->execute();
        }
    }

    // Repetir el mismo patrón para skinDino
    if (isset($_POST["skinDino"])) {
        $opcionSeleccionada = $_POST["skinDino"];

        // Actualizar a 1 para la opción seleccionada
        $elegido = 1;
        $consulta_compra = $mysqli->prepare("UPDATE setjuegos.skins SET skinSeleccionada = ? WHERE idJugador = ? AND idProducto = ?");
        $consulta_compra->bind_param("iii", $elegido, $idJugador, $opcionSeleccionada);
        $consulta_compra->execute();

        // Actualizar a 0 para las opciones no seleccionadas
        if($opcionSeleccionada == 9){
          $consulta_compra = $mysqli->prepare("UPDATE setjuegos.skins SET skinSeleccionada = 0 WHERE idJugador = ? AND idProducto = 10");
          $consulta_compra->bind_param("i", $idJugador);
          $consulta_compra->execute();

          $consulta_compra = $mysqli->prepare("UPDATE setjuegos.skins SET skinSeleccionada = 0 WHERE idJugador = ? AND idProducto = 11");
          $consulta_compra->bind_param("i", $idJugador);
          $consulta_compra->execute();
        }else if($opcionSeleccionada == 10){
          $consulta_compra = $mysqli->prepare("UPDATE setjuegos.skins SET skinSeleccionada = 0 WHERE idJugador = ? AND idProducto = 9");
          $consulta_compra->bind_param("i", $idJugador);
          $consulta_compra->execute();

          $consulta_compra = $mysqli->prepare("UPDATE setjuegos.skins SET skinSeleccionada = 0 WHERE idJugador = ? AND idProducto = 11");
          $consulta_compra->bind_param("i", $idJugador);
          $consulta_compra->execute();
        }else if($opcionSeleccionada == 11){
          $consulta_compra = $mysqli->prepare("UPDATE setjuegos.skins SET skinSeleccionada = 0 WHERE idJugador = ? AND idProducto = 10");
          $consulta_compra->bind_param("i", $idJugador);
          $consulta_compra->execute();
          
          $consulta_compra = $mysqli->prepare("UPDATE setjuegos.skins SET skinSeleccionada = 0 WHERE idJugador = ? AND idProducto = 9");
          $consulta_compra->bind_param("i", $idJugador);
          $consulta_compra->execute();
        }
    }

    // Repetir el mismo patrón para skinFlap
    if (isset($_POST["skinFlap"])) {
        $opcionSeleccionada = $_POST["skinFlap"];

        // Actualizar a 1 para la opción seleccionada
        $elegido = 1;
        $consulta_compra = $mysqli->prepare("UPDATE setjuegos.skins SET skinSeleccionada = ? WHERE idJugador = ? AND idProducto = ?");
        $consulta_compra->bind_param("iii", $elegido, $idJugador, $opcionSeleccionada);
        $consulta_compra->execute();

        // Actualizar a 0 para las opciones no seleccionadas
        if($opcionSeleccionada == 7){
          $consulta_compra = $mysqli->prepare("UPDATE setjuegos.skins SET skinSeleccionada = 0 WHERE idJugador = ? AND idProducto = 8");
          $consulta_compra->bind_param("i", $idJugador);
          $consulta_compra->execute();
          
        }else if($opcionSeleccionada == 8){
          $consulta_compra = $mysqli->prepare("UPDATE setjuegos.skins SET skinSeleccionada = 0 WHERE idJugador = ? AND idProducto = 7");
          $consulta_compra->bind_param("i", $idJugador);
          $consulta_compra->execute();
        }
    }

    echo '<h1 style="color: green;">Datos Guardados</h1>';
    echo "<a href='perfil.php'>Volver al Perfil</a>";
  } else {
  ?>
    <nav class='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div class='container-fluid'>
        <a class='navbar-brand' href='sesion.php'>
          Set Juegos
        </a>
        <ul class='navbar-nav'>
          <li class='nav-item'>
            <a class='nav-link' href='juegos.php' id='perfil'>JUGAR</a>
          </li>
          <li class='nav-item'>
            <a class='nav-link' href='tienda.php' id='tienda'>TIENDA</a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="card" style="width: 18rem;">
      <img src="..." class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Perfil</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Apodo:&nbsp;<?php echo $apodo ?></li>
        <li class="list-group-item">Nivel:&nbsp;<?php echo $nivel ?></li>
        <li class="list-group-item">Partidas Totales:&nbsp;<?php echo $total ?></li>
        <li class="list-group-item">Media Puntos:&nbsp;<?php echo $media ?></li>
        <li class="list-group-item">Máxima Puntuación:&nbsp;<?php echo $max ?></li>
        <li class="list-group-item">Monedas:&nbsp;<?php echo $monedas ?></li>
        <li class="list-group-item">
          <button type="button" onclick="mostrarOpciones(dato)" class="btn btn-primary">Skins</button>
        </li>

        <form action="perfil.php" method="POST">
          <li class="list-group-item hidden" id="opciones">
            <a>Snake Game Skins</a><br>
            <input type="radio" name="skinSnake" value="1" style="<?php echo $mostrarONo[0] ?>"> Skin Azul<br>
            <input type="radio" name="skinSnake" value="2" style="<?php echo $mostrarONo[1] ?>"> Skin Amarilla<br>
            <input type="radio" name="skinSnake" value="3" style="<?php echo $mostrarONo[2] ?>"> Skin Morada<br>
            <a>Pacman Game Skins</a><br>
            <input type="radio" name="skinPac" value="4" style="<?php echo $mostrarONo[3] ?>"> Skin Verde<br>
            <input type="radio" name="skinPac" value="5" style="<?php echo $mostrarONo[4] ?>"> Skin Morada<br>
            <input type="radio" name="skinPac" value="6" style="<?php echo $mostrarONo[5] ?>"> Skin Azul<br>
            <a>FlappyBird Game Skins</a><br>
            <input type="radio" name="skinFlap" value="7" style="<?php echo $mostrarONo[6] ?>"> Skin Zeke<br>
            <input type="radio" name="skinFlap" value="8" style="<?php echo $mostrarONo[7] ?>"> Skin Sepia<br>
            <a>Dinosaur Game Skins</a><br>
            <input type="radio" name="skinDino" value="9" style="<?php echo $mostrarONo[8] ?>"> Skin Azul<br>
            <input type="radio" name="skinDino" value="10" style="<?php echo $mostrarONo[9] ?>"> Skin Verde<br>
            <input type="radio" name="skinDino" value="11" style="<?php echo $mostrarONo[10] ?>"> Skin Rosa<br>
            <button type="submit" class="btn btn-primary">Guardar</button>
          </li>
        </form>
      </ul>
    </div>
  <?php } ?>

  <script src="../proyecto/bootstrap/jquery-3.2.1.slim.min.js"></script>
  <script src="../proyecto/bootstrap/bootstrap.min.js"></script>
</body>

</html>