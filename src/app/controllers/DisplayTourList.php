<?php
    include('./DBFunctions.php');
    if(!$mysqli) exit;

    $where = "tour.guideid = users.id ORDER BY tour.startdate";
    if(isset($_POST['param'])) 
        $where = "tour.guideid = '".$_POST['param']."' AND tour.guideid = users.id ORDER BY tour.startdate DESC";

    $result = getData("tour, users", "tour.startdate, tour.tourcode, users.name, tour.inboundlocal, tour.confirmation, tour.sent", $where, $mysqli);
    
    echo json_encode($result);
?>