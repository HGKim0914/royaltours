<?php
    include('./DBFunctions.php');
    if(!$mysqli) exit;      //check database connection

    if(isset($_POST['param'])){
        $param = $_POST['param'];
        $tourcode = $param[0];
        $plusfactor = $param[1];
        $minusfactor = $param[2];
        $guidetipminus = $param[3];
        $guidetipplus =  $param[4];

        $pfactorUpdated = $mfactorUpdated = $tipplusUpdated = $tipminusUpdated = true;

        foreach($plusfactor as $pvalue){    //plus factor
            $id = $pvalue[0];
            $categoryid = $id;
            if($id > 7) $categoryid = 8;
            $amount = $pvalue[1];
            if($amount == "") $amount = 'NULL';
            $memo = $pvalue[2];
            if($memo == "")  $memo = 'NULL';
            else $memo = "'".$memo."'";

            $result = insertOrUpdate('tour_plusfactor', "'".$tourcode."',".$id.",".$categoryid.",".$amount.",".$memo,"amount= ".$amount.", tour_plusfactor.desc=".$memo,$mysqli);
            if(!$result) $pfactorUpdated = false;
        }

        foreach($minusfactor as $mvalue){   //minus factor
            $id = $mvalue[0];
            $categoryid = $id;
            if($id > 2) $categoryid = 3;
            $amount = $mvalue[1];
            if($amount == "") $amount = 'NULL';
            $memo = $mvalue[2];
            if($memo == "")  $memo = 'NULL';
            else $memo = "'".$memo."'";

            $result = insertOrUpdate('tour_minusfactor', "'".$tourcode."',".$id.",".$categoryid.",".$amount.",".$memo, "amount= ".$amount.", tour_minusfactor.desc=".$memo,$mysqli);
            if(!$result) $mfactorUpdated = false;
        }

        foreach($guidetipplus as $gvalue){  //guide tip plus
            $id = $gvalue[0];
            $numpax = $gvalue[1];
            if($numpax == "") $numpax = 'NULL';
            $amount = $gvalue[2];
            if($amount == "") $amount = 'NULL';
            $memo = $gvalue[3];
            if($memo == "")  $memo = 'NULL';
            else $memo = "'".$memo."'";

            $result = insertOrUpdate('tour_localtip', "'".$tourcode."',".$id.",".$numpax.",".$amount.",".$memo, " numpax = ".$numpax.", tipamount=".$amount.", tour_localtip.desc=".$memo,$mysqli);
            if(!$result) $tipplusUpdated = false;
        }

        foreach($guidetipminus as $gvalue){ //guide tip minus
            $id = $gvalue[0];
            $numpax = $gvalue[1];
            if($numpax == "") $numpax = 'NULL';
            $amount = $gvalue[2];
            if($amount == "") $amount = 'NULL';
            $memo = $gvalue[3];
            if($memo == "")  $memo = 'NULL';
            else $memo = "'".$memo."'";

            $result = insertOrUpdate('tour_inboundtip', "'".$tourcode."',".$id.",".$numpax.",".$amount.",".$memo, " numpax = ".$numpax.", tipamount=".$amount.", tour_inboundtip.desc=".$memo,$mysqli);
            if(!$result) $tipminusUpdated = false;
        }

        if(!$pfactorUpdated || !$mfactorUpdated || !$tipplusUpdated || !$tipminusUpdated){
            echo json_encode(false);
        }else{
            echo json_encode(true);
        }
    }
?>