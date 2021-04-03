<?php
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    include('./DatabaseHelper.php');

    if($mysqli){
        if(isset($_POST['tc']) && isset($_POST['tourcode'])){
            $tourcode = $_POST['tourcode'];
            $tc = $_POST['tc'];

            //TC
            if($tc === "true"){
                //Get tc
                $tccom = getTc($mysqli);
                $query = "SELECT * FROM tour_option WHERE tourcode = '$tourcode' AND tcprofit IS NULL";
                $qresult = mysqli_query($mysqli, $query);
                if($qresult){
                    $count = mysqli_num_rows($qresult);
                    if($count > 0){
                        for($ind = 0; $ind < $count; $ind++){
                            $row[$ind] = mysqli_fetch_row($qresult);
                            
                            $guidecom = $row[$ind][9] / 10;
                            $companycom = (10 - $row[$ind][9]) / 10;
                            $id = $row[$ind][1];
                            $tcprofit = $row[$ind][3] * $tccom;
                            $guideprofit = (($row[$ind][3] - $row[$ind][4]) - $tcprofit) * $guidecom;
                            
                            $companyprofit = (($row[$ind][3] - $row[$ind][4]) - $tcprofit) * $companycom;
                            
                            $queryUpdate = "UPDATE tour_option
                                SET companyprofit = $guideprofit, guideprofit = $guideprofit, tcprofit = $tcprofit
                                WHERE tourcode = '$tourcode' AND id = $id";
                            $qresultUpdate = mysqli_query($mysqli, $queryUpdate);
                            if(!$qresultUpdate){
                                echo json_encode($queryUpdate);
                            }
                        }
                    }
                }
            }else if($tc === "false"){
                $query = "SELECT * FROM tour_option WHERE tourcode = '$tourcode' AND tcprofit IS NOT NULL";
                $qresult = mysqli_query($mysqli, $query);
                if($qresult){
                    $count = mysqli_num_rows($qresult);
                    if($count > 0){
                        for($ind = 0; $ind < $count; $ind++){
                            $row[$ind] = mysqli_fetch_row($qresult);

                            $guidecom = $row[$ind][9] / 10;
                            $companycom = (10 - $row[$ind][9]) / 10;

                            $id = $row[$ind][1];
                            $tcprofit = 'NULL';
                            $guideprofit = ($row[$ind][3] - $row[$ind][4]) * $guidecom;
                            $companyprofit = ($row[$ind][3] - $row[$ind][4])* $companycom;

                            $queryUpdate = "UPDATE tour_option
                                SET companyprofit = $guideprofit, guideprofit = $guideprofit, tcprofit = $tcprofit
                                WHERE tourcode = '$tourcode' AND id = $id";
                            $qresultUpdate = mysqli_query($mysqli, $queryUpdate);
                            if(!$qresultUpdate){
                                echo json_encode($queryUpdate);
                            }
                        }
                    }
                }
            }
        }//end of isset
    }//end of mysqli

    function getTC($mysqli){
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

                return $tccom;
            }
        }
        return false;
    }
?>