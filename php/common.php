<?php
/////////////////////////////////////////////////
// ------------------------------------------- //
// -             COMMON FUNCTIONS            - //
// ------------------------------------------- //
/////////////////////////////////////////////////

$errors = array();

/////////////////////////////////////////////////
// -------- ERROR MESSAGE CONSTRUCTOR -------- //
/////////////////////////////////////////////////
function logError($errors,$httpError, $msg, $code)
{
    //////////ADD ERROR TO LOG AND RETURN///////////
    array_push($errors,['httpError' => $httpError, 'msg' => $msg, 'code' => $code]);
    return $errors;
}


/////////////////////////////////////////////////
// ---- ECHO ERROR MESSAGE(S) / HTTP CODE ---- //
/////////////////////////////////////////////////
function relayError($errors) 
{ 
    ///SEND ERROR ARRAY / HTTP ERROR (FIRST IN ARRAY). THEN EXIT//
    header('HTTP/1.1 '.strval($errors[0]["httpError"]));
    header('Content-Type: application/json; charset=UTF-8');
    die(json_encode($errors));
}


/////////////////////////////////////////////////
// ----------- CONNECT TO DATABASE ----------- //
/////////////////////////////////////////////////
function conn($host,$db,$user,$pass)
{
    $conn= new PDO("mysql:host=".$host.";dbname=".$db.";",$user, $pass);
    return $conn;
}

?>