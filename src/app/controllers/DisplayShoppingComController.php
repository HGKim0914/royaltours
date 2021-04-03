<?php
    //SHOPPING COM DISPLAY
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    //Getting input from javascript
    // include('../helper/DatabaseHelper.php');
    include('./DatabaseHelper.php');
    
    if($mysqli){
        $query = "SELECT shoppinglist.name, shoppinglist.companycom, shoppinglist.id FROM shoppinglist WHERE shown = 1";
        $qresult = mysqli_query($mysqli, $query);
        $count = mysqli_num_rows($qresult);

        for($idx = 0; $idx < $count; $idx++){
            $row[$idx] = mysqli_fetch_row($qresult);
        }
        if(count($row) > 0){
            echo json_encode($row);
        }else{
            echo json_encode(false);
        }
    }
?>