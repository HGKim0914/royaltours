<?php
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    //Getting input from javascript
    include('./DatabaseHelper.php');

    if($mysqli){
        if(isset($_POST['misc']) && isset($_POST['tourcode'])){
            $misc = $_POST['misc'];
            $tourcode = $_POST['tourcode'];
            
            for($idx = 0; $idx < count($misc); $idx++){
                $id = $misc[$idx][0];

                $miscID = $misc[$idx][0];
                if($miscID >= 6){
                    $miscID = 6;
                }

                if($misc[$idx][1] === "") $amount = 'NULL';
                else $amount = $misc[$idx][1];

                if($misc[$idx][2] === "") $paytype = 'NULL';
                else $paytype= "'".$misc[$idx][2]."'";

                if($misc[$idx][3] === "") $memo = 'NULL';
                else $memo = "'".$misc[$idx][3]."'";

                $query = "INSERT INTO tour_misexpense VALUES ('$tourcode', $id, $miscID, $paytype, $memo, $amount)
                            ON DUPLICATE KEY UPDATE misexpensepaytype = $paytype, misexpensedesp = $memo, misexpenseamount = $amount";
                $qresult = mysqli_query($mysqli, $query);

                if(!$qresult) {
                    echo json_encode($query);
                }
            }
        }
    }
?>