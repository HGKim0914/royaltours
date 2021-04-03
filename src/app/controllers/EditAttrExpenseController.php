<?php
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    //Getting input from javascript
    include('./DatabaseHelper.php');

    if($mysqli){
        if(isset($_POST['attraction']) && isset($_POST['tourcode'])){
            $attraction = $_POST['attraction'];
            $tourcode = $_POST['tourcode'];

            for($idx = 0; $idx < count($attraction); $idx++){
                $id = $attraction[$idx][0];

                if($attraction[$idx][1] === "") $attrID = 'NULL';
                else $attrID = $attraction[$idx][1];

                if($attraction[$idx][2] === "") $numpax = 'NULL';
                else $numpax = $attraction[$idx][2];

                if($attraction[$idx][3] === "") $amount = 'NULL';
                else $amount = $attraction[$idx][3];

                if($attraction[$idx][4] === "") $paymethod = 'NULL';
                else $paymethod = "'" . $attraction[$idx][4] . "'";

                if($attraction[$idx][5] === "") $date = 'NULL';
                else $date = "'" . $attraction[$idx][5] . "'";

                $query = "INSERT INTO tour_admission VALUES ('$tourcode', $id, $attrID, $paymethod, $numpax, $amount, $date)
                        ON DUPLICATE KEY UPDATE admissionid = $attrID, admissionpaytype = $paymethod, admissionnumpax = $numpax, admissionamount = $amount, admissiondate = $date";
            
                $qresult = mysqli_query($mysqli, $query);

                if(!$qresult) {
                    echo json_encode($query);
                }
            }
        }
    }
?>