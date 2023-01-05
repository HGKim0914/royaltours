<?php
    //SHOPPING COM DISPLAY
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    //Getting input from javascript
    // include('../helper/DatabaseHelper.php');
    include('./DatabaseHelper.php');
    
    if($mysqli){
        $query = "SELECT tour.startdate, tour.tourcode, users.name, tour.inboundlocal, tour.confirmation, tour.sent FROM tour, users WHERE tour.guideid = users.id ORDER BY case when tour.sent = false then 1 else 2 end, tour.startdate DESC";
        $qresult = mysqli_query($mysqli, $query);
        $count = mysqli_num_rows($qresult);

        if($count == 0){
            echo json_encode(false);
        }else{
            for($idx = 0; $idx < $count; $idx++){
                $row[$idx] = mysqli_fetch_row($qresult);
            }

            echo json_encode($row);
        }
    }
?>