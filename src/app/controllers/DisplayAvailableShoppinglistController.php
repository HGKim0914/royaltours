<?php
    include('./DBFunctions.php');
    if(!$mysqli) exit;      //check database connection
 
    $result = getData("shoppinglist", "id, name, companycom", "`shown`=1", $mysqli);

    if($result !== false){ 
        echo json_encode($result);
    }else{
        echo json_encode(false);
    }
?>