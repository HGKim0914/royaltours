<?php
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    //Getting input from javascript
    include('./DatabaseHelper.php');

    if($mysqli){
        if(isset($_POST['local']) && isset($_POST['tourcode'])){
            $local = $_POST['local'];
            $tourcode = $_POST['tourcode'];

            for($idx = 0; $idx < count($local); $idx++){
                $id = $local[$idx][0];
                if($local[$idx][1] === "") $age = 'NULL';
                else $age = "'".$local[$idx][1]."'";

                if($local[$idx][2] === "") $numpax = 'NULL';
                else $numpax = $local[$idx][2];

                if($local[$idx][3] === "") $amount = 'NULL';
                else $amount = $local[$idx][3];

                if($local[$idx][4] === "") $memo = 'NULL';
                else $memo = "'".$local[$idx][4]."'";

                $query = "INSERT INTO tour_localtip VALUES ('$tourcode', $id, $age, $numpax, $amount, $memo)
                            ON DUPLICATE KEY UPDATE agegroup = $age, numpax = $numpax, tipamount = $amount, tour_localtip.desc = $memo";
                $qresult = mysqli_query($mysqli, $query);

                if(!$qresult){
                    echo json_encode($query);
                }       
            }
        }
    }
?>