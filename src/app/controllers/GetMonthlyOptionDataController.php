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
                $query = "SELECT o.tourcode, o.id, o.companyprofit, tour.startdate
                    FROM tour_option AS o, tour
                    WHERE o.tourcode = '$tourcode' AND o.tourcode = tour.tourcode";
                $qresult = mysqli_query($mysqli, $query);
                if($qresult){
                    $count = mysqli_num_rows($qresult);
                    if($count > 0){
                        for($ind = 0; $ind < $count; $ind++){
                            array_push($row, mysqli_fetch_row($qresult));
                        }
                    }
                }else{
                    echo json_encode(false);
                }
            }
            echo json_encode($row);
        }
    }else{
        echo json_encode(false);
    }
?>