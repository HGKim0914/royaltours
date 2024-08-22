<?php 
    include('./DBFunctions.php');
    if(!$mysqli) exit;      //check database connection

    if(isset($_POST['param'])) {
        $data = $_POST['param'];

        $row = array();
        for($idx = 0; $idx < count($data); $idx++){
            $tourcode = $data[$idx][0];
            $query = "SELECT TM.`tourcode`, TM.`misexpenseamount`, T.`startdate`, T.`inboundlocal`
                        FROM tour_misexpense AS TM
                        INNER JOIN tour AS T ON T.`tourcode` = TM.`tourcode`
                        WHERE TM.tourcode = '$tourcode' AND TM.`misexpenseid` = 6";

            $qresult = mysqli_query($mysqli, $query);
            if($qresult){
                $count = mysqli_num_rows($qresult);
                if($count > 0){
                    for($ind = 0; $ind < $count; $ind++){
                        array_push($row, mysqli_fetch_row($qresult));
                    }
                }
            }else{
                echo json_encode(false);
                exit;
            }
        }
        echo json_encode($row);
        exit;
    }
?>