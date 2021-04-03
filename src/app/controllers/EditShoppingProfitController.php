<?php
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    //Getting input from javascript
    include('./DatabaseHelper.php');

    if($mysqli){
        if(isset($_POST['tourcode']) && isset($_POST['data']) 
            && isset($_POST['tc']) && isset($_POST['userid'])){
            //Initialize variables
            $tourcode = $_POST['tourcode'];
            $data = $_POST['data'];
            $tc = $_POST['tc'];
            $username = $_POST['userid'];

            //Store each array data into database
            for($idx = 0; $idx < count($data); $idx++){
                // id, name, amount
                $id = $data[$idx][0];

                if($data[$idx][1] === "") $name = 'NULL';
                else $name = $data[$idx][1];

                if($data[$idx][2] === "") $amount = 'NULL';
                else $amount = $data[$idx][2];

                //Default profit is set to null
                $commisioncom = 0;
                $guidecom = 0;
                $tccom = 0;
                $companycom = 0;

                $tcprofit = 'NULL';
                $guideprofit = 'NULL';
                $companyprofit = 'NULL';
                $commissionamount = 'NULL';

                if($name !== 'NULL' && $amount !== 'NULL'){
                    //Get company com
                    $query = "SELECT companycom FROM shoppinglist WHERE id = $name";
                    $qresult = mysqli_query($mysqli, $query);
                    if($qresult){
                        $count = mysqli_num_rows($qresult);
                        if($count == 1){
                            for($ind = 0; $ind < $count; $ind++){
                                $row[$ind] = mysqli_fetch_row($qresult);
                                $tempcom = $row[$ind];
                            }
                            for($ind = 0; $ind < count($tempcom); $ind++){
                                $commisioncom = $tempcom[$ind];
                            }
                        }

                        $commisioncom = (int)$commisioncom / 100;
                    }
                    
                    //Get user com
                    $query = "SELECT users.com FROM users WHERE users.name = '$username'";
                    $qresult = mysqli_query($mysqli, $query);
                    if($qresult){
                        $count = mysqli_num_rows($qresult);
                        if($count == 1){
                            for($ind = 0; $ind < $count; $ind++){
                                $row[$ind] = mysqli_fetch_row($qresult);
                                $tempcom = $row[$ind];
                            }
                            for($ind = 0; $ind < count($tempcom); $ind++){
                                $guidecom = $tempcom[$ind];
                            }
                        }
                        $companycom = (100 - (int)$guidecom ) / 100;
                        $guidecom = (int)$guidecom / 100;
                    }
                    //If TC required
                    if($tc === "true"){
                        $query = "SELECT DISTINCT tc.com FROM tccom AS tc, optiontour 
                            WHERE tc.id = optiontour.tccom";
                        
                        $qresult = mysqli_query($mysqli, $query);
                        if($qresult){
                            $count = mysqli_num_rows($qresult);
                            if($count > 0){
                                //If TC is set
                                for($ind = 0; $ind < $count; $ind++){
                                    $row[$ind] = mysqli_fetch_row($qresult);
                                    $temptc = $row[$ind];
                                }
                                for($ind = 0; $ind < count($temptc); $ind++){
                                    $tccom = $temptc[$ind];
                                }
                                $tccom = ((int)$tccom) / 100;
                            }
                            
                        }else{
                            echo json_encode($query);
                        }

                        //Calculation
                        $commissionamount = (double)$amount * $commisioncom;
                        $tcprofit = (double)$amount * $tccom;
                        $guideprofit = ($commissionamount - $tcprofit) * $guidecom;
                        $companyprofit = ($commissionamount - $tcprofit) * $companycom;

                    }else{
                        $commissionamount = (double)$amount * $commisioncom;
                        $guideprofit = $commissionamount * $guidecom;
                        $companyprofit = $commissionamount * $companycom;
                    }
                }//end of both set

                $query = "INSERT INTO tour_shopping VALUES ('$tourcode', $id, $name, $amount, $commissionamount, $companyprofit, $guideprofit, $tcprofit)
                ON DUPLICATE KEY UPDATE shoppingid = $name, shoppingsalesamount = $amount, shoppingcommamount = $commissionamount, shoppingcompanyprofit = $companyprofit, shoppingguideprofit = $guideprofit, shoppingtcprofit = $tcprofit";
                $qresult = mysqli_query($mysqli, $query);

                if(!$qresult){
                    echo json_encode($query);
                }
            }
        }
    }
?>