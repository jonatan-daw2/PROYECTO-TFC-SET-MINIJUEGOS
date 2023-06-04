<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Sesion</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../proyecto/bootstrap/bootstrap.min.css">
    <script src="../proyecto/js/app4.js"></script>
    <link rel="stylesheet" href="../proyecto/css/sesion.css">
  </head>
  <style>
    body {
      overflow: hidden;
    }

    .center {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .card {
      background-color: rgba(191, 85, 236, 0.8);
      border: none;
      border-radius: 10px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }

    .card-img-top {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 10px 10px 0 0;
    }

    .card-body {
      padding: 20px;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .card-title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .card-text {
      font-size: 16px;
      margin-bottom: 20px;
    }

    .btn-primary {
      background-color: #fff;
      color: #BF55EC;
      border: none;
      border-radius: 5px;
      padding: 8px 16px;
      font-size: 16px;
      cursor: pointer;
    }

    .play-button {
      margin-top: auto;
    }
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
      <a class='navbar-brand' href='sesion.php'>
        Set Juegos
      </a>
      <ul class='navbar-nav'>
        <li class='nav-item'>
          <a class='nav-link' href='#' id='top'>RANKING</a>
        </li>
      </ul>
      <form action='sesion.php' method='post' class='ms-auto'>
        <button class='btn-lg' id='out' type='submit'>LogOut</button>
      </form>
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
            <a href="../proyecto/juego/tetris/tetris.html" class="btn btn-primary play-button">PLAY</a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <img src="imagenes/pacman.png" class="card-img-top" alt="Image 2">
          <div class="card-body">
            <h5 class="card-title">Pacman</h5>
            <p class="card-text">Let's play!</p>
            <a href="../proyecto/juego/pacman/pacman.html" class="btn btn-primary play-button">PLAY</a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <img src="imagenes/dinosaur.png" class="card-img-top" alt="Image 3">
          <div class="card-body">
            <h5 class="card-title">Dinosaur</h5>
            <p class="card-text">Let's play!</p>
            <a href="../proyecto/juego/DinosaurGame/dinosaur.html" class="btn btn-primary play-button">PLAY</a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <img src="imagenes/snake.png" class="card-img-top" alt="Image 4">
          <div class="card-body">
            <h5 class="card-title">Snake</h5>
            <p class="card-text">Let's play!</p>
            <a href="../proyecto/juego/snake/prueba3.html" class="btn btn-primary play-button">PLAY</a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <img src="imagenes/flappy.png" class="card-img-top" alt="Image 5">
          <div class="card-body">
            <h5 class="card-title">FlappyBird</h5>
            <p class="card-text">Let's play!</p>
            <a href="../proyecto/juego/flappyBird/flappyBird.html" class="btn btn-primary play-button">PLAY</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <p style='display:none;' id="respuesta"></p>
  <p style='display:none;' id="ranking"></p>

  <script src="../proyecto/bootstrap/jquery-3.2.1.slim.min.js"></script>
  <script src="../proyecto/bootstrap/bootstrap.min.js"></script>
  </body>
</html>
