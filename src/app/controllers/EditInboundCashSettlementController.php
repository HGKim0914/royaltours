<?php
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    //Getting input from javascript
    include('./DatabaseHelper.php');

    if($mysqli){
        if(isset($_POST['inbound']) && isset($_POST['tourcode'])){
            $inbound = $_POST['inbound'];
            $tourcode = $_POST['tourcode'];

            for($idx = 0; $idx < count($inbound); $idx++){
                $id = $inbound[$idx][0];
                
                if($inbound[$idx][1] === "") $numpax = 'NULL';
                else $numpax = $inbound[$idx][1];

                if($inbound[$idx][2] === "") $amount = 'NULL';
                else $amount = $inbound[$idx][2];

                if($inbound[$idx][3] === "") $memo = 'NULL';
                else $memo = "'".$inbound[$idx][3]."'";

                $query = "INSERT INTO tour_inboundtip VALUES ('$tourcode', $id, $numpax, $amount, $memo)
                            ON DUPLICATE KEY UPDATE numpax = $numpax, tipamount = $amount, tour_inboundtip.desc = $memo";
                $qresult = mysqli_query($mysqli, $query);

                if(!$qresult){
                    echo json_encode($query);
                }       
            }
        }
    }
?>