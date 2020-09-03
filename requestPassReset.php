<html>

<head>
  <link rel="stylesheet" href="css/reqPassResetMain.css">
  <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <script type='text/javascript' src='js/common.js'></script>
  <script type='text/javascript' src='js/requestPassReset.js'></script>

  <title>ASFDGHK</title>
</head>

<body onload = "rprInit();">
  <main id = "main">
    <p id="formTitle"> Request Password Reset</p>

    <form id="form">
      <input id="inputEmail" type="text"  placeholder="Email" class = "input">
      <p id = "txtResponse" style="display: none;"></p>
      <a id = "btnSubmit" >Submit</a>

      <p id = "txtBack" ><a id = "aBack" href="login.php">Back to Login</a></p>
        
      </form>
    </main>
     
</body>

</html>