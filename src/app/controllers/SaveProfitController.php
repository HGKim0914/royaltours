<?php
    include('./DBFunctions.php');
    if(!$mysqli) exit;      //check database connection

    if(isset($_POST['param'])){
        $param = $_POST['param'];
        $tourcode = $param[0];
        $shopping = $param[1];
        $option = $param[2];
        $honeybeef = $param[3];

        $shoppingUpdated = $optionUpdated = $hbUpdated = true;

        //Delete existing data
        $deleteShoppingQuery    =    "DELETE FROM `tour_shopping` WHERE tourcode = '$tourcode'";
        deleteData($mysqli, $deleteShoppingQuery);

        $deleteOptionQuery      =   "DELETE FROM `tour_option` WHERE `tourcode` = '$tourcode'";
        deleteData($mysqli, $deleteOptionQuery);

        $deleteHBQuery          =   "DELETE FROM `tour_honeybeef` WHERE `tourcode` = '$tourcode'";
        deleteData($mysqli, $deleteHBQuery);

        //Shopping
        foreach($shopping as $svalue){
            $id = $svalue[0];
            $shoppinglistid = $svalue[1];
            if($shoppinglistid == "쇼핑내역")$shoppinglistid = 'NULL';
            $amount = $svalue[2];
            if($amount == "") $amount = 'NULL';
            $companycomm = $svalue[3];
            if($companycomm == "") $companycomm = 'NULL';
            $guidecomm = $svalue[4];
            if($guidecomm == "") $guidecomm = 'NULL';
            $tccomm = $svalue[5];
            if($tccomm == "") $tccomm = 'NULL';

            if($companycomm !== 'NULL' && $guidecomm !== 'NULL')
                $commamount = $companycomm + $guidecomm;
            else $commamount = 'NULL';

            $result = insertOrUpdate('tour_shopping', 
                "'".$tourcode."', ".$id.",".$shoppinglistid.",".$amount.",".$commamount.",".$companycomm.",".$guidecomm.",".$tccomm, 
                " shoppingid = ".$shoppinglistid." , shoppingsalesamount = ".$amount.", shoppingcommamount = ".$commamount.", shoppingcompanyprofit = ".$companycomm.", shoppingguideprofit = ".$guidecomm.", shoppingtcprofit = ".$tccomm, 
                $mysqli
            );

            if(!$result) $shoppingUpdated = false;
        }

        //Option
        foreach($option as $ovalue){
            $id = $ovalue[0];
            $optionid = $ovalue[1];
            if($optionid == "선택관광") $optionid = 'NULL';
            $amount = $ovalue[2];
            if($amount == "") $amount = 'NULL';
            $originalprice = $ovalue[3];
            if($originalprice == "") $originalprice = 'NULL';
            $commpercentage = $ovalue[4];
            if($commpercentage == "수입분배") $commpercentage = 'NULL';
            $memo = $ovalue[5];
            if($memo == "") $memo = 'NULL';
            else $memo = "'".$memo."'";
            $guidecomm = $ovalue[6];
            $companycomm = $ovalue[7];
            $tccomm = $ovalue[8];
            
            $result = insertOrUpdate('tour_option', 
                "'".$tourcode."', ".$id.",".$optionid.",".$amount.",".$originalprice.",".$memo.",".$companycomm.",".$guidecomm.",".$tccomm.",".$commpercentage,
                " optionid = ".$optionid." ,salesprice= ".$amount." , originalprice=".$originalprice.", misc = ".$memo.", companyprofit=".$companycomm.", guideprofit=".$guidecomm.", tcprofit=".$tccomm.", guidecom=".$commpercentage,
                $mysqli);
            
            if(!$result) $optionUpdated = false;
        }

        //HB
        foreach($honeybeef as $hbvalue){
            $id = $hbvalue[0];
            $hbid = $id;
            $num = $hbvalue[1];
            $amount = $hbvalue[2];
            $originalprice = $hbvalue[3];
            $commpercentage = $hbvalue[4];
            if($commpercentage == "수입분배") $commpercentage = 'NULL';
            $guidecomm = $hbvalue[5];
            $companycomm = $hbvalue[6];
            $tccomm = $hbvalue[7];

            $result = insertOrUpdate('tour_honeybeef', 
                "'".$tourcode."', ".$id.",".$hbid.",".$num.",".$amount.",".$originalprice.",".$companycomm.",".$guidecomm.",".$commpercentage.",".$tccomm,
                " hbsalesnum=".$num.",hboriginalprice=".$originalprice.",hbcompanyprofit=".$companycomm.",hbsalesprice=".$amount.",hbguideprofit=".$guidecomm.",hbguidecomm=".$commpercentage.",hbtcprofit=".$tccomm,
                $mysqli
            );

            if(!$result) $hbUpdated = false;
        }

        if(!$hbUpdated || !$optionUpdated || !$shoppingUpdated){
            echo json_encode(false);
        }else{
            echo json_encode(true);
        }
    }
?>