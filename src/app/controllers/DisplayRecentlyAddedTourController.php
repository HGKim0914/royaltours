<?php
    //SHOPPING COM DISPLAY
    header("Content-Type: text/html; charset=UTF-8"); 
    header("Access-Control-Allow-Origin: *");

    //Getting input from javascript
    // include('../helper/DatabaseHelper.php');
    include('./DatabaseHelper.php');
    
    if($mysqli){
        if(isset($_POST['uploader'])){
            $id = $_POST['uploader'];
            $query = "SELECT tour_uploaderinfo.addeddate, tour.startdate, tour.enddate, tour.tourcode FROM tour, tour_uploaderinfo WHERE tour_uploaderinfo.userid = '$id' AND tour.tourcode = tour_uploaderinfo.tourcode ORDER BY tour_uploaderinfo.addeddate DESC LIMIT 30";
            $qresult = mysqli_query($mysqli, $query);
            $count = mysqli_num_rows($qresult);
    
            if($count == 0){
                echo json_encode(false);
            }else{
                for($idx = 0; $idx < $count; $idx++){
                    $row[$idx] = mysqli_fetch_row($qresult);
                }
    
                echo json_encode($row);
            }
        }
        
    }
?>