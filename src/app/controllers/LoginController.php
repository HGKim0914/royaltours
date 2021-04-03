<?php 
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    include('./DatabaseHelper.php');
    
    if($mysqli){
        if(isset($_POST['id']) && isset($_POST['password'])){
            $id = $_REQUEST['id'];
            $password = $_REQUEST['password'];

            $query = "SELECT u.id, u.name, u.department, u.authorization, u.password FROM users AS u WHERE u.id = '$id'";
            $qresult = mysqli_query($mysqli, $query);
            
            if($qresult){
	            $count = mysqli_num_rows($qresult);

	            //If user exists in database
	            if($count > 0){
                    $row = mysqli_fetch_row($qresult);

                    $isPasswordVerified = password_verify($_POST['password'], $row[4]); //check if password is verified
                    if($isPasswordVerified){
                        $name = $row[1];
                        $department = $row[2];
                        $authorization = $row[3];
                        echo json_encode($row);
                        return false;
                    }
                }
			} 
        }

        echo json_encode(false);
        return false;
    }
?>