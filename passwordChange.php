
<html>

<head>
  <link rel="stylesheet" href="css/passwordChangeMain.css">
  <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <script type='text/javascript' src='js/passwordChange.js'></script>
        <script type='text/javascript' src='js/common.js'></script>
  
  <title>Change Password</title>
</head>

<body onload = "passwordChangeInit();">
  <main id = "main">
    <p id="formTitle">New Password</p>
    <form id="form">
      <input id="inputConfirmEmail" type="Email"    placeholder="Confirm Email"    class = "input">
      <input id="inputPass"         type="password" placeholder="Password"         class = "input">
      <input id="inputConfirmPass"  type="password" placeholder="Confirm Password" class = "input">
      <input id="key"               type ="hidden"  class = "input"                value ="<?php echo $_GET["key"]; ?>">
      <p id = "txtResponse" style="display: none;"></p>

      <a id = "btnSubmit" >Change</a>
             
    </form>
  </main>
     
</body>

</html>
