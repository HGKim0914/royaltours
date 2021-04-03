<?php
    include('./DBFunctions.php');
    if(!$mysqli) exit;      //check database connection
 
    if(isset($_POST['param'])){
        $param = $_POST['param'];
        $tourcode = $param;

        $result = update("tour", "tour.sent=0", "tourcode='".$tourcode."'", $mysqli);
        echo json_encode($result);
    }
?>