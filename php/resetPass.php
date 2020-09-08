<?php
/////////////////////////////////////////////////
// ------------------------------------------- //
// -      THIS SCRIPT WILL:                  - //
// -      1. VALIDATE USER INPUT             - //
// -      2. ADD NEW USER TO TABLE           - //
// -      3. TRIGGER CONFIRMATION EMAIL      - //
// ------------------------------------------- //
/////////////////////////////////////////////////

require 'sendResetEmail.php';
require 'common.php';

/////////////////////////////////////////////////
// ----------------- INPUTS ------------------ //
/////////////////////////////////////////////////

if (isset($_POST["inputEmail"])) 
{ 
    $email  = $_POST["inputEmail"]; 
} 
else 
{
    $errors = logError($errors, 404, "No Email Entered", "0.1");
    relayError($errors);
}


/////////////////////////////////////////////////
// ---------------- VALIDATE ----------------- //
/////////////////////////////////////////////////

if (strlen(trim($email )) < 1)
{
    $errors = logError($errors, 400, "Enter A Valid Email", "1.1");
    relayError($errors);
}

/////////////EMAIL FORMAT INCORRECT//////////////
if (!filter_var($email, FILTER_VALIDATE_EMAIL))
{
    $errors = logError($errors, 400,"Enter A Valid Email", "2.1.1");
    relayError($errors);
}

///////////IS EMAIL REGISTERED///////////

//conn($host,$db,$user,$pass)
$conn = conn("localhost","a1","alex","alex");

$findByEmail = $conn->query("SELECT * FROM users where email = '$email'");
$user = $findByEmail->fetch();

if(!$user)
{
    $errors = logError($errors, 400,"Email Is Not Registered", "2.3");
    relayError($errors);
}
if($user["isActive"] != 1)
{
    $errors = logError($errors, 401,"Please Activate Your Account First", "2"); relayError($errors);
}
/////////////////////////////////////////////////
// --------- INSERT INTO USERS TABLE --------- //
/////////////////////////////////////////////////
 
if($user)
{



$key = rand();
$email = $user["email"];

$update = $conn->prepare
(
    "UPDATE users
    SET activationKey = :key
    WHERE email = :email;"
);

$update->bindParam(":email"   , $email );
$update->bindParam(":key"     , $key   );

$update -> execute();

if($update->rowCount() < 1)
{
    $errors = logError($errors, 500 ,"Database update Failed", "3.1");
    relayError($errors);
}

}

/////////////////////////////////////////////////
// --------------- SEND EMAIL ---------------- //
/////////////////////////////////////////////////

/////SEND EMAIL IF INSERT WAS SUCCESSFUL/////////
if($update->rowCount() > 0)
{
    $URL  = 'http://81.100.243.37:1991/SignUp_EmailConf/passwordChange.php';
    $URL .= '?key='.$key;
    //sendRecoveryEmail($user["name"], $email, $URL);
    



    ////////////TESTING/////////////////

    echo $URL;
}


?>