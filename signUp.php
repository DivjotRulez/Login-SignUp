
<html>

<head>
  <link rel="stylesheet" href="css/signUpMain.css">
  <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
    <script type='text/javascript' src='js/signUp.js'></script>
        <script type='text/javascript' src='js/common.js'></script>
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <title>Sign in</title>
</head>

<body onload = "signUpInit();">
  <main id = "main">
    <p id="formTitle">Sign Up</p>
    <form id="form">
        
        <input id = "inputName" type="text" name="name" maxlength="128" class = "input" placeholder="Name" required><span class = "tc"  id = "inputNameTC"></span>
        
        <input id="inputEmail" type="text"  placeholder="Email" class = "input"><span class = "tc"  id = "inputEmailTC"></span>
        
        <input id="inputConfirmEmail" type="text"  placeholder="Confirm Email" class = "input" disabled><span class = "tc"  id = "inputConfirmEmailTC"></span>
        
        <input id="inputPass" type="password" placeholder="Password" class = "input"><span  id = "inputPassTC" class = "tc"></span>
        

        <div id = "passReqs">


        <span class = "passReq" ><b>Must Include At Least;</b></span><br>
        <span class = "passReq" >8 Charaters</span><span class="tc2" id = "lentik" > ✔</span><br>
            <span class = "passReq">One Lower Case</span><span id = "Ltik" class="tc2"> ✔</span><br>
            <span class = "passReq">One Upper Case</span><span id = "Utik" class="tc2"> ✔</span><br>
            <span class = "passReq">One Number</span><span id = "Ntik" class="tc2"> ✔</span>

        </div>

        <input id="inputConfirmPass" type="password"  placeholder="Confirm Password" class = "input"  disabled><span class = "tc" id = "inputConfirmPassTC"></span>
        
        <p id = "txtResponse"></p>
 
      <a id = "btnSubmit" >Sign Up</a>
        
        <p id = "txtAlreadySignedUp" >Already Got An Account? <a id = "AAlreadySignedUp" href="login.php">Login</a></p>

        <br>
        
      </form>
    </main>
     
</body>

</html>