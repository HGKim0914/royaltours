<?php
    include('./DBFunctions.php');
    if(!$mysqli) exit;      //check database connection

    if(isset($_POST['param'])){
        $param = $_POST['param'];
        $tourcode = $param[0];
        $restaurant = $param[1];
        $hotel = $param[2];
        $attraction = $param[3];
        $carrental = $param[4];
        $misc = $param[5];

        $restaurantUpdate = $hotelUpdate = $attractionUpdate = $carrentalUpdate = $miscUpdate = true;

        foreach($restaurant as $rvalue){
            $id = $rvalue[0];
            $id = "'".$id."'";
            $restaurantid = $rvalue[1];
            if($restaurantid == "식당명") $restaurantid = 'NULL';
            $amount = $rvalue[2];
            if($amount == "") $amount = 'NULL';
            $numpax = $rvalue[3];
            if($numpax == "") $numpax = 'NULL';
            $paymentmethod = $rvalue[4];
            if($paymentmethod == "지급방식") $paymentmethod = 'NULL';
            else $paymentmethod = '"'.$paymentmethod.'"';

            $result = insertOrUpdate('tour_restaurant', 
                "'".$tourcode."',".$restaurantid.",".$id.",".$paymentmethod.",".$numpax.",".$amount,
                " restid=".$restaurantid.", restpaytype=".$paymentmethod.", restnumpax=".$numpax.", restamount=".$amount,
                $mysqli
            );
            if(!$result) $restaurantUpdate = false;
        }

        foreach($hotel as $hvalue){
            $id = $hvalue[0];
            $hotelid = $hvalue[1];
            if(!is_numeric($hotelid)) $hotelid = 'NULL';
            $checkindate = $hvalue[2];
            if($checkindate == "") $checkindate = 'NULL';
            else $checkindate = "'".$checkindate."'";
            $checkoutdate = $hvalue[3];
            if($checkoutdate == "") $checkoutdate = 'NULL';
            else $checkoutdate = "'".$checkoutdate."'";
            $roomnum = $hvalue[4];
            if($roomnum == "") $roomnum = 'NULL';
            $amount = $hvalue[5];
            if($amount == "") $amount = 'NULL';
            $paymentmethod = $hvalue[6];
            if($paymentmethod == "지급방식") $paymentmethod = 'NULL';
            else $paymentmethod = '"'.$paymentmethod.'"';

            $result = insertOrUpdate('tour_hotel',
                "'".$tourcode."',".$id.",".$hotelid.",".$checkindate.",".$checkoutdate.",".$paymentmethod.",".$roomnum.",".$amount,
                " hotelid = ".$hotelid.", hotelcheckindate=".$checkindate.", hotelcheckoutdate =".$checkoutdate.", hotelpaytype=".$paymentmethod.", hotelnumroom=".$roomnum.", hotelamount = ".$amount,
                $mysqli
            );

            if(!$result) $hotelUpdate = false;
        }

        foreach($attraction as $avalue){
            $id = $avalue[0];
            $date = $avalue[1];
            if($date=="") $date = 'NULL';
            else $date="'".$date."'";
            $attractionid = $avalue[2];
            if(!is_numeric($attractionid)) $attractionid = 'NULL';
            $numpax = $avalue[3];
            if($numpax == "") $numpax = 'NULL';
            $amount = $avalue[4];
            if($amount == "") $amount = 'NULL';
            $paymentmethod = $avalue[5];
            if($paymentmethod == "지급방식") $paymentmethod = 'NULL';
            else $paymentmethod = '"'.$paymentmethod.'"';

            $result  = insertOrUpdate('tour_admission',
                "'".$tourcode."',".$id.",".$attractionid.",".$paymentmethod.",".$numpax.",".$amount.",".$date,
                " admissionid=".$attractionid.", admissionpaytype=".$paymentmethod.", admissionnumpax=".$numpax.", admissionamount=".$amount.", admissiondate=".$date,
                $mysqli
            );

            if(!$result) $attractionUpdate = false;
        }

        foreach($carrental as $cvalue){
            $id = $cvalue[0];
            $carcompanyid = $cvalue[1];
            if(!is_numeric($carcompanyid)) $carcompanyid = 'NULL';
            $checkindate = $cvalue[2];
            if($checkindate == "") $checkindate = 'NULL';
            else $checkindate = "'".$checkindate."'";
            $checkoutdate = $cvalue[3];
            if($checkoutdate == "") $checkoutdate = 'NULL';
            else $checkoutdate = "'".$checkoutdate."'";
            $carid = $cvalue[4];
            if(!is_numeric($carid)) $carid = 'NULL';
            $amount = $cvalue[5];
            if($amount == "") $amount = 'NULL';
            $paymentmethod = $cvalue[6];
            if($paymentmethod == "지급방식") $paymentmethod = 'NULL';
            else $paymentmethod = '"'.$paymentmethod.'"';

            $result = insertOrUpdate('tour_carrental',
                "'".$tourcode."',".$id.",".$carcompanyid.",".$carid.",".$checkindate.",".$checkoutdate.",".$paymentmethod.",".$amount,
                " carcompanyid=".$carcompanyid.", cartypeid=".$carid.", carrentalstartdate=".$checkindate.", carrentalenddate=".$checkoutdate.", carrentalpaytype = ".$paymentmethod.", carrentalamount=".$amount,
                $mysqli
            );
            if(!$result) $carrentalUpdate = false;
        }

        foreach($misc as $mvalue){
            $id = $mvalue[0];
            $miscid = $id;
            if($miscid >= 6){
                $miscid = 6;
            }
            $amount = $mvalue[1];
            if($amount == "") $amount = 'NULL';
            $paymentmethod = $mvalue[2];
            if($paymentmethod == "지급방식") $paymentmethod = 'NULL';
            else $paymentmethod = '"'.$paymentmethod.'"';
            $memo = $mvalue[3];
            if($memo == "") $memo = 'NULL';
            else $memo = "'".$memo."'";

            $result = insertOrUpdate('tour_misexpense',
                "'".$tourcode."',".$id.",".$miscid.",".$paymentmethod.",".$memo.",".$amount,
                " misexpensepaytype=".$paymentmethod.", misexpensedesp=".$memo.", misexpenseamount=".$amount,
                $mysqli
            );

            if(!$result) $miscUpdate = false;
        }

        if($miscUpdate && $restaurantUpdate && $hotelUpdate && $attractionUpdate && $carrentalUpdate){
            echo json_encode(true);
        }else{
            echo json_encode(false);
        }
    }
?>