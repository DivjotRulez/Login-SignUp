<?php
/////////////////////////////////////////////////
// ------------------------------------------- //
// -      THIS SCRIPT WILL:                  - //
// -      1. VALIDATE USER INPUT             - //
// -      2. CHANGE USER PASSWORD            - //
// ------------------------------------------- //
/////////////////////////////////////////////////

require 'common.php';

/////////////////////////////////////////////////
// ----------------- INPUTS ------------------ //
/////////////////////////////////////////////////

if (isset($_POST["inputConfirmEmail"])) { $emailC = $_POST["inputConfirmEmail"]; } else {$errors = logError($errors, 404, "Email Confirmation Not Recieved", "0.2");}
if (isset($_POST["inputPass"        ])) { $pass   = $_POST["inputPass"        ]; } else {$errors = logError($errors, 404, "Password Not Recieved", "0.3");}
if (isset($_POST["inputConfirmPass" ])) { $passC  = $_POST["inputConfirmPass" ]; } else {$errors = logError($errors, 404, "Password Confirmation Not Recieved", "0.4");}
if (isset($_POST["key"              ])) { $key    = $_POST["key"              ]; } else {$errors = logError($errors, 404, "Key Not Recieved", "0.5");}

///////////RETURN LEVEL 1 ERROR CODES////////////
if(count($errors) > 0)
{
   relayError($errors);
}


/////////////////////////////////////////////////
// ---------------- VALIDATE ----------------- //
/////////////////////////////////////////////////


//////////////////DO POSTS CONTAIN DATA///////////////////

if (strlen(trim($emailC)) < 1){$errors = logError($errors, 400, "Email Confirmation Field Blank", "1.2");}
if (strlen(trim($pass  )) < 1){$errors = logError($errors, 400, "Password Field Blank", "1.3");}
if (strlen(trim($passC )) < 1){$errors = logError($errors, 400, "Password Confirmation Field Blank", "1.4");}
if (strlen(trim($key   )) < 1){$errors = logError($errors, 400, "Key Field Blank", "1.5");}


/////////////////PASSWORDS MATCH//////////////////
if($pass == $passC)
{
    /////////////CHECK PASSWORD LENGTH///////////////
    if(strlen($pass) >= 8)
    {
        //////////////CHECK PASSWORD FROMAT//////////////
        if(!preg_match("#[0-9]+#",$pass)) 
        {
            $errors = logError($errors, 400,"Password Must Include At least 1 Number", "2.2.2.0");
        }
        elseif(!preg_match("#[A-Z]+#",$pass)) 
        {
            $errors = logError($errors, 400,"Password Must Include At least 1 Capital Letter", "2.2.2.1");
        }
        elseif(!preg_match("#[a-z]+#",$pass)) 
        {
            $errors = logError($errors, 400,"Password Must Include At least 1 Standard Letter", "2.2.2.2");
        }
    }
    //////////INSUFFICIENT PASSWORD LENGTH///////////
    else
    {
        $errors = logError($errors, 400,"Password Length Must Be At Least 8", "2.2.1");
    }
}
/////////////PASSWORDS DO NOT MATCH//////////////
else
{
    $errors = logError($errors, 400,"Passwords Don't Match", "2.2"); relayError($errors);
}


/////////////////////////////////////////////////
// ---------- FIND USER IN DATABASE ---------- //
/////////////////////////////////////////////////
$conn = conn("localhost","a1","alex","alex");

$userTable = "users";
$emailCol  = "email";
$keyCol   = "activationKey";

$userQ = $conn -> prepare("SELECT * FROM $userTable WHERE $emailCol=:email AND $keyCol=:key");
$userQ -> bindParam(":email", $emailC);
$userQ -> bindParam(":key", $key);
$userQ -> execute();

$user = $userQ -> fetch();

if(!$user) //If no results Returned
{
    $errors = logError($errors, 401,"Email / Key not reconised", "3");
    relayError($errors);
}


/////////////////////////////////////////////////
// -------- UPDATE USER PASSWORD TABLE ------- //
/////////////////////////////////////////////////

$emailC = $user["email"];
$update = $conn->prepare
(
    "UPDATE users
    SET password = :password
    WHERE email = :email;"
);

$update->bindParam(":password", $pass   );
$update->bindParam(":email"   , $emailC );


$update -> execute();

if($update->rowCount() < 1 && $pass != $user["password"] )
{
    $errors = logError($errors, 500 ,"Database update Failed", "3.1");
    relayError($errors);
}




// /////IF UPDATE WAS SUCCESSFUL/////////
// if($insert->rowCount() > 0)
// {
    
// }


?>