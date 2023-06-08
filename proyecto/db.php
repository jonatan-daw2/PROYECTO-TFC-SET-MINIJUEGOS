<?php
define("BASE", "setjuegos");
define("USUARIO", "Jonny");
define("PASSWORD", "Ch0k0l4t3");
define("LOCALHOST", "localhost");

$mysqli = new mysqli(LOCALHOST, USUARIO, PASSWORD, BASE);
if ($mysqli->connect_errno) {
  die("Error al conectar con la base de datos: " . $mysqli->connect_error);
}
?>