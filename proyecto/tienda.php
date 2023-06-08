<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Sesion</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../proyecto/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="../proyecto/css/tienda.css">
</head>

<body id="juegos">
    <?php
    include("db.php");
    session_start();


    $apodo = $_SESSION["apodo"];
    $productos = array();
    $monedas;
    $idJugador;
    $productoSeleccionado;

    $consulta_tabla = $mysqli->query("SELECT imagen, idProducto, precio FROM tienda ORDER BY idProducto");

    if ($consulta_tabla->num_rows > 0) {
        while ($row = $consulta_tabla->fetch_assoc()) {
            $producto = array(
                'imagen' => $row['imagen'],
                'idProducto' => $row['idProducto'],
                'precio' => $row['precio']
            );
            $productos[] = $producto;
        }
    }

    $consulta_tabla = $mysqli->query("SELECT monedas from setjuegos.jugador where UPPER(nombre)='$apodo';");
    if ($consulta_tabla->num_rows > 0) {
        while ($row = $consulta_tabla->fetch_assoc()) {
            $monedas = $row["monedas"];
        }
    }

    $consulta_tabla = $mysqli->query("SELECT idJugador from setjuegos.jugador where UPPER(nombre)='$apodo';");
    if ($consulta_tabla->num_rows > 0) {
        while ($row = $consulta_tabla->fetch_assoc()) {
            $idJugador = $row["idJugador"];
        }
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // foreach($productos as $producto){
        //     if($producto["idProductos"] == $productoSeleccionado){
        //         echo "Selecionaste: " + $producto["idProductos"];
        //     }
        // }
        if (isset($_POST["productoSeleccionado"])) {
            $productoSeleccionado = $_POST["productoSeleccionado"];
            $idJugador;
            include_once("gestionCompra.php");
            if (
                $productoSeleccionado == 1 || $productoSeleccionado == 2 || $productoSeleccionado == 3 || $productoSeleccionado == 4 ||
                $productoSeleccionado == 5 || $productoSeleccionado == 6 || $productoSeleccionado == 7 || $productoSeleccionado == 8 ||
                $productoSeleccionado == 9 || $productoSeleccionado == 10 || $productoSeleccionado == 11
            ) {
                gestionCompra($productoSeleccionado, $idJugador);
            }
        } else {
            echo "No se ha seleccionado ningún producto.";
        }
    } else {

        //echo '<img src="data:image/png;base64,' . base64_encode($imagen) . '" class="card-img-top" alt="Image 1" style="max-width: 100px; height: 100px;">';
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
                        <a class='nav-link' href='juegos.php' id='jugar'>JUGAR</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="monedas">MONEDAS:&nbsp;<?php echo $monedas ?></a>
                    </li>
                </ul>
            </div>
        </nav>
        <form action="tienda.php" method="post" id="formu">
            <div class="container">
                <h2>Snake Game</h2>
                <div class="row">
                    <div class="col-md-4">
                        <div class="card">
                            <img src="<?php echo 'data:image/png;base64,' . base64_encode($productos[0]["imagen"]) ?>" class="card-img-top" alt="Image 1" style="max-width: 100px; height: 100px;">
                            <div class="card-body">
                                <h5 class="card-title">Snake & Apple</h5>
                                <p class="card-text">Snake: Skin morada y manzana azul.</p>
                                <p class="card-text"><?php echo "Precio: " . $productos[0]['precio'] ?></p>
                                <button type="submit" name="productoSeleccionado" value=1 class="btn btn-primary">BUY</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <img src="<?php echo 'data:image/png;base64,' . base64_encode($productos[1]["imagen"]) ?>" class="card-img-top" alt="Image 1" style="max-width: 100px; height: 100px;">
                            <div class="card-body">
                                <h5 class="card-title">Sanke & Apple</h5>
                                <p class="card-text">Snake: Skin amarilla y manzana morada.</p>
                                <p class="card-text"><?php echo "Precio: " . $productos[1]['precio'] ?></p>
                                <button type="submit" name="productoSeleccionado" value=2 class="btn btn-primary">BUY</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <img src="<?php echo 'data:image/png;base64,' . base64_encode($productos[2]["imagen"]) ?>" class="card-img-top" alt="Image 1" style="max-width: 100px; height: 100px;">
                            <div class="card-body">
                                <h5 class="card-title">Sanke & Apple</h5>
                                <p class="card-text">Snake: Skin azul y manzana verde.</p>
                                <p class="card-text"><?php echo "Precio: " . $productos[2]['precio'] ?></p>
                                <button type="submit" name="productoSeleccionado" value=3 class="btn btn-primary">BUY</button>
                            </div>
                        </div>
                    </div>
                </div>

                <h2>Pacman Game</h2>
                <div class="row">
                    <div class="col-md-4">
                        <div class="card">
                            <img src="<?php echo 'data:image/png;base64,' . base64_encode($productos[3]["imagen"]) ?>" class="card-img-top" alt="Image 1" style="max-width: 100px; height: 100px;">
                            <div class="card-body">
                                <h5 class="card-title">Pacman</h5>
                                <p class="card-text">Pacaman: Skin verde.</p>
                                <p class="card-text"><?php echo "Precio: " . $productos[3]['precio'] ?></p>
                                <button type="submit" name="productoSeleccionado" value=4 class="btn btn-primary">BUY</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <img src="<?php echo 'data:image/png;base64,' . base64_encode($productos[4]["imagen"]) ?>" class="card-img-top" alt="Image 1" style="max-width: 100px; height: 100px;">
                            <div class="card-body">
                                <h5 class="card-title">Pacman</h5>
                                <p class="card-text">Pacaman: Skin morada.</p>
                                <p class="card-text"><?php echo "Precio: " . $productos[4]['precio'] ?></p>
                                <button type="submit" name="productoSeleccionado" value=5 class="btn btn-primary">BUY</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <img src="<?php echo 'data:image/png;base64,' . base64_encode($productos[5]["imagen"]) ?>" class="card-img-top" alt="Image 1" style="max-width: 100px; height: 100px;">
                            <div class="card-body">
                                <h5 class="card-title">Pacman</h5>
                                <p class="card-text">Pacaman: Skin azul.</p>
                                <p class="card-text"><?php echo "Precio: " . $productos[5]['precio'] ?></p>
                                <button type="submit" name="productoSeleccionado" value=6 class="btn btn-primary">BUY</button>
                            </div>
                        </div>
                    </div>
                </div>

                <h2>FlappyBird Game</h2>
                <div class="row">
                    <div class="col-md-4">
                        <div class="card">
                            <img src="<?php echo 'data:image/png;base64,' . base64_encode($productos[6]["imagen"]) ?>" class="card-img-top" alt="Image 1" style="max-width: 100px; height: 100px;">
                            <div class="card-body">
                                <h5 class="card-title">FlappyBird</h5>
                                <p class="card-text">FlappyBird: Skin sepia.</p>
                                <p class="card-text"><?php echo "Precio: " . $productos[6]['precio'] ?></p>
                                <button type="submit" name="productoSeleccionado" value=7 class="btn btn-primary">BUY</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <img src="<?php echo 'data:image/png;base64,' . base64_encode($productos[7]["imagen"]) ?>" class="card-img-top" alt="Image 1" style="max-width: 100px; height: 100px;">
                            <div class="card-body">
                                <h5 class="card-title">FlappyBird</h5>
                                <p class="card-text">FlappyBird: Skin zeke.</p>
                                <p class="card-text"><?php echo "Precio: " . $productos[7]['precio'] ?></p>
                                <button type="submit" name="productoSeleccionado" value=8 class="btn btn-primary">BUY</button>
                            </div>
                        </div>
                    </div>
                </div>
        </form>
        <h2>Dinosaur Game</h2>
        <div class="row">
            <div class="col-md-4">
                <div class="card">
                    <img src="<?php echo 'data:image/png;base64,' . base64_encode($productos[8]["imagen"]) ?>" class="card-img-top" alt="Image 1" style="max-width: 100px; height: 100px;">
                    <div class="card-body">
                        <h5 class="card-title">Dinsosaur</h5>
                        <p class="card-text">Dinosaur: Skin azul.</p>
                        <p class="card-text"><?php echo "Precio: " . $productos[8]['precio'] ?></p>
                        <button type="submit" name="productoSeleccionado" value=9 class="btn btn-primary">BUY</button>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <img src="<?php echo 'data:image/png;base64,' . base64_encode($productos[9]["imagen"]) ?>" class="card-img-top" alt="Image 1" style="max-width: 100px; height: 100px;">
                    <div class="card-body">
                        <h5 class="card-title">Dinosaur</h5>
                        <p class="card-text">Dinosaur: Skin verde.</p>
                        <p class="card-text"><?php echo "Precio: " . $productos[9]['precio'] ?></p>
                        <button type="submit" name="productoSeleccionado" value=10 class="btn btn-primary">BUY</button>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <img src="<?php echo 'data:image/png;base64,' . base64_encode($productos[10]["imagen"]) ?>" class="card-img-top" alt="Image 1" style="max-width: 100px; height: 100px;">
                    <div class="card-body">
                        <h5 class="card-title">Dinosaur</h5>
                        <p class="card-text">Dinosaur: Skin rosa.</p>
                        <p class="card-text"><?php echo "Precio: " . $productos[10]['precio'] ?></p>
                        <button type="submit" name="productoSeleccionado" value=11 class="btn btn-primary">BUY</button>
                    </div>
                </div>
            </div>
        </div>

        </div>
    <?php } ?>

    <script src="../proyecto/bootstrap/jquery-3.2.1.slim.min.js"></script>
    <script src="../proyecto/bootstrap/bootstrap.min.js"></script>
</body>

</html>