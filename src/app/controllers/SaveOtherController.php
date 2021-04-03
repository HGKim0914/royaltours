<?php
    include('./DBFunctions.php');
    if(!$mysqli) exit;      //check database connection
 
    if(isset($_POST['param'])){
        $param = $_POST['param'];
        $tourcode = $param[0];
        $tourprofit = ($tourprofit !== "")? $param[1] : 0;
        $additionalnote = $param[2];

        if($additionalnote == "") $additionalnote = 'NULL';
        else $additionalnote = "'".$additionalnote."'";

        $profitUpdated = $additionalnoteUpdated = true;

        //tour profit
        $result = insertOrUpdate('tour_tourprofit', "'".$tourcode."',".$tourprofit, " amount=".$tourprofit,  $mysqli);

        if(!$result) $profitUpdated = false;

        $result = insertOrUpdate('tour_additionalnote',
            "'".$tourcode."',".$additionalnote,
            " note=".$additionalnote,
            $mysqli
        );
        if(!$result) $additionalnoteUpdated - false;
        
        if($additionalnoteUpdated && $profitUpdated){
            echo json_encode(true);
        }else{
            echo json_encode(false);
        }
    }
?>