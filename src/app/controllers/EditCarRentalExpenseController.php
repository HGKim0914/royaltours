<?php
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    //Getting input from javascript
    include('./DatabaseHelper.php');

    if($mysqli){
        if(isset($_POST['carrental']) && isset($_POST['tourcode'])){
            $carrental = $_POST['carrental'];
            $tourcode = $_POST['tourcode'];

            for($idx = 0; $idx < count($carrental); $idx++){
                $id = $carrental[$idx][0];

                if($carrental[$idx][1] === "") $carcompanyID = 'NULL';
                else $carcompanyID = $carrental[$idx][1];

                if($carrental[$idx][2] === "") $startdate = 'NULL';
                else $startdate ="'". $carrental[$idx][2]."'";

                if($carrental[$idx][3] === "") $enddate = 'NULL';
                else $enddate = "'".$carrental[$idx][3]."'";

                if($carrental[$idx][4] === "") $carrentalID = 'NULL';
                else $carrentalID = $carrental[$idx][4];

                if($carrental[$idx][5] === "") $amount = 'NULL';
                else $amount = $carrental[$idx][5];

                if($carrental[$idx][6] === "") $paymethod = 'NULL';
                else $paymethod = "'".$carrental[$idx][6]."'";

                $query = "INSERT INTO tour_carrental VALUES ('$tourcode', $id, $carcompanyID, $carrentalID, $startdate, $enddate, $paymethod, $amount)
                        ON DUPLICATE KEY UPDATE carcompanyid = $carcompanyID, cartypeid = $carrentalID, carrentalstartdate = $startdate, carrentalenddate = $enddate, carrentalpaytype = $paymethod, carrentalamount = $amount";
                
                $qresult = mysqli_query($mysqli, $query);

                if(!$qresult) {
                    echo json_encode($query);
                }
            }
        }
    }
?>