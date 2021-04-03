<?php
    include('./DBFunctions.php');
    if(!$mysqli) exit;      //check database connection

    $query = "SELECT users.id, users.name, users.department, users.com, users.authorization FROM users ORDER BY users.name";
    $userlist = getData("users", "id, name, department, authorization", NULL, $mysqli);
    if($userlist != false){
        echo json_encode($userlist);
    }else{
        echo json_encode(false);  //fail to retrieve data - nothing to display
    }
?>