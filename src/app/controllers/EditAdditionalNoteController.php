<?php
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    //Getting input from javascript
    include('./DatabaseHelper.php');

    if($mysqli){
        if(isset($_POST['note']) && isset($_POST['tourcode'])){
            $tourcode = $_POST['tourcode'];

            if($_POST['note'] !== null) $note = "'".$_POST['note']."'";
            else $note = 'NULL';

            $query = "INSERT INTO tour_additionalnote VALUES ('$tourcode', $note) 
            ON DUPLICATE KEY UPDATE note = $note";
            
            $qresult = mysqli_query($mysqli, $query);

            if(!$qresult) {
                echo json_encode($query);
            }
        }
    }
?>