<?php
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    //Getting input from javascript
    // include('../helper/DatabaseHelper.php');
    include('./DatabaseHelper.php');

    if($mysqli){
        if(isset($_POST['admin']) && isset($_POST['guide']) && isset($_POST['office'])){
            $admin = $_POST['admin'];
            $guide = $_POST['guide'];
            $office = $_POST['office'];

            if($admin !== ""){
                $query = "UPDATE usercode SET code = '$admin' WHERE id = 1";
                $qresult = mysqli_query($mysqli, $query);
                if(!$qresult){
                    echo json_encode(false);
                }else{
                    echo json_encode(1);
                }
            }else{
                echo json_encode(1);
            }
            if($office !== ""){
                $query = "UPDATE usercode SET code = '$office' WHERE id = 2";
                $qresult = mysqli_query($mysqli, $query);
                if(!$qresult){
                    echo json_encode(false);
                }else{
                    echo json_encode(1);
                }
            }else{
                echo json_encode(1);
            }
            if($guide !== ""){
                $query = "UPDATE usercode SET code = '$guide' WHERE id = 3";
                $qresult = mysqli_query($mysqli, $query);
                if(!$qresult){
                    echo json_encode(false);
                }else{
                    echo json_encode(1);
                }
            }else{
                echo json_encode(1);
            }
        }
    }
?>