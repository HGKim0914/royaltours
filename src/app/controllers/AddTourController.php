<?php 
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");
    
    // include('../helper/DatabaseHelper.php');
    include('./DatabaseHelper.php');
    
    if($mysqli){
        if(isset($_POST['tourcode']) && isset($_POST['startDate']) && isset($_POST['endDate']) && 
        isset($_POST['guide']) && isset($_POST['inbound']) && isset($_POST['land'])){
            $tourcode = $_POST['tourcode'];
            $startdate = $_POST['startDate'];
            $enddate = $_POST['endDate'];
            $guide = $_POST['guide'];
            $inbound = $_POST['inbound'];
            $land = $_POST['land'];

            //투어코드가 이미 존재한다면
            $query = "SELECT tourcode FROM tour WHERE tourcode = '$tourcode'";
            $qresult = mysqli_query($mysqli, $query);
            $count = mysqli_num_rows($qresult);

            if($count > 0){
                echo json_encode(2); // tour already exists
                exit;
            }else{
                if($land == "-"){
                    $query = "INSERT INTO tour VALUES('$tourcode', '$startdate', '$enddate', '$guide', NULL, NULL, NULL, NULL, NULL, '$inbound', false, false)";
                }else{
                    $query = "INSERT INTO tour VALUES('$tourcode', '$startdate', '$enddate', '$guide', $land, NULL, NULL, NULL, NULL, '$inbound', false, false)";
                }
    
                $qresult = mysqli_query($mysqli, $query);
    
                if(!$qresult){
                    echo json_encode(1); // fail
                    exit;
                }else{
                    if(isset($_POST['uploader'])){
                        $id = $_POST['uploader'];
                        $dt = new DateTime('now', new DateTimezone('America/Vancouver'));
                        $date = $dt->format("Y-m-d H:i:s");

                        $query = "INSERT INTO tour_uploaderinfo VALUES('$tourcode', '$id', '$date')";
                        $qresult = mysqli_query($mysqli, $query);
                        if(!$qresult){
                            echo json_encode(4);
                            exit;
                        }
                    }
                    echo json_encode(3); //successfully added tour
                    exit;
                }
            }
        }
    }
    
?>