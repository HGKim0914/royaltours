<?php
    include('./DBFunctions.php');
    if(!$mysqli) exit;      //check database connection
    
    if(isset($_POST['param'])){
        $tourcode = $_POST['param'];
        $tables = array(
            "tour", 
            "tour_additionalnote", 
            "tour_uploaderinfo", 
            "tour_admission", 
            "tour_carrental", 
            "tour_honeybeef", 
            "tour_hotel",
            "tour_inboundtip", 
            "tour_localtip", 
            "tour_minusfactor", 
            "tour_misexpense", 
            "tour_option", 
            "tour_plusfactor", 
            "tour_restaurant", 
            "tour_shopping",
            "tour_tourprofit"
        );

        $success = true;
        foreach($tables as $table){
            $query = "DELETE FROM $table WHERE tourcode = '$tourcode'";
            $qresult = mysqli_query($mysqli, $query);
            if(!$qresult) $success = false;
        }
        echo json_encode($success);
    }
?>