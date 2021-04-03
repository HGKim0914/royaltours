<?php
    DEFINE('DB_USERNAME', 'uw53n6skyq69j');
    DEFINE('DB_PASSWORD', '@@hn15)uu@4b');
    DEFINE('DB_HOST', 'localhost');
    DEFINE('DB_DATABASE', 'dbguec6zu8x564');
    // DEFINE('DB_USERNAME', 'root');
    // DEFINE('DB_PASSWORD', '');
    // DEFINE('DB_HOST', 'localhost');
    // DEFINE('DB_DATABASE', 'royaltours');

    $mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
    mysqli_query($mysqli, "set names utf8");
    
    // echo "Trying to connect";
    if(mysqli_connect_error()){
        die('Connect Error ('.mysqli_connect_errno().') '.mysqli_connect_error());
    }
?>