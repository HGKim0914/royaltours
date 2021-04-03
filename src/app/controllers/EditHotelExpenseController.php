<?php
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    //Getting input from javascript
    include('./DatabaseHelper.php');

    if($mysqli){
        if(isset($_POST['hotel']) && isset($_POST['tourcode'])){
            $hotel = $_POST['hotel'];
            $tourcode = $_POST['tourcode'];

            for($idx = 0; $idx < count($hotel); $idx++){
                $id = $hotel[$idx][0];
                // tourcode, hotelid, hotelcheckindate, hotelperiod, hotelpaytype, hotelnumroom, hotelamount
                if($hotel[$idx][1] === "") $hotelid = 'NULL';
                else $hotelid = $hotel[$idx][1];

                if($hotel[$idx][2] === "") $checkindate = 'NULL';
                else $checkindate = "'" . $hotel[$idx][2] . "'";

                if($hotel[$idx][3] === "") $checkoutdate = 'NULL';
                else $checkoutdate = "'" . $hotel[$idx][3] . "'";

                if($hotel[$idx][4] === "") $paymethod = 'NULL';
                else $paymethod = "'" . $hotel[$idx][4] . "'";

                if($hotel[$idx][5] === "") $numroom = 'NULL';
                else $numroom = $hotel[$idx][5];

                if($hotel[$idx][6] === "") $amount = 'NULL';
                else $amount = $hotel[$idx][6];

                $query = "INSERT INTO tour_hotel VALUES ('$tourcode', $id, $hotelid, $checkindate, $checkoutdate, $paymethod, $numroom, $amount) 
                ON DUPLICATE KEY UPDATE hotelid = $hotelid, hotelcheckindate = $checkindate, hotelcheckoutdate = $checkoutdate, hotelpaytype = $paymethod, hotelnumroom = $numroom, hotelamount = $amount";
            
             
                $qresult = mysqli_query($mysqli, $query);

                if(!$qresult) {
                    echo json_encode($query);
                }
            }
        }
    }
?>