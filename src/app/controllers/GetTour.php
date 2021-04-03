<?php
    include('./DBFunctions.php');
    if(!$mysqli) exit;
    
    $where = NULL;
    if(isset($_POST['param']))
        $where = "tourcode = '" . $_POST['param'] ."' AND tour.guideid = users.id";
    
    $result = getData("tour, users", "tour.tourcode, tour.startdate, tour.guideid, tour.landid, tour.type, tour.tc, tour.numpax, tour.numroom, tour.inboundlocal, tour.confirmation, tour.sent, users.id, users.name, tour.enddate", $where, $mysqli);
    
    // set if land exists
    if($result[0][3] !== NULL){
        $getLand = getData("land, tour", "land.name", "land.id = ".$result[0][3], $mysqli);
        if($getLand !== false){
            $result[0][3] = $getLand[0][0];
        }
    }

    echo json_encode($result[0]);
?>