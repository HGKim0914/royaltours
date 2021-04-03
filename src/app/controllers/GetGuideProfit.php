<?php
    include('./DBFunctions.php');
    if(!$mysqli) exit;      //check database connection
    
    if(isset($_POST['param'])){
        $data = $_POST['param'];
        $row = array();
        foreach($data as $dvalue){
            $tourcode = $dvalue[0];
            $query  =   "SELECT TP.`tourcode`, TP.`id`, TP.`amount`, T.`startdate` 
                        FROM tour_plusfactor AS TP
                        INNER JOIN tour AS T ON T.`tourcode` = TP.`tourcode`
                        WHERE TP.`tourcode`= '$tourcode' AND (TP.`id` = 4 OR TP.`id` = 8)";

            $qresult = mysqli_query($mysqli, $query);
            if($qresult){
                //get each data
                $rows = mysqli_num_rows($qresult);
                if($rows > 0){
                    for($ind = 0; $ind < $rows; $ind++){
                        array_push($row, mysqli_fetch_row($qresult));
                    }
                }
            }
        }

        echo json_encode($row);
    }

?>