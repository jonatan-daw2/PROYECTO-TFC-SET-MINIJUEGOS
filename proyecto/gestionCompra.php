<?php
    function gestionCompra($productoSeleccionado, $idJugador){
        $base = "setjuegos";
        $usuario = "Jonny";
        $pass = "Ch0k0l4t3";
        $local = "localhost";

        $precioProducto = 0;
        $monedasJugador = 0;

        $mysqli = new mysqli($local, $usuario, $pass, $base);
        if ($mysqli->connect_errno) {
            die("Error al conectar con la base de datos: " . $mysqli->connect_error);
        }
        //Comprobamos si ya ha hecho la compra del producto
        $consulta_compra = $mysqli->query("SELECT idCompra from setjuegos.compra where idJugador='$idJugador' AND idProducto='$productoSeleccionado';");
        if ($consulta_compra->num_rows > 0) {
            echo '<h1 style="color: orange;">Ya tienes este producto</h1>';
            echo "<a href='tienda.php'>Volver a la tienda</a>";
        } else {
            //echo "puedes comprarlo";
            $consulta_compra =  $mysqli->query("SELECT precio from setjuegos.tienda where idProducto='$productoSeleccionado';");
            if ($consulta_compra->num_rows > 0) {
                while ($row = $consulta_compra->fetch_assoc()) {
                    $precioProducto = $row["precio"];
                }
            }

            $consulta_compra =  $mysqli->query("SELECT monedas from setjuegos.jugador where idJugador='$idJugador';");
            if ($consulta_compra->num_rows > 0) {
                while ($row = $consulta_compra->fetch_assoc()) {
                    $monedasJugador = $row["monedas"];
                }
            }

            if ($precioProducto <= $monedasJugador) {
                $monedasJugador = $monedasJugador - $precioProducto;

                $consulta_compra = $mysqli->prepare("INSERT INTO setjuegos.compra (idJugador, idProducto) VALUES (?,?)");
                $consulta_compra->bind_param("ii", $idJugador, $productoSeleccionado);
                $consulta_compra->execute();

                $consulta_compra = $mysqli->prepare("UPDATE setjuegos.jugador SET monedas = ? WHERE idJugador = ?");
                $consulta_compra->bind_param("ii", $monedasJugador, $idJugador);
                $consulta_compra->execute();

                $skinSinElegir = false;
                $consulta_compra = $mysqli->prepare("INSERT INTO setjuegos.skins (idJugador, idProducto, skinSeleccionada) VALUES ('$idJugador','$productoSeleccionado','$skinSinElegir')");
                $consulta_compra->execute();

                echo '<h1 style="color: green;">Compra Hecha</h1>';
                echo "<a href='tienda.php'>Volver a la tienda</a>";
            }else{
                echo '<h1 style="color: red;">No tienes suficiente crédito</h1>';
                echo "<a href='tienda.php'>Volver a la tienda</a>";
            }
        }
    }
