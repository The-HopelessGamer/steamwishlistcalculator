<?php
    include 'simple_html_dom.php';
    $ip = $_SERVER['REMOTE_ADDR'];
    $country = file_get_html("https://get.geojs.io/v1/ip/country/".$ip);
    echo $country;
?>
