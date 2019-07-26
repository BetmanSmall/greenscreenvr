<?php
$string = file_get_contents("gameList.json");
$json = json_decode($string, true);
if(isset($_GET['gameList'])) {
 	return $json;
 }
