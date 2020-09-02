<?php 
session_start(); 
if(isset($_SESSION["username" ]))
{
echo $_SESSION["username" ];
}

?>

<br>

<?php
if(!isset($_SESSION["username" ]))
{
    echo '<a href = "signup.php">Sign Up</a>';
}
?>

<br>

<?php

if(isset($_SESSION["username" ]))
{
    echo '<a href = "php/logout.php">Logout</a>';
}
else
{
    echo '<a href = "login.php">Login </a>';
}
 
?>
