<?php session_start(); ?>

<!DOCTYPE html>
<html lang="en"><!--Index Page--> 

    <head>

        <meta charset="utf-8"> <!--Set Charset-->
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script type='text/javascript' src='js/ValScript.js'></script>
        <link rel="stylesheet" type="text/css" href="css/main.css"><!--Includes CSS File-->
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
                      
                    <!--Choose Layout--> 
                   <?php require 'layout/signUpV.php'; ?>
                    
                    </form>
               </div> 
            </main>  
        </div><!--Body Wrapper-->
    </body><!--body-->
</html><!--Index Page-->

<?php unset($_SESSION["error"]); ?>