<?php
    //SHOPPING COM DISPLAY
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    //Getting input from javascript
    // include('../helper/DatabaseHelper.php');
    include('./DatabaseHelper.php');
    
    if($mysqli){
    
        $query = "SELECT users.name, users.id FROM users WHERE users.department = '가이드'";
        $qresult = mysqli_query($mysqli, $query);
        $count = mysqli_num_rows($qresult);

        if($count == 0){
            echo json_encode(false);
        }else{
            for($idx = 0; $idx < $count; $idx++){
                $row[$idx] = mysqli_fetch_row($qresult);
            }

            echo json_encode($row);
        }
    }
?>