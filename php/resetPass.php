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

if($user)
{
    $errors = logError($errors, 400,"Email Is Not Registered", "2.3");
    relayError($errors);
}
echo $user["userID"];

/////////////////////////////////////////////////
// --------- INSERT INTO USERS TABLE --------- //
/////////////////////////////////////////////////
 
$key = rand();
$active = 0;

$insert = $conn->prepare
(
    "INSERT INTO users 
    (name,  email,  password, activationKey, isActive) VALUES 
   (:name, :email, :password, :key,         :active)"
);

$insert->bindParam(":name"    , $name  );
$insert->bindParam(":email"   , $email );
$insert->bindParam(":password", $pass  );
$insert->bindParam(":key"     , $key   );
$insert->bindParam(":active"  , $active);

$insert -> execute();

if($insert->rowCount() < 1)
{
    //$errors = logError($errors, 500 ,"Database Insert Failed", "3.1");
    //relayError($errors);
}



/////////////////////////////////////////////////
// --------------- SEND EMAIL ---------------- //
/////////////////////////////////////////////////

/////SEND EMAIL IF INSERT WAS SUCCESSFUL/////////
if($insert->rowCount() > 0)
{
    $URL  = 'http://81.100.243.37:1991/SignUp_EmailConf/php/activateAccount.php';
    $URL .= '?key='.$key;
    //sendEmailActivation($name, $email, $URL);
    



    ////////////TESTING/////////////////

    echo $URL;
}


?>