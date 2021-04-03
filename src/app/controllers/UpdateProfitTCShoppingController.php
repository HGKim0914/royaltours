<?php
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    include('./DatabaseHelper.php');

    if($mysqli){
        
        if(isset($_POST['tc']) && isset($_POST['tourcode'])){
            $tourcode = $_POST['tourcode'];
            $tc = $_POST['tc'];
            $companycom = 0;
            $guidecom = 0;
            $tccom = 0;

            //Get User Com
            $query = "SELECT users.com FROM users, tour WHERE tour.tourcode = '$tourcode' AND tour.guideid = users.id";
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
            }else{
                echo json_encode($query);
            }

            if($tc === "true"){
                //Get TC
                $query = "SELECT tc.com FROM tccom AS tc, optiontour 
                    WHERE tc.id = optiontour.tccom";
                $qresult = mysqli_query($mysqli, $query);
                if($qresult){
                    $count = mysqli_num_rows($qresult);
                    if($count == 1){
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
                }

                $query = "SELECT * FROM tour_shopping WHERE tourcode = '$tourcode' AND shoppingtcprofit IS NULL";
                $qresult = mysqli_query($mysqli, $query);
                if($qresult){
                    $count = mysqli_num_rows($qresult);
                    if($count > 0){
                        for($ind = 0; $ind < $count; $ind++){
                            $row[$ind] = mysqli_fetch_row($qresult);

                            $id = $row[$ind][1];
                            $tcprofit = $row[$ind][3] * $tccom;
                            $guideprofit = ($row[$ind][4] - $tcprofit) * $guidecom;
                            $companyprofit = ($row[$ind][4] - $tcprofit) * $companycom;
                            $queryUpdate = "UPDATE tour_shopping 
                                SET shoppingcompanyprofit = $companyprofit, shoppingguideprofit = $guideprofit, shoppingtcprofit = $tcprofit 
                                WHERE tourcode = '$tourcode' AND id = $id";
                            $qresultUpdate = mysqli_query($mysqli, $queryUpdate);
                            if(!$qresultUpdate){
                                echo json_encode($queryUpdate);
                            }
                        }
                    }
                }
            }else if($tc === "false"){
                $query = "SELECT * FROM tour_shopping WHERE tourcode = '$tourcode' AND shoppingtcprofit IS NOT NULL";
                $qresult = mysqli_query($mysqli, $query);
                if($qresult){
                    $count = mysqli_num_rows($qresult);
                    if($count > 0){
                        for($ind = 0; $ind < $count; $ind++){
                            $row[$ind] = mysqli_fetch_row($qresult);

                            $id = $row[$ind][1];
                            echo json_encode($row[$ind]);
                            $tcprofit = 'NULL';
                            $guideprofit = $row[$ind][4] * $guidecom;
                            $companyprofit = $row[$ind][4] * $companycom;
                            $queryUpdate = "UPDATE tour_shopping 
                                SET shoppingcompanyprofit = $companyprofit, shoppingguideprofit = $guideprofit, shoppingtcprofit = $tcprofit 
                                WHERE tourcode = '$tourcode' AND id = $id";
                            $qresultUpdate = mysqli_query($mysqli, $queryUpdate);
                            if(!$qresultUpdate){
                                echo json_encode($queryUpdate);
                            }
                        }
                    }
                }
            }
        }
    }
?>