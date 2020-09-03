
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
    <p id="signUp" align="center">Sign Up</p>
    <form id="formSignUp">
        
        <input id = "inputName" type="text" name="name" maxlength="128" class = "input" placeholder="Name" required><span class = "tc"  id = "inputNameTC"></span>
        
        <input id="inputEmail" type="text"  placeholder="Email"><span class = "tc"  id = "inputEmailTC"></span>
        
        <input id="inputConfirmEmail" type="text"  placeholder="Confirm Email" disabled><span class = "tc"  id = "inputConfirmEmailTC"></span>
        
        <input id="inputPass" type="password" placeholder="Password"><span  id = "inputPassTC" class = "tc"></span>
        

        <div id = "passReqs">


        <span class = "passReq" ><b>Must Include At Least;</b></span><br>
        <span class = "passReq" >8 Charaters</span><span class="tc2" id = "lentik" > ✔</span><br>
            <span class = "passReq">One Lower Case</span><span id = "Ltik" class="tc2"> ✔</span><br>
            <span class = "passReq">One Upper Case</span><span id = "Utik" class="tc2"> ✔</span><br>
            <span class = "passReq">One Number</span><span id = "Ntik" class="tc2"> ✔</span>

        </div>


        <input id="inputConfirmPass" type="password"  placeholder="Confirm Password" disabled><span class = "tc" id = "inputConfirmPassTC"></span>
        
      <a id = "btnSignUp" >Sign Up</a>
        
        <p id = "alreadySignedUp" >Already Got An Account? <a href="#">Login</a></p>
        
      </form>
    </main>
     
</body>

</html>