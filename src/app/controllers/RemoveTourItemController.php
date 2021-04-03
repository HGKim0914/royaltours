<?php
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    //Getting input from javascript
    include('./DatabaseHelper.php');

    if($mysqli){
        if(isset($_POST['tourcode'])){
            $tourcode = $_POST['tourcode'];
            if(isset($_POST['restaurant'])){
                $data = $_POST['restaurant'];
                for($idx=0; $idx < count($data); $idx++){
                    for($ind=0; $ind < count($data[$idx]); $ind++){
                        $id = "'".$data[$idx][$ind][2]."'";
                        // DELETE FROM table_name WHERE condition;
                        $query = "DELETE FROM tour_restaurant WHERE tourcode = '$tourcode' AND restday = $id";
                        $qresult = mysqli_query($mysqli, $query);
                        if(!$qresult){
                            echo json_encode($query);
                        }
                    }
                }
            }else{
                //Cash Settlement
                if(isset($_POST['plusfactor'])){
                    $data = $_POST['plusfactor'];
                    $tablename = "tour_plusfactor";
                }else if(isset($_POST['minusfactor'])){
                    $data = $_POST['minusfactor'];
                    $tablename = "tour_minusfactor";
                }else if(isset($_POST['inbound'])){
                    $data = $_POST['inbound'];
                    $tablename = "tour_inboundtip";
                }else if(isset($_POST['local'])){
                    $data = $_POST['local'];
                    $tablename = "tour_localtip";
                }
                //Profit
                else if(isset($_POST['shopping'])){
                    $data = $_POST['shopping'];
                    $tablename = "tour_shopping";
                }else if(isset($_POST['option'])){
                    $data = $_POST['option'];
                    $tablename = "tour_option";
                }
                //Expense
                else if(isset($_POST['carrental'])){
                    $data = $_POST['carrental'];
                    $tablename = "tour_carrental";
                }else if(isset($_POST['misc'])){
                    $data = $_POST['misc'];
                    $tablename = "tour_misexpense";
                }else if(isset($_POST['attraction'])){
                    $data = $_POST['attraction'];
                    $tablename = "tour_admission";
                }else if(isset($_POST['hotel'])){
                    $data = $_POST['hotel'];
                    $tablename = "tour_hotel";
                }
                for($idx=0; $idx < count($data); $idx++){
                    $id = $data[$idx][1];
                    // DELETE FROM table_name WHERE condition;
                    $query = "DELETE FROM $tablename WHERE tourcode = '$tourcode' AND id = $id";
                    $qresult = mysqli_query($mysqli, $query);
                    if(!$qresult){
                        echo json_encode(false);
                    }
                }
            }
        }else{
            echo json_encode(false);
        }
    }
?>