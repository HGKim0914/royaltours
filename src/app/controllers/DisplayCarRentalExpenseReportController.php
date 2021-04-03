<?php
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");
    //Getting input from javascript
    include('./DatabaseHelper.php');
    if($mysqli){
        if(isset($_POST['tourcode'])){
            $tourcode = $_POST['tourcode'];
            $query = "SELECT * 
                        FROM tour_carrental AS TC
                            LEFT JOIN cartype AS CT ON TC.`cartypeid` = CT.`id`
                            LEFT JOIN carcompany AS CC ON CC.`id` = TC.`carcompanyid` 
                        WHERE TC.`tourcode` = '$tourcode' 
                        ORDER BY TC.id";

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