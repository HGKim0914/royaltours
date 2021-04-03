<?php
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    //Getting input from javascript
    include('./DatabaseHelper.php');

    if($mysqli){
        //Delete user
        if(isset($_POST['items'])){
            $items = $_POST['items'];

            for($idx = 0; $idx < count($items); $idx++){
                $query = "DELETE FROM users WHERE id = '$items[$idx]'";
                $qresult = mysqli_query($mysqli, $query);
                if($qresult){
                    echo json_encode($query);
                }
            }

        }else if(isset($_POST['password']) || isset($_POST['authorization']) || isset($_POST['com'])){
            if(count($_POST['password']) != 0){
                $password = $_POST['password'];
                
                
                //Update password
                for($idx = 0; $idx < count($password); $idx++){
                    $id = $password[$idx][0];
                    $pwd = password_hash($password[$idx][1], PASSWORD_DEFAULT);

                    $query = "UPDATE users SET password = '$pwd' WHERE id = '$id'";
                    $qresult = mysqli_query($mysqli, $query);

                    if(!$qresult){
                        echo json_encode($query);
                    }
                }
            }

            if(count($_POST['authorization']) != 0){
                $authorization = $_POST['authorization'];

                //Update authorization
                for($idx = 0; $idx < count($authorization); $idx++){
                    $id = $authorization[$idx][0];
                    $autho = $authorization[$idx][1];

                    $query = "UPDATE users SET authorization = '$autho' WHERE id = '$id'";
                    $qresult = mysqli_query($mysqli, $query);

                    if(!$qresult){
                        echo json_encode($query);
                    }
                }
            }

            if(count($_POST['com']) != 0){
                $com = $_POST['com'];

                //Update com
                for($idx = 0; $idx < count($com); $idx++){
                    $id = $com[$idx][0];
                    $value = $com[$idx][1];

                    $query = "UPDATE users SET com = $value WHERE id = '$id'";
                    $qresult = mysqli_query($mysqli, $query);

                    if(!$qresult){
                        echo json_encode($query);
                    }
                }
            }
        }
    }
?>