<?php
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    //Getting input from javascript
    // include('../helper/DatabaseHelper.php');
    include('./DatabaseHelper.php');

    if($mysqli){
        if(isset($_POST['option'])){
            $option = $_POST['option'];

            if(isset($_POST['items'])){
                $items = $_POST['items'];
                
                $categoryCom = "companycom";
                if($option === "tccom"){
                    $categoryCom = "com";
                }
                //Update item
                for($idx = 0; $idx < count($items); $idx++){
                    $id = $items[$idx][0];
                    $com = $items[$idx][1];

                    $query = "UPDATE $option SET $categoryCom = $com WHERE id = '$id'";
                    $qresult = mysqli_query($mysqli, $query);

                    if(!$qresult){
                        echo json_encode($query);
                    }else{
                        echo json_encode($option);
                    }
                }
            }
        }
    }
?>