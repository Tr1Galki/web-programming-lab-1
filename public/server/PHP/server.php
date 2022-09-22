<?php header('Access-Control-Allow-Origin: *'); ?>

<?php
session_start();

$valX = $_GET['x'];
$valY = $_GET['y'];
$valR = $_GET['r'];
$startTime = $_GET['startTime'];
$timeZone = $_GET['timeZone'];
$correct = check($valX, $valY, $valR);
$answer = isInGraph($valX, $valY, $valR, $correct);
$array = [
    'correct' => $correct,
    'isIn' => $answer,
    'x' => $valX,
    'y' => $valY,
    'r' => $valR,
    'date' => date('d.m.Y H:i:s', time() - $timeZone * 60),
    'time' => round(microtime(true) * 1000 - $startTime, 4),
];
echo json_encode($array);


function isInGraph($x, $y, $r, $corr)
{
    if (!$corr) {
        return false;
    }
    if ($x >= 0) {
        if ($y >= 0) {
            return checkSquare($x, $y, $r);
        } else {
            return checkCircle($x, $y, $r);
        }
    } else {
        if ($y > 0) {
            return false;
        } else {
            return checkTriangle($x, $y, $r);
        }
    }
}

function check($x, $y, $r)
{
    if (isset($x) && isset($y) && isset($r) && is_numeric(str_replace(',', '.', $y)) &&  is_numeric($x) && is_numeric($r) && $y > -5 && $y < 3) {
        return true;
    } else {
        return false;
    }
}

function checkSquare($x, $y, $r)
{
    if (($x <= $r) && ($y <= $r)){
        return true;
    } else {
        return false;
    }
}

function checkCircle($x, $y, $r)
{
    if ($x*$x + $y*$y <= ($r/4)){
        return true;
    } else {
        return false;
    }
}

function checkTriangle($x, $y, $r)
{
    if ($y > -0.5*$x-$r){
        return true;
    } else {
        return false;
    }
}
?>

