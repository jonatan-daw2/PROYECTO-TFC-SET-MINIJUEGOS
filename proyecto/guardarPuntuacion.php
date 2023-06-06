<?php
$puntuacion = $_POST['puntuacion'];
$idJuego = $_POST['idJuego'];
$apodo = $_POST['apodo'];
$apodo = strtoupper($apodo);
$idJugador;
$partidas;
$media;
$nivel;
$maximaPuntuacion;
$moneda;

echo $puntuacion . "" . $idJuego. "". $apodo;

$base = "setjuegos";
$usuario = "Jonny";
$pass = "Ch0k0l4t3";
$local = "localhost";

$mysqli = new mysqli($local, $usuario, $pass, $base);
if ($mysqli->connect_errno) {
  die("Error al conectar con la base de datos: " . $mysqli->connect_error);
}

$consulta_preparada = $mysqli->query("SELECT idJugador from setjuegos.jugador where UPPER(nombre)='$apodo'");
if ($consulta_preparada->num_rows > 0) {
  while ($row = $consulta_preparada->fetch_assoc()) {
    $idJugador = $row["idJugador"];
  }
}

$consulta_preparada = $mysqli->prepare("INSERT INTO setjuegos.puntuaciones (idJugador, idJuego, puntuacion) VALUES (?,?,?)");
$consulta_preparada->bind_param("iii", $idJugador, $idJuego, $puntuacion);
$consulta_preparada->execute();

$consulta_preparada = $mysqli->prepare("SELECT COUNT(*) FROM setjuegos.puntuaciones WHERE idJugador = ?");
$consulta_preparada->bind_param("i", $idJugador);
$consulta_preparada->execute();
$consulta_preparada->bind_result($partidas);
$consulta_preparada->fetch();
$consulta_preparada->close();

// Actualizar el número de partidas del jugador
$partidasTotalesActualizado = $partidas;
$consulta_actualizar = $mysqli->prepare("UPDATE setjuegos.jugador SET partidasTotales = ? WHERE idJugador = ?");
$consulta_actualizar->bind_param("ii", $partidasTotalesActualizado, $idJugador);
$consulta_actualizar->execute();

//obtener total de puntuaciones de un jugador
$consulta_preparada = $mysqli->prepare("SELECT puntuacion FROM setjuegos.puntuaciones WHERE idJugador = ?");
$consulta_preparada->bind_param("i", $idJugador);
$consulta_preparada->execute();
$consulta_preparada->bind_result($puntuacion);

$puntuaciones = [];
$totalPuntuaciones = 0;
$numPuntuaciones = 0;

while ($consulta_preparada->fetch()) {
  $puntuaciones[] = $puntuacion;
  $totalPuntuaciones += $puntuacion;
  $numPuntuaciones++;
}

if ($numPuntuaciones > 0) {
  $mediaPuntuaciones = $totalPuntuaciones / $numPuntuaciones;
} else {
  $mediaPuntuaciones = 0;
}
//media de puntos actualizada
$consulta_actualizar = $mysqli->prepare("UPDATE setjuegos.jugador SET mediaPuntos = ? WHERE idJugador = ?");
$consulta_actualizar->bind_param("di", $mediaPuntuaciones, $idJugador);
$consulta_actualizar->execute();

//nivel del jugador
$consulta_preparada = $mysqli->query("SELECT idJugador, partidasTotales, nivel from setjuegos.jugador where UPPER(nombre)='$apodo'");
if ($consulta_preparada->num_rows > 0) {
  while ($row = $consulta_preparada->fetch_assoc()) {
    $idJugador = $row["idJugador"];
    $partidasTotales = $row["partidasTotales"];
    $nivel = $row["nivel"];
  }
}

$partidasTotales++;

if ($partidasTotales % 10 === 0) {
  $nivel++;
}

$consulta_actualizar = $mysqli->prepare("UPDATE setjuegos.jugador SET partidasTotales = ?, nivel = ? WHERE idJugador = ?");
$consulta_actualizar->bind_param("iii", $partidasTotales, $nivel, $idJugador);
$consulta_actualizar->execute();


//maximaPuntuacion
$consulta_preparada = $mysqli->query("SELECT idJugador, maximaPuntuacion from setjuegos.jugador where UPPER(nombre)='$apodo'");
if ($consulta_preparada->num_rows > 0) {
  while ($row = $consulta_preparada->fetch_assoc()) {
    $idJugador = $row["idJugador"];
    $maximaPuntuacion = $row["maximaPuntuacion"];
  }
}

$puntuacion = $_POST['puntuacion'];

if ($puntuacion > $maximaPuntuacion) {
  $maximaPuntuacion = $puntuacion;
}

$consulta_actualizar = $mysqli->prepare("UPDATE setjuegos.jugador SET maximaPuntuacion = ? WHERE idJugador = ?");
$consulta_actualizar->bind_param("di", $maximaPuntuacion, $idJugador);
$consulta_actualizar->execute();

//monedas
if($idJuego == 5){
  if($puntuacion <= 5 && $puntuacion >0){
    $moneda = 2;
  }else if($puntuacion > 5 && $puntuacion <= 15){
    $moneda = 10;
  }else if($puntuacion > 15 && $puntuacion <= 30){
    $moneda = 60;
  }else if($puntuacion > 30 && $puntuacion <= 50){
    $moneda = 100;
  }else{
    $moneda = 200;
  }
}

if($idJuego == 4){
  if($puntuacion == 0 || $puntuacion <= 5){
    $moneda = 0;
  }else if($puntuacion > 5 && $puntuacion <= 10){
    $moneda = 5;
  }else if($puntuacion > 10 && $puntuacion <= 30){
    $moneda = 20;
  }elseif($puntuacion > 30 && $puntuacion <= 50){
    $moneda = 30;
  }else if($puntuacion > 50 && $puntuacion <= 70){
    $moneda = 50;
  }else if($puntuacion > 70  && $puntuacion <= 90){
    $moneda = 70;
  }else if($puntuacion > 90 && $puntuacion <= 150){
    $moneda = 100;
  }else{
    $moneda = 200;
  }
}

if($idJuego == 3){

  if($puntuacion < 200 || $puntuacion == 0){
    $moneda = 0;
  }else if($puntuacion <= 500 && $puntuacion > 200){
    $moneda = 20;
  }else if($puntuacion > 500 && $puntuacion <= 1600){
    $moneda = 80;
  }else if($puntuacion > 1600 && $puntuacion <= 3000){
    $moneda = 100;
  }else{
    $moneda = 200;
  }
}

if($idJuego == 2){
  if($puntuacion <= 100 && $puntuacion > 0){
    $moneda = 10;
  }else if($puntuacion > 100 && $puntuacion <= 300){
    $moneda = 20;
  }else if($puntuacion == 0){
    $moneda = 0;
  }else{
    $moneda = 80;
  }
}

if($idJuego == 1){
  if($puntuacion == 0){
    $moneda = 0;
  }else if($puntuacion <= 800 && $puntuacion > 0){
    $moneda = 50;
  }else if($puntuacion > 800 && $puntuacion <= 5000){
    $moneda = 100;
  }else{
    $moneda = 200;
  }
}

$monedasNuevas;
$monedasJugador;

$consulta_monedas = $mysqli->query("SELECT monedas FROM jugador WHERE idJugador = $idJugador");
if ($consulta_monedas->num_rows > 0) {
  // Obtener el valor de las monedas del primer resultado
  $row = $consulta_monedas->fetch_assoc();
  $monedasJugador = $row["monedas"];
}

$monedasNuevas = $moneda + $monedasJugador;

$consulta_actualizar = $mysqli->prepare("UPDATE setjuegos.jugador SET monedas = ? WHERE idJugador = ?");
$consulta_actualizar->bind_param("ii", $monedasNuevas, $idJugador);
$consulta_actualizar->execute();

$consulta_preparada->close();
$consulta_actualizar->close();
$mysqli->close();
?>
