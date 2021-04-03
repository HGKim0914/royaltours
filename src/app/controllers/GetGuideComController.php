<?php
    include('./DBFunctions.php');
    if(!$mysqli) exit;
    
    if(isset($_POST['param'])){
        $param = $_POST['param'];

        $result = getData("guide_com", "*", "userID = '".$param."'", $mysqli);
        
        echo json_encode($result);
    }

?>