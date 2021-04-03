<?php
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    //Getting input from javascript
    // include('../helper/DatabaseHelper.php');
    include('./DatabaseHelper.php');
    
    if($mysqli){
        if(isset($_POST['id']) && isset($_POST['password'])){
            $id = $_POST['id'];

            $password = $_POST['password'];
            $password = password_hash($password, PASSWORD_DEFAULT); 

            $query = "UPDATE users SET users.password = '$password' WHERE users.id = '$id'";
            $qresult = mysqli_query($mysqli, $query);

            if(!$qresult){
                echo json_encode($query);
            }else{
                echo json_encode(true);
            }
        }
    }
?>