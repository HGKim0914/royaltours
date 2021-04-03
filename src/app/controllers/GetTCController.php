<?php
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    include('./DatabaseHelper.php');

    if($mysqli){
        $query = "SELECT com FROM tccom WHERE id = 1";
        $qresult = mysqli_query($mysqli, $query);
        $count = mysqli_num_rows($qresult);

        for($idx = 0; $idx < $count; $idx++){
            $row[$idx] = mysqli_fetch_row($qresult);
        }

        if($qresult){
            echo json_encode($row);
        }else{
            echo json_encode("failed");
        }
    }
?>