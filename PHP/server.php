<?php
session_start();

$x = $_GET['x'];
$y = $_GET['y'];
$r = $_GET['r'];
$startTime = $_GET['startTime'];
$timeZone = $_GET['timeZone'];
$answer = checkGraph($x, $y, $r);
$array = [
    'isIn' => $answer,
    'x' => $x,
    'y' => $y,
    'r' => $r,
    'date' => date('d.m.Y H:i:s', time() - $timeZone * 60),
    'time' => round(microtime(true) * 1000 - $startTime, 4),
];
echo json_encode($array);


function checkX($x)
{
    return isset($x);
}

function checkY($y)
{
    return (isset($y) && is_numeric(str_replace(',', '.', $y)));
}

function checkR($r)
{
    return isset($r);
}

function checkGraph($x, $y, $r)
{
    if (!checkX($x) || !checkY($y) || !checkR($r)) {
        return false;
    }

    if ($x >= 0 && $y >= 0) {

        if ($y <= $r && $x <= $r) {
            return true;
        } else {
            return false;
        }

    } elseif ($x >= 0 && $y <= 0) {

        if (sqrt($x * $x + $y * $y) <= $r) {
            return true;
        } else {
            return false;
        }

    } elseif ($x >= 0 && $y <= 0) {

        if ($x < -2 * $r - 1 || $y < -0.5 * $r - 1){
            return true;
        } else { return false; }
    } else {
        return false;
    }
}

?>

