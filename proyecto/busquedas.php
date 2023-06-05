<?php

if (isset($_GET["usu"])) {
    $_GET["usu"];
}

$busqueda = false;

function tabla5($usu, &$busqueda){
    $base = "setjuegos";
    $usuario = "Jonny";
    $pass = "Ch0k0l4t3";
    $local = "localhost";
    $usu = strtoupper($usu);
    $nombre = 0;
    $nivel = 0;
    $partidasTotales = 0;
    $mediaPuntos = 0;
    $maximaPuntuacion = 0;

    $datosPartidas = [];

    $mysqli = new mysqli($local, $usuario, $pass, $base);
    if ($usu != "") {
        $consulta_tabla = $mysqli->query("SELECT nombre,nivel,partidasTotales,mediaPuntos,maximaPuntuacion from setjuegos.jugador where UPPER(nombre)='$usu'");
        if ($consulta_tabla->num_rows > 0) {
            while ($row = $consulta_tabla->fetch_assoc()) {
                $nombre = $row["nombre"];
                $nivel = $row["nivel"];
                $partidasTotales = $row["partidasTotales"];
                $mediaPuntos = $row["mediaPuntos"];
                $maximaPuntuacion = $row["maximaPuntuacion"];
            }

            echo "<table id='tabla'>";
            echo "<thead>";
            echo '<tr>
                <th align="center">Apodo</th>
                <th align="center">Nivel</th>
                <th align="center">Numero de partidas</th>
                <th align="center">Media de puntos</th>
                <th align="center">Maxima puntuacion</th>
                </tr>
                </thead>';
            echo "<tbody>";
            echo "<tr>";
            echo "<td align='center'>$nombre</td>";
            echo "<td align='center'>$nivel</td>";
            echo "<td align='center'>$partidasTotales</td>";
            echo "<td align='center'>$mediaPuntos</td>";
            echo "<td align='center'>$maximaPuntuacion</td>";
            echo "</tr>";
            echo "</tbody>";

            $busqueda = true;
        } else {
            echo "";
            $busqueda = true;
        }
    } else {
        if($busqueda == false){
            $consulta_tabla = $mysqli->query("SELECT j.nombre AS nombre_juego, ju.nombre AS nombre_jugador, p.puntuacion
                                                FROM juego j
                                                INNER JOIN puntuaciones p ON j.idJuego = p.idJuego
                                                INNER JOIN jugador ju ON p.idJugador = ju.idJugador
                                                WHERE j.idJuego = 5
                                                ORDER BY p.puntuacion DESC
                                                LIMIT 10");
            if ($consulta_tabla->num_rows > 0) {
                echo "<table id='tabla1'>";
                echo "<thead>";
                echo '<tr>'.
                        '<th id="titulo" align="center">FlappyBird</th>'.
                     '<tr>';
                echo '<tr>
                    <th align="center">Jugador</th>
                    <th align="center">Puntuacion</th>
                    </tr>
                    </thead>';
                echo "<tbody>";
                while ($row = $consulta_tabla->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td align='center'>" . $row['nombre_jugador'] . "</td>";
                    echo "<td align='center'>" . $row['puntuacion'] . "</td>";
                    echo "</tr>";
                }
                echo "</tbody>";
            }

            $consulta_tabla = $mysqli->query("SELECT j.nombre AS nombre_juego, ju.nombre AS nombre_jugador, p.puntuacion
                                                FROM juego j
                                                INNER JOIN puntuaciones p ON j.idJuego = p.idJuego
                                                INNER JOIN jugador ju ON p.idJugador = ju.idJugador
                                                WHERE j.idJuego = 4
                                                ORDER BY p.puntuacion DESC
                                                LIMIT 10");
            if ($consulta_tabla->num_rows > 0) {
                echo "<table id='tabla2'>";
                echo "<thead>";
                echo '<tr>'.
                        '<th id="titulo" align="center">Snake</th>'.
                     '<tr>';
                echo '<tr>
                        <th align="center">Jugador</th>
                        <th align="center">Puntuacion</th>
                    </tr>
                    </thead>';
                echo "<tbody>";
                while ($row = $consulta_tabla->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td align='center'>" . $row['nombre_jugador'] . "</td>";
                    echo "<td align='center'>" . $row['puntuacion'] . "</td>";
                    echo "</tr>";
                }
                echo "</tbody>";
            }

            $consulta_tabla = $mysqli->query("SELECT j.nombre AS nombre_juego, ju.nombre AS nombre_jugador, p.puntuacion
                                                FROM juego j
                                                INNER JOIN puntuaciones p ON j.idJuego = p.idJuego
                                                INNER JOIN jugador ju ON p.idJugador = ju.idJugador
                                                WHERE j.idJuego = 3
                                                ORDER BY p.puntuacion DESC
                                                LIMIT 10");
            if ($consulta_tabla->num_rows > 0) {
                echo "<table id='tabla3'>";
                echo "<thead>";
                echo '<tr>'.
                        '<th id="titulo" align="center">Dinosaur</th>'.
                     '<tr>';
                echo '<tr>
                        <th align="center">Jugador</th>
                        <th align="center">Puntuacion</th>
                    </tr>
                    </thead>';
                echo "<tbody>";
                while ($row = $consulta_tabla->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td align='center'>" . $row['nombre_jugador'] . "</td>";
                    echo "<td align='center'>" . $row['puntuacion'] . "</td>";
                    echo "</tr>";
                }
                echo "</tbody>";
            }

            $consulta_tabla = $mysqli->query("SELECT j.nombre AS nombre_juego, ju.nombre AS nombre_jugador, p.puntuacion
                                                FROM juego j
                                                INNER JOIN puntuaciones p ON j.idJuego = p.idJuego
                                                INNER JOIN jugador ju ON p.idJugador = ju.idJugador
                                                WHERE j.idJuego = 2
                                                ORDER BY p.puntuacion DESC
                                                LIMIT 10");
            if ($consulta_tabla->num_rows > 0) {
                echo "<table id='tabla4'>";
                echo "<thead>";
                echo '<tr>'.
                        '<th id="titulo" align="center">Pacman</th>'.
                     '<tr>';
                echo '<tr>
                        <th align="center">Jugador</th>
                        <th align="center">Puntuacion</th>
                    </tr>
                    </thead>';
                echo "<tbody>";
                while ($row = $consulta_tabla->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td align='center'>" . $row['nombre_jugador'] . "</td>";
                    echo "<td align='center'>" . $row['puntuacion'] . "</td>";
                    echo "</tr>";
                }
                echo "</tbody>";
            }

            $consulta_tabla = $mysqli->query("SELECT j.nombre AS nombre_juego, ju.nombre AS nombre_jugador, p.puntuacion
                                                FROM juego j
                                                INNER JOIN puntuaciones p ON j.idJuego = p.idJuego
                                                INNER JOIN jugador ju ON p.idJugador = ju.idJugador
                                                WHERE j.idJuego = 1
                                                ORDER BY p.puntuacion DESC
                                                LIMIT 10");
            if ($consulta_tabla->num_rows > 0) {
                echo "<table id='tabla5'>";
                echo "<thead>";
                echo '<tr>'.
                        '<th id="titulo" align="center">Tetris</th>'.
                     '<tr>';
                echo '<tr>
                        <th align="center">Jugador</th>
                        <th align="center">Puntuacion</th>
                    </tr>
                    </thead>';
                echo "<tbody>";
                while ($row = $consulta_tabla->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td align='center'>" . $row['nombre_jugador'] . "</td>";
                    echo "<td align='center'>" . $row['puntuacion'] . "</td>";
                    echo "</tr>";
                }
                echo "</tbody>";
            }
        }
    }
}
?>

<html>

<head>
    <style>
        th{
            color: cadetblue;
        }

        #titulo{
            color: yellow
        }

        #tabla {
            border: 1px solid black;
            background-color: rgba(52, 58, 64, 0.8);
            color: violet;
            border-radius: 5px;
            margin-left: auto;
            margin-right: auto;
        }

        #tabla1{
            border: 1px solid black;
            background-color: rgba(52, 58, 64, 0.8);
            color: violet;
            border-radius: 5px;
            margin-left: 50px;
            margin-right: auto;
        }

        #tabla2{
            border: 1px solid black;
            background-color: rgba(52, 58, 64, 0.8);
            color: violet;
            border-radius: 5px;
            margin-left: 350px;
            margin-right: auto;
            margin-top: -315px;
        }

        #tabla3{
            border: 1px solid black;
            background-color: rgba(52, 58, 64, 0.8);
            color: violet;
            border-radius: 5px;
            margin-left: 650px;
            margin-right: auto;
            margin-top: -310px;
        }

        #tabla4{
            border: 1px solid black;
            background-color: rgba(52, 58, 64, 0.8);
            color: violet;
            border-radius: 5px;
            margin-left: 950px;
            margin-right: auto;
            margin-top: -286px;
        }

        #tabla5{
            border: 1px solid black;
            background-color: rgba(52, 58, 64, 0.8);
            color: violet;
            border-radius: 5px;
            margin-left: 1250px;
            margin-right: auto;
            margin-top: -230px;
        }
    </style>

<body>
    <p style="display: none"><?php tabla5($_GET["usu"], $busqueda);?></p>
</body>
</head>

</html>