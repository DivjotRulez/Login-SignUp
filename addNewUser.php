<?php
/////////////////////////////////////////////////
// ------------------------------------------- //
// -      THIS SCRIPT WILL:                  - //
// -      1. VALIDATE USER INPUT             - //
// -      2. ADD NEW USER TO TABLE           - //
// -      3. TRIGGER CONFIRMATION EMAIL      - //
// ------------------------------------------- //
/////////////////////////////////////////////////

$error = "FIX THESE ISSUES: ";

/////////////////////////////////////////////////
// ----------------- INPUTS ------------------ //
/////////////////////////////////////////////////

if (isset($_POST["inputName"           ])) { $name   = $_POST["inputName"           ]; } else {$error .= " \n no name";}
if (isset($_POST["inputEmail"          ])) { $email  = $_POST["inputEmail"          ]; }
if (isset($_POST["inputConfirmEmail"   ])) { $emailC = $_POST["inputConfirmEmail"   ]; }
if (isset($_POST["inputPassword"       ])) { $pass   = $_POST["inputPassword"       ]; }
if (isset($_POST["inputConfirmPassword"])) { $passC  = $_POST["inputConfirmPassword"]; }

$_SESSION["error"] = $error;
header("location: signUp.php");

/////////////////////////////////////////////////
// ---------------- VALIDATE ----------------- //
/////////////////////////////////////////////////

$emailIsValid;

// if($email == $emailC)
// {
//     if($email //email verryficasoun)
//     {

//     }
// }
// else
// {
//     //no match
// }







/////////////////////////////////////////////////
// ----------- INSERT INTO USERS ------------- //
/////////////////////////////////////////////////





/////////////////////////////////////////////////
// --------- SEND CONFIRMATION EMAIL --------- //
/////////////////////////////////////////////////


?>