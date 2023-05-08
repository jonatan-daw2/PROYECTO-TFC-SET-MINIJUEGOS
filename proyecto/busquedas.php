<?php

    if(isset($_GET["usu"])){
         $_GET["usu"];
    }
   
    function comprobacion($usu){
        $base = "tetris";
        $usuario = "Jonny";
        $pass = "Ch0k0l4t3";
        $local = "localhost";
        $usu = strtoupper($usu);

        $nombre = 0;
        $apellidos = 0;
        $edad = 0;
        $apodo = 0;
        $idUsuario = 0;
        $nivel = 0;

        $datosJugadores = [];
        $apodosJugadores = [];

        $mysqli = new mysqli($local,$usuario,$pass,$base);
        if($usu != ""){
            $consulta_tabla = $mysqli->query("SELECT nombre,apellidos,apodo,edad,idUsuario from usuario where UPPER(apodo)='$usu'");
            if($consulta_tabla->num_rows){
                while($row = $consulta_tabla->fetch_assoc()){
                    $nombre = $row["nombre"];
                    $apellidos = $row["apellidos"];
                    $apodo = $row["apodo"];
                    $edad = $row["edad"];
                    $idUsuario = $row["idUsuario"];
                }

                $consulta_tabla = $mysqli->query("SELECT nivel from jugador where idUsuario='$idUsuario'");
                if($consulta_tabla->num_rows > 0){
                    while($row = $consulta_tabla->fetch_assoc()){
                        $nivel= $row["nivel"];
                    }
                }

                echo "<table id='tabla'>";
                echo "<thead>";
                echo '<tr>
                <th align="center">Nombre</th>
                <th align="center">Apellidos</th>
                <th align="center">Apodo</th>
                <th align="center">Edad</th>
                <th align="center">Nivel</th>
                </tr>
                </thead>';
                echo "<tbody>";
                    echo "<tr>";
                    echo "<td align='center'>$nombre</td>";
                    echo "<td align='center'>$apellidos</td>";
                    echo "<td align='center'>$apodo</td>";
                    echo "<td align='center'>$edad</td>";
                    echo "<td align='center'>$nivel</td>";
                    echo "</tr>";
                echo "</tbody>";
                
            }else{
                echo "";
            }
        }else{
            $consulta_tabla = $mysqli->query("SELECT idUsuario,maximaPuntuacion from jugador order by maximaPuntuacion DESC LIMIT 3");
            if($consulta_tabla->num_rows > 0){
                while($row = $consulta_tabla->fetch_assoc()){
                    $datosJugadores[] = $row["idUsuario"];
                    $datosJugadores[] = $row["maximaPuntuacion"];
                }
                //0 d 2 c 4 c 
                for($i=0;$i<count($datosJugadores);$i++){
                    if($i==0 || $i%2==0){
                        $consulta_tabla = $mysqli->query("SELECT apodo from usuario where idUsuario = '$datosJugadores[$i]'");
                        if($consulta_tabla->num_rows > 0){
                            while($row = $consulta_tabla->fetch_assoc()){
                                $apodosJugadores[] = $row["apodo"];
                            }
                        }
                    }
                }

                $cont = 1;
                
                echo "<table id='tabla'>";
                echo "<thead>";
                echo '<tr>
                <th align="center">Apodo</th>
                <th align="center">Puntuacion</th>
                </tr>
                </thead>';
                echo "<tbody>";
                
                for($i=0; $i<count($apodosJugadores); $i++){
                    echo "<tr>";
                    echo "<td align='center'>$apodosJugadores[$i]</td>";
                    echo "<td align='center'>$datosJugadores[$cont]</td>";
                    echo "</tr>";
                    $cont += 2;
                }
               
                echo "</tbody>";
            }
            
        }
        
   }
?>

<html>
<head>
    <style>
        #tabla{
            border: 1px solid black;
            background-color: rgba(52, 58, 64, 0.8);
            color: violet;
            border-radius: 5px;
            margin-left: auto;
            margin-right: auto;
        }
    </style>
<body>
    <p style="display: none"><?php comprobacion($_GET["usu"])?></p>
</body>
</head>
</html>