<?php
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    include('./DatabaseHelper.php');
    if($mysqli){
        if(isset($_POST['data'])){
            $data = $_POST['data'];
            $row = [];
            for($idx = 0; $idx < count($data); $idx++){
                $tourcode = $data[$idx][0];
                $query = "SELECT p.tourcode, p.amount, tour.startdate, tour.inboundlocal
                    FROM tour_tourprofit AS p, tour 
                    WHERE p.tourcode = '$tourcode' AND p.tourcode = tour.tourcode";
                $qresult = mysqli_query($mysqli, $query);
                if($qresult){
                    $count = mysqli_num_rows($qresult);
                    if($count > 0){
                        for($ind = 0; $ind < $count; $ind++){
                            array_push($row, mysqli_fetch_row($qresult));
                        }
                    }
                }else{
                    echo json_encode($query);
                }
            }
            echo json_encode($row);
        }
    }else{
        echo json_encode(false);
    }
?>