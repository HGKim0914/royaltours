<?php 
    include_once('./DBFunctions.php');
    if(!$mysqli) exit;      //check database connection

    if(isset($_POST['id']) &&
    isset($_POST['name']) &&
    isset($_POST['password']) &&
    isset($_POST['code'])){

        $id = $_REQUEST['id']; //get id
        $password = password_hash($_REQUEST['password'], PASSWORD_DEFAULT); //get hashed password

        $name = $_REQUEST['name'];
        $code = $_REQUEST['code'];

        $ifNotExistingUser = checkIfDataExists("users", "id", $id, $mysqli);   //check if id exists
        if(!$ifNotExistingUser){
            echo json_encode("1");
            exit;
        }

        $usercode = checkIfUsercodeExists($code, $mysqli);
        if(!$usercode){
            echo json_encode("2");
            exit;
        }

        switch($usercode[0][0]){    //get department
            case 1:
                $department = "어드민";
                $authorization = "tttttt";
                break;
            case 2:
                $department = "오피스";
                $authorization = "ffffft";
                break;
            case 3:
                $department = "가이드";
                $authorization = "ffffff";
                createGuideCom($id, $mysqli);
                break;
            default:
                echo json_encode("3");
                exit;
        }

        $userCreation = insert('users', "'$id', '$password', '$name', '$department', '$authorization'", $mysqli);
        
        //registration
        if(!$userCreation){
            echo json_encode("3"); //fail
            exit;
        }else{
            echo json_encode("4"); //successful
        }
    }

    function createGuideCom($userId, $mysqli){
        $shoppingList = getData("shoppinglist" ,"id", NULL, $mysqli);
        if($shoppingList !== false){
            $defaultCom = 20;

            foreach($shoppingList as $r){
                $guideComCreation = insert("guide_com", "'".$userId."', $r[0], $defaultCom" , $mysqli);
                if(!$guideComCreation){
                    echo json_encode("3");
                    exit;
                }
            }
        }
    }
?>