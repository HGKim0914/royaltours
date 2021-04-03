<?php
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    //Getting input from javascript
    include('./DatabaseHelper.php');

    if($mysqli){
        if(isset($_POST['minusfactor']) && isset($_POST['tourcode'])){
            $minusfactor = $_POST['minusfactor'];
            $tourcode = $_POST['tourcode'];
            
            for($idx = 0; $idx < count($minusfactor); $idx++){
                $id = $minusfactor[$idx][0];
                $minusfactorID = $minusfactor[$idx][0];
                if($minusfactorID >= 5){
                    $minusfactorID = 5;
                }

                if($minusfactor[$idx][1] === "") $amount = 'NULL';
                else $amount = $minusfactor[$idx][1];

                if($minusfactor[$idx][2] === "") $memo = 'NULL';
                else $memo = $minusfactor[$idx][2];

                $query = "INSERT INTO tour_minusfactor VALUES ('$tourcode', $id, $minusfactorID, $amount,'$memo')
                            ON DUPLICATE KEY UPDATE amount = $amount, tour_minusfactor.desc = '$memo'";
                $qresult = mysqli_query($mysqli, $query);

                if(!$qresult){
                    echo json_encode($query);
                }
            }
        }
    }
?>