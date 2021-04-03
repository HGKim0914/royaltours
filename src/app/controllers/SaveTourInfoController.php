<?php
    include('./DBFunctions.php');
    if(!$mysqli) exit;      //check database connection

    if(isset($_POST['param'])){
        $param = $_POST['param'];

        $tourcode = $param[0];
        $numpax = $param[1];
        $tc = $param[2];
        $type = $param[3];
        $numroom = $param[4];

        $result = update("tour", "numpax=".$numpax.", numroom=".$numroom.", tc=".$tc.", type='".$type."'", "tourcode='".$tourcode."'", $mysqli);

        echo json_encode($result);
    }
?>