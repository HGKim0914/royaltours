<?php
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    //Getting input from javascript
    include('./DatabaseHelper.php');

    if($mysqli){
        if(isset($_POST['restaurant']) && isset($_POST['tourcode'])){
            $rest = $_POST['restaurant'];
            $tourcode = $_POST['tourcode'];

            for($idx = 0; $idx < count($rest); $idx++){
                $restname = $rest[$idx][0];
                if($rest[$idx][1] === "") $restid = 'NULL';
                else  $restid = $rest[$idx][1];
                
                if($rest[$idx][2] === "") $restamount = 'NULL';
                else $restamount = $rest[$idx][2];
                
                if($rest[$idx][3] === "") $restnumpax = 'NULL';
                else $restnumpax = $rest[$idx][3];

                if($rest[$idx][4] === ""){
                    $query = "INSERT INTO tour_restaurant(tourcode, restid, restday, restpaytype, restnumpax, restamount) 
                            VALUES ('$tourcode', $restid, '$restname', NULL, $restnumpax, $restamount)
                            ON DUPLICATE KEY UPDATE restid = $restid, restpaytype = NULL, restnumpax = $restnumpax, restamount = $restamount";
                }else{
                    $restpaymentmethod = $rest[$idx][4];
                    $query = "INSERT INTO tour_restaurant(tourcode, restid, restday, restpaytype, restnumpax, restamount)
                                VALUES ('$tourcode', $restid, '$restname', '$restpaymentmethod', $restnumpax, $restamount)
                                ON DUPLICATE KEY UPDATE restid = $restid, restpaytype = '$restpaymentmethod', restnumpax = $restnumpax, restamount = $restamount";
                }
                
                $qresult = mysqli_query($mysqli, $query);
                if(!$qresult) {
                    echo json_encode($query);
                }
            }
        }
    }
?>