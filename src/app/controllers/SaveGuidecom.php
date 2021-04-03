<?php
    include('./DBFunctions.php');
    if(!$mysqli) exit;      //check database connection

    $where = NULL;
    if(isset($_POST['param'])) {
        $param = $_POST['param'];

        foreach($param AS $value){
            $userid = $value[0];
            $shoppingid = $value[1];
            $com = $value[2];

            $guidecom = update("guide_com", "`com`=".$com, "`userID`='".$userid."' AND `shoppingID`=".$shoppingid, $mysqli);
            echo json_encode($guidecom);
        }
    }
?>