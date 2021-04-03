<?php
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    include('./DatabaseHelper.php');

    if($mysqli){
        if(isset($_POST['tourcode']))
        {
            $tourcode = $_POST['tourcode'];
            $query = "SELECT amount FROM tour_tourprofit WHERE tourcode = '$tourcode'";
            $qresult = mysqli_query($mysqli, $query);
            if($qresult){
                $count = mysqli_num_rows($qresult);
                if($count > 0){
                    for($idx = 0; $idx < $count; $idx++){
                        $row[$idx] = mysqli_fetch_row($qresult);
                    }
                    echo json_encode($row);
                }
            }else{
                echo json_encode(false);
            }
        }else{
            echo json_encode(false);
        }
    }else{
        echo json_encode(false);
    }
?>