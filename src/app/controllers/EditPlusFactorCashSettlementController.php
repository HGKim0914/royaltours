<?php
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    //Getting input from javascript
    include('./DatabaseHelper.php');

    if($mysqli){
        if(isset($_POST['plusfactor']) && isset($_POST['tourcode'])){
            $plusfactor = $_POST['plusfactor'];
            $tourcode = $_POST['tourcode'];
            
            for($idx = 0; $idx < count($plusfactor); $idx++){
                $id = $plusfactor[$idx][0];
                $plusfactorID = $plusfactor[$idx][0];
                if($plusfactorID >= 5){
                    $plusfactorID = 5;
                }

                if($plusfactor[$idx][1] === "") $amount = 'NULL';
                else $amount = $plusfactor[$idx][1];

                if($plusfactor[$idx][2] === "") $memo = 'NULL';
                else $memo = $plusfactor[$idx][2];

                $query = "INSERT INTO tour_plusfactor VALUES ('$tourcode', $id, $plusfactorID, $amount,'$memo')
                            ON DUPLICATE KEY UPDATE amount = $amount, tour_plusfactor.desc = '$memo'";
                $qresult = mysqli_query($mysqli, $query);

                if(!$qresult){
                    echo json_encode($query);
                }
            }
        }
    }
?>