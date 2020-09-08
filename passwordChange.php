
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
      <input id="inputConfirmEmail" type="Email"    placeholder="Confirm Email"    class = "input"><span class = "tc"  id = "inputConfirmEmailTC"></span>
      <input id="inputPass"         type="password" placeholder="Password"         class = "input"><span  id = "inputPassTC" class = "tc"></span>

      <div id = "passReqs">


<span class = "passReq" ><b>Must Include At Least;</b></span><br>
<span class = "passReq" >8 Charaters</span><span class="tc2" id = "lentik" > ✔</span><br>
    <span class = "passReq">One Lower Case</span><span id = "Ltik" class="tc2"> ✔</span><br>
    <span class = "passReq">One Upper Case</span><span id = "Utik" class="tc2"> ✔</span><br>
    <span class = "passReq">One Number</span><span id = "Ntik" class="tc2"> ✔</span>

</div>

      <input id="inputConfirmPass"  type="password" placeholder="Confirm Password" class = "input"><span class = "tc" id = "inputConfirmPassTC"></span>
      <input id="key"               type ="hidden"  class = "input"                value ="<?php echo $_GET["key"]; ?>">
      <p id = "txtResponse"></p>

      <p><a id = "btnSubmit" >Change</a></p>

      <br>
             
    </form>
  </main>
     
</body>

</html>
