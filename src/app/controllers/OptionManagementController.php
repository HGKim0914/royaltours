<?php
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");
    include('./DatabaseHelper.php');
    
    $DEFAULT_COM = 15;

    if($mysqli){
        if(isset($_POST['option'])){
            $option = $_POST['option'];

            //Delete items
            if(isset($_POST['items'])){
                $items = $_POST['items'];
                $sent = false;
                for($idx = 0; $idx < count($items); $idx++){
                    $query = "UPDATE $option SET shown = 0 WHERE id = $items[$idx]";
                    $qresult = mysqli_query($mysqli, $query);
                    if($qresult){
                        $sent = true;
                    }else{
                        echo json_encode($query);
                    }
                }
                if($sent == true){
                    echo json_encode($option);
                }
            }

            //Add item
            if(isset($_POST['name'])){
                $name = $_POST['name'];

                if($option === "shoppinglist" || $option === "optiontour"){
                    $defaultcom = 20;
                    $tccom = 1;
                    $query = "INSERT INTO $option VALUES (NULL, '$name', $defaultcom, $tccom, 1)";
                }else{
                    $query = "INSERT INTO $option VALUES (NULL, '$name', 1)";
                }

                $qresult = mysqli_query($mysqli, $query);
            
                if($qresult){
                    echo json_encode($option);

                    if($option == "shoppinglist"){  //add value in guidecom
                        //Get id of shoppinglist
                        $query = "SELECT id FROM $option WHERE name = '$name' && `shown`=1";
                        $qresult = mysqli_query($mysqli, $query);
            
                        if(mysqli_num_rows($qresult) > 0){
                            for($idx = 0; $idx < mysqli_num_rows($qresult); $idx++){
                                $row[$idx] = mysqli_fetch_row($qresult);
                            }
                        }

                        //Get all guides
                        $query = "SELECT id FROM users WHERE department = '가이드'";
                        $qresult = mysqli_query($mysqli, $query);
            
                        if(mysqli_num_rows($qresult) > 0){
                            for($idx = 0; $idx < mysqli_num_rows($qresult); $idx++){
                                $guideList[$idx] = mysqli_fetch_row($qresult);
                            }
                        }

                        foreach($guideList as $list){
                            $query = "INSERT INTO guide_com VALUES ('$list[0]', ".$row[0][0].", $DEFAULT_COM)";
                            $qresult = mysqli_query($mysqli, $query);
                        }
                    }
                }else{
                    echo json_encode($query);
                }
            }
        }
    }
?>