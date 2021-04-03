<?php
header("Content-Type: text/html; charset=UTF-8"); 
header("Access-Control-Allow-Origin: *");

include('./DatabaseHelper.php');

function checkIfDataExists($table, $attribute, $data, $mysqli){
    $query  =   "SELECT * FROM ".$table." WHERE ". $attribute ." = '".$data."';";
    $qresult = mysqli_query($mysqli, $query) or die(mysqli_error());
    $count = mysqli_num_rows($qresult);
    if($count > 0){
        return false;
    }
    return true;
}

function checkIfUsercodeExists($data, $mysqli){
    $query  =   "SELECT * FROM usercode WHERE code = '".$data."';";
    $qresult = mysqli_query($mysqli, $query) or die(mysqli_error());
    $count = mysqli_num_rows($qresult);
    if($count === 0){
        return false;
    }

    $row = array();
    for($idx = 0; $idx < $count; $idx++){
        $row[$idx] = mysqli_fetch_row($qresult);
    }

    return $row;
}

function insert($table, $data, $mysqli){
    $query = "INSERT INTO ".$table." VALUES (".$data.")";
    $qresult = mysqli_query($mysqli, $query);

    if($qresult){
        return true;
    }

    return false;
}

function insertOrUpdate($table, $data, $UPDATE = NULL, $mysqli){
    $query = "INSERT INTO ".$table." VALUES (".$data.") 
        ON DUPLICATE KEY UPDATE ". $UPDATE . ";";
    $qresult = mysqli_query($mysqli, $query);

    return $query;
    if($qresult){
        return true;
    }
    return false;
}

function update($table = NULL, $data = NULL, $where = NULL, $mysqli){
    $query = "UPDATE ".$table." SET ".$data." WHERE ".$where.";";
    $qresult = mysqli_query($mysqli, $query);

    if($qresult) return true;
    return false;
}

function getData($table = NULL, $data = NULL, $where = NULL, $mysqli){
    $ifConditionExist = "";
    if($where !== null)  $ifConditionExist = " WHERE " . $where;

    $query = "SELECT ".$data." FROM ".$table . $ifConditionExist;
    $qresult = mysqli_query($mysqli, $query);

    $count = mysqli_num_rows($qresult);
    if($count === 0){
        return false;
    }
    $row = array();
    for($idx = 0; $idx < $count; $idx++){
        $row[$idx] = mysqli_fetch_row($qresult);
    }

    return $row;
}

function getShoppingGuideCom($mysqli){
    $select     = "S.name, S.id, GC.com, GC.userID";
    $from       = "shoppinglist S LEFT JOIN guide_com GC ON GC.shoppingID = S.id";
    $where      = "S.shown = 1";

    $query = "SELECT $select
                FROM $from 
                WHERE $where";
    
     $qresult = mysqli_query($mysqli, $query);

     $count = mysqli_num_rows($qresult);
     if($count === 0){
         return false;
     }
 
     $row = array();
     for($idx = 0; $idx < $count; $idx++){
         $row[$idx] = mysqli_fetch_row($qresult);
     }
 
     return $row;
}

function deleteData($mysqli, $sql){
    $query  =   $sql;
    $qresult = mysqli_query($mysqli, $query);

    return true;
}


?>