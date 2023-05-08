<?php
    function filtrado($texto){
        $texto = htmlspecialchars($texto);
        $texto = stripslashes($texto);
        $texto = trim($texto);
        return $texto;
    }
?>