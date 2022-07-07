<?php
ini_set('max_execution_time', 3000); //300 seconds = 5 minutes

$img_hash_array = array();
$provinance_full = '';

for($i=0; $i<=3; $i++) {
    $hash = hash_file('sha256', "ipfs/images/$i.png");
    $provinance_full = $provinance_full.$hash;
    $img_hash_array[$i] = $hash;
}

$provinance = hash('sha256', $provinance_full);

echo $provinance;

//echo $provinance_full;
echo json_encode($img_hash_array);
?>