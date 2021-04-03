<?php
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    //Getting input from javascript
    include('./DatabaseHelper.php');

    if($mysqli){
        if(isset($_POST['tourcode']) && isset($_POST['data']) && isset($_POST['tc'])){
            $tourcode = $_POST['tourcode'];
            $data = $_POST['data'];
            $tc = $_POST['tc'];

            //Store each array data into database
            for($idx = 0; $idx < count($data); $idx++){
                // id, name, comportion, originalprice, saleprice, misc
                $id = $data[$idx][0];

                if($data[$idx][1] === "") $name = 'NULL';
                else $name = $data[$idx][1];

                if($data[$idx][2] === "") $com = 'NULL';
                else $com = $data[$idx][2];
                
                if($data[$idx][3] === "") $originalprice = 'NULL';
                else $originalprice = $data[$idx][3];

                if($data[$idx][4] === "") $saleprice = 'NULL';
                else $saleprice = $data[$idx][4];

                if($data[$idx][5] === "") $misc = 'NULL';
                else $misc = "'".$data[$idx][5]."'";

                //Default profit is set to null
                $tcprofit = 'NULL';
                $guideprofit = 'NULL';
                $companyprofit = 'NULL';

                //If all data exists in order to calculate profit
                if($com != 'NULL' && $saleprice != 'NULL' && $originalprice != 'NULL'){
                    //TC
                    if($tc == "true"){
                        $query = "SELECT tc.com FROM tccom AS tc, optiontour 
                            WHERE tc.id = optiontour.tccom";
                        $qresult = mysqli_query($mysqli, $query);
                        if($qresult){
                            $count = mysqli_num_rows($qresult);

                            if($count === 0){
                                echo json_encode($query);
                            }else{
                                 //Get tccom
                                 for($ind = 0; $ind < $count; $ind++){
                                     $row[$ind] = mysqli_fetch_row($qresult);
                                     $temptc = $row[$ind];
                                 }
                                 for($ind = 0; $ind < count($temptc); $ind++){
                                     $tccom = $temptc[$ind];
                                 }
                                 $tccom = ((int)$tccom) / 100;
                                 $guidecom = ((int)$com) / 10;
                                 $companycom = (10 - (int)$com) / 10;
 
                                 //Get guidecom and companycom
                                 $tcprofit = (double)$saleprice * $tccom;
                                 $guideprofit = (($saleprice - $originalprice) - $tcprofit) * $guidecom;
                                 $companyprofit = (($saleprice - $originalprice) - $tcprofit) * $companycom;
                            }
                        }
                    }else{
                        $guidecom = ((int)$com) / 10;
                        $companycom = (10 - (int)$com) / 10;

                        $guideprofit = ($saleprice - $originalprice)  * $guidecom;
                        $companyprofit = ($saleprice - $originalprice) * $companycom;
                    }
                }

                //Query
                $query = "INSERT INTO tour_option VALUES ('$tourcode', $id, $name, $saleprice, $originalprice, $misc, $companyprofit, $guideprofit, $tcprofit, $com)
                ON DUPLICATE KEY UPDATE optionid = $name, salesprice = $saleprice, originalprice = $originalprice, misc = $misc, companyprofit = $companyprofit, guideprofit = $guideprofit, tcprofit = $tcprofit, guidecom = $com";
                $qresult = mysqli_query($mysqli, $query);

                if(!$qresult){
                    echo json_encode($query);
                }
            }
        }
    }
?>