<?php
header('Access-Control-Allow-Origin: *');

// $list = json_decode($json, true);
if ($_GET["link"]) {
    $json = file_get_contents(urldecode($_GET["link"]));
    echo $json;
}