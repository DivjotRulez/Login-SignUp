<?php
  session_start(); 
  
  if(isset($_SESSION["email"]))
  {
    ///GO TO INDEX
  }
  else
  {
?>

<html>

  <head>
    <link rel="stylesheet" href="css/loginMain.css">
    <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type='text/javascript' src='js/login.js'></script>
    <script type='text/javascript' src='js/common.js'></script>
    <title>Sign in</title>
  </head>

  <body onload = "loginInit();">

    <main>

      <p id="formTitle">Sign in</p>

      <form id="form">
        
        <input id="inputEmail" type="text"  placeholder="Username" class = "input">
        <input id="inputPass" type="password" placeholder="Password" class = "input">

        <p id = "txtResponse"></p>

        <a id = "btnSubmit" >Sign in</a>
        <p id = "txtNeedAnAccount" >Not Got An Account? <a href="signUp.php">Sign Up</a></p>
        <p id = "txtForgotPass" ><a id = "aForgotPass" href="requestPassReset.php">Forgot Password?</a></p>
       <br>
      </form>
    </main>
  </body>
</html>

<?php
  }
?>