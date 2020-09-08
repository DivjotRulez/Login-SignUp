<?php
  session_start(); 
  
  if(!isset($_SESSION["email"]))
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
  
  <title>Change Password</title>
</head>

<body onload = "changePassInit();">
  <main>
    <p id="formTitle"></p>
    <form id="form">
      
      <input id="inputPass"        type="password" placeholder="Password" class = "input">
      <input id="inputConfirmPass" type="password" placeholder="Password" class = "input">
      <input type ="hidden"  value ="<?php echo $_GET["key"]; ?>">
      <p id = "txtResponse" style="display: none;"></p>

      <a id = "btnSubmit" >Change</a>
             
    </form>
  </main>
     
</body>

</html>

  <?php } ?>