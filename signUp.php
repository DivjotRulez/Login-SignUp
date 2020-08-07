<?php session_start(); ?>

<!DOCTYPE html>
<html lang="en"><!--Index Page--> 

    <head>

        <meta charset="utf-8"> <!--Set Charset-->
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script type='text/javascript' src='js/ValScript.js'></script>
        <link rel="stylesheet" type="text/css" href=""><!--Includes CSS File-->
        <link rel="shortcut icon" type="image/x-icon" href=""> <!--Set Favicon-->
        
        

        <title></title> <!--Page Title-->
    
    </head>
    
    <body onload="init();">
 
        <div id = "wrapper"><!--Body Wrapper-->
        

            <header><!--Header Page Top-->
                
                <h1 id = "title"></h1> <!--Website Title-->
                
            </header><!--Header Page Top--> 

        
            <main> 
                <div id = "SignUpForm">
                    <form method="post" action="">
                        <table>
                            <tr>
                                 <td>Name</td> 
                                 <td><input id = "inputName" type="text" name="name" maxlength="128" class = "input"></td>
                                 <td><span  id = "inputNameTC"></span></td>                             
                            </tr>
                            <tr>
                                <td>Email</td> 
                                <td><input id = "inputEmail" type="email" name="email" maxlength="128" class = "input"></td>
                                <td><span  id = "inputEmailTC"></span></td>
                            </tr>
                            <tr>
                                <td>Confirm Email</td> 
                                <td><input id = "inputConfirmEmail" type="email" name="ConfirmEmail" maxlength="128" class = "input" disabled></td>
                                <td><span  id = "inputConfirmEmailTC"></span></td>                                                                
                            </tr>
                            <tr>
                                <td>Password</td> 
                                <td><input id = "inputPass" type="" name="pass" maxlength="24" class = "input"></td>
                                <td><span  id = "inputPassTC"></span></td>                             
                            </tr>
                            <tr>
                                <td>Confirm Password</td> 
                                <td><input id = "inputConfirmPass" type="password" name="ConfirmPass" maxlength="24" class = "input" disabled></td>
                                <td><span  id = "inputConfirmPassTC"></span></td>                         
                            </tr>

                            <tr>
                                <td colspan='3' id = "error"></td> 
                            </tr>
                       
                            <tr>
                                <td><input id = "btnSignUp" name = "submit" type="button" value="Sign Up"></td>
                                <td></td>                          
                            </tr>
                        </table>
                    </form>
               </div> 
            </main>  
        </div><!--Body Wrapper-->
    </body><!--body-->
</html><!--Index Page-->

<?php unset($_SESSION["error"]); ?>