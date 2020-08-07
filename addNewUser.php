<?php
/////////////////////////////////////////////////
// ------------------------------------------- //
// -      THIS SCRIPT WILL:                  - //
// -      1. VALIDATE USER INPUT             - //
// -      2. ADD NEW USER TO TABLE           - //
// -      3. TRIGGER CONFIRMATION EMAIL      - //
// ------------------------------------------- //
/////////////////////////////////////////////////

require 'sendEmail.php';

$errors = array();

/////////////////////////////////////////////////
// ----------------- INPUTS ------------------ //
/////////////////////////////////////////////////

if (isset($_POST["inputName"        ])) { $name   = $_POST["inputName"        ]; } else {$errors = logError($errors, 404, "Name Field Not Recieved", "0");}
if (isset($_POST["inputEmail"       ])) { $email  = $_POST["inputEmail"       ]; } else {$errors = logError($errors, 404, "Email Field Not Recieved", "0.1");}
if (isset($_POST["inputConfirmEmail"])) { $emailC = $_POST["inputConfirmEmail"]; } else {$errors = logError($errors, 404, "Email Confirmation Not Recieved", "0.2");}
if (isset($_POST["inputPass"        ])) { $pass   = $_POST["inputPass"        ]; } else {$errors = logError($errors, 404, "Password Not Recieved", "0.3");}
if (isset($_POST["inputConfirmPass" ])) { $passC  = $_POST["inputConfirmPass" ]; } else {$errors = logError($errors, 404, "Password Confirmation Not Recieved", "0.4");}

///////////RETURN LEVEL 1 ERROR CODES////////////
if(count($errors) > 0)
{
   relayError($errors);
}


/////////////////////////////////////////////////
// ---------------- VALIDATE ----------------- //
/////////////////////////////////////////////////


//////////////////DO POSTS CONTAIN DATA///////////////////
if (strlen(trim($name  )) < 1){$errors = logError($errors, 400, "Name Field Blank", "1.0");}
if (strlen(trim($email )) < 1){$errors = logError($errors, 400, "Email Field Blank", "1.1");}
if (strlen(trim($emailC)) < 1){$errors = logError($errors, 400, "Email Confirmation Field Blank", "1.2");}
if (strlen(trim($pass  )) < 1){$errors = logError($errors, 400, "Password Field Blank", "1.3");}
if (strlen(trim($passC )) < 1){$errors = logError($errors, 400, "Password Confirmation Field Blank", "1.4");}


//////////////////EMAILS MATCH///////////////////
if($email == $emailC)
{
    /////////////EMAIL FORMAT INCORRECT//////////////
    if (!filter_var($email, FILTER_VALIDATE_EMAIL))
    {
        $errors = logError($errors, 400,"Email Is An Incorrect Format", "2.1.1");
    }
}
///////////////EMAILS DON'T MATCH////////////////
else
{
    $errors = logError($errors, 400,"Emails Don't Match", "2.1");
}

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
    $errors = logError($errors, 400,"Passwords Don't Match", "2.2");
}

///////////IS EMAIL ALREADY REGISTERED///////////

$conn= new PDO("mysql:host=localhost;dbname=a1;","alex","alex");

$emailExists = $conn->query("SELECT count(1) FROM users where email = '$email'")->fetchColumn();

if($emailExists > 0)
{
    $errors = logError($errors, 400,"Email already exists", "2.3");
}


///////////RETURN LEVEL 2 ERROR CODES////////////
if(count($errors) > 0)
{
   relayError($errors);
}


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
    $errors = logError($errors, 500 ,"Database Insert Failed", "3.1");
    relayError($errors);
}



/////////////////////////////////////////////////
// --------- SEND CONFIRMATION EMAIL --------- //
/////////////////////////////////////////////////

/////SEND EMAIL IF INSERT WAS SUCCESSFUL/////////
if($insert->rowCount() > 0)
{
    $URL  = 'http://81.100.243.37:1991/SignUp_EmailConf/activateAccount.php';
    $URL .= '?key='.$key;
    echo ". sendEmail . ";//sendEmailActivation($name, $email, $URL);
}
    

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

?>