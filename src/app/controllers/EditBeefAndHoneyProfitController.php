<?php
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    //Getting input from javascript
    include('./DatabaseHelper.php');

    if($mysqli){
        if(isset($_POST['tourcode']) && isset($_POST['data'])){
            $data = $_POST['data'];
            $tourcode = $_POST['tourcode'];
            
            // num, price, originalprice, com
            for($idx = 0; $idx < count($data); $idx++){
                $id = $data[$idx][0];

                if($data[$idx][1] === "") $num = 'NULL';
                else $num = $data[$idx][1];

                if($data[$idx][2] === "") $saleprice = 'NULL';
                else $saleprice = $data[$idx][2];

                if($data[$idx][3] === "") $originalprice = 'NULL';
                else $originalprice = $data[$idx][3];

                if($data[$idx][4] === "") $com = 'NULL';
                else $com = $data[$idx][4];

                //Default profit is set to null
                $guideprofit = 'NULL';
                $companyprofit = 'NULL';

                if($saleprice !== 'NULL' && $originalprice !== 'NULL' && $com !== 'NULL' && $num !== 'NULL'){
                    $netIncome = (double)$saleprice - (double)$originalprice;
                    $guideprofit = $netIncome * ((int)$com / 10);
                    $companyprofit = $netIncome - $guideprofit;
                }

                $query = "INSERT INTO tour_honeybeef VALUES ('$tourcode', $id, $id, $num, $saleprice, $originalprice, $companyprofit, $guideprofit, $com)
                ON DUPLICATE KEY UPDATE hbsalesnum = $num, hbsalesprice = $saleprice, hboriginalprice = $originalprice, hbcompanyprofit = $companyprofit, hbguideprofit = $guideprofit, hbguidecomm = $com";
                $qresult = mysqli_query($mysqli, $query);

                if(!$qresult){
                    echo json_encode($query);
                }
            }
            
        }
    }
?>