<?php
    include('./DBFunctions.php');
    if(!$mysqli) exit;      //check database connection
 
    $result = getShoppingGuideCom($mysqli); //function
    
    if($result !== false){ 
        echo json_encode($result);
    }else{
        echo json_encode(false);
    }
?>