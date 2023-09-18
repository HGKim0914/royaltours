<?php
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    include('./DatabaseHelper.php');

    if($mysqli){
        if(isset($_POST['startdate']) && isset($_POST['enddate']) && isset($_POST['guideId'])){
            $startdate = $_POST['startdate']."-01";
            $enddateTemp = $_POST['enddate']."-01";
            $enddate = date("Y-m-t", strtotime($enddateTemp));
            $guide = $_POST['guideId'];

            if($guide == "all"){
                $query = "SELECT tourcode, inboundlocal FROM tour WHERE startdate >= '$startdate' AND startdate <= '$enddate' AND confirmation = 1"; //Confirm requires
            }else{
                $query = "SELECT tourcode, inboundlocal FROM tour WHERE startdate >= '$startdate' AND startdate <= '$enddate' AND confirmation = 1 AND guideid = '$guide'"; 
            }

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
                echo json_encode($query);
            }
        }
    }else{
        echo json_encode(false);
    }
?>