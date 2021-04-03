<?php
    include('./DBFunctions.php');
    if(!$mysqli) exit;      //check database connection

    $select = "S.name, GC.shoppingID, GC.com, GC.userID";
    if(isset($_POST['param'])) $where[] = "userID = ". "'".$_POST['param']."'";
    $where[] = "S.shown = 1";
    $from = "guide_com AS GC INNER JOIN shoppinglist AS S ON S.id = GC.shoppingID";

    $where = implode(" AND ", $where);

    $guidecom = getData($from, $select, $where, $mysqli);
    if($guidecom != false){
        echo json_encode($guidecom);
    }else{
        echo json_encode("4");  //fail to retrieve data - nothing to display
    }
/*
    include('./DBFunctions.php');
    if(!$mysqli) exit;      //check database connection

    $where = NULL;
    if(isset($_POST['param']))  $where = "userID = ". "'".$_POST['param']."'";
    $guidecom = getData("guide_com", "*", $where, $mysqli);
    if($guidecom != false){
        echo json_encode($guidecom);
    }else{
        echo json_encode("4");  //fail to retrieve data - nothing to display
    }
*/
?>