<?php

/////////////////////////////////////////////////
// ------------------------------------------- //
// -      THIS SCRIPT WILL:                  - //
// -      1. CHECK USER EXISTS IN DB         - //
// -      2. LOGS IN USER USING SESSION      - //
// ------------------------------------------- //
/////////////////////////////////////////////////

session_start();

require 'common.php';

/////////////////////////////////////////////////
// --------------- GET INPUTS ---------------- //
/////////////////////////////////////////////////
$email = htmlentities($_POST["inputEmail"]);
$password = htmlentities($_POST["inputPass" ]);

/////////////////////////////////////////////////
// ------------ IS INPUT RECIEVED ------------ //
/////////////////////////////////////////////////
if(strlen($email) == 0 || strlen($password) == 0)
{
    if (strlen($email) == 0){$errors = logError($errors, 404, "Email Field Not Recieved"   , "0"  );}
    if (strlen($password) == 0){$errors = logError($errors, 404, "Password Field Not Recieved", "0.1");}

    relayError($errors); 
}

/////////////////////////////////////////////////
// ---------- FIND USER IN DATABASE ---------- //
/////////////////////////////////////////////////
$conn = conn("localhost","a1","alex","alex");

$userTable = "users";
$emailCol  = "email";
$passCol   = "password";

$loginQ = $conn -> prepare("SELECT * FROM $userTable WHERE $emailCol=:email AND $passCol=:password");
$loginQ -> bindParam(":email", $email);
$loginQ -> bindParam(":password", $password);
$loginQ -> execute();

$user = $loginQ -> fetch();

if(!$user) //If no results Returned
{
    $errors = logError($errors, 401,"Email / Password not reconised", "1");
    relayError($errors);
}
else //If match found
{	
    $_SESSION["userID" ] = $user["userID"];
    $_SESSION["username" ] = $user["email"];
	//$_SESSION["isadmin"] = $user["Admin" ];
    
}

?>
