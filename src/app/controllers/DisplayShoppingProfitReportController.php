<?php
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    //Getting input from javascript
    include('./DatabaseHelper.php');

    if($mysqli){
        if(isset($_POST['tourcode'])){
            $tourcode = $_POST['tourcode'];
            
            $query = "SELECT * FROM tour_shopping, shoppinglist WHERE tourcode = '$tourcode' AND tour_shopping.shoppingid = shoppinglist.id ORDER BY tour_shopping.id";
            
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
    }
?>