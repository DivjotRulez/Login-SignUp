
/////////////////////////////////////////////////
// ------------------------------------------- //
// -    THIS SCRIPT WILL:                    - //
// -    1. SEND DATA TO BE HANDLED BY PHP    - //
// -    2. HANDLE RETURNED ERRORS            - //
// ------------------------------------------- //
/////////////////////////////////////////////////


//////////////////////////////////////////////////
//                                              //
//              ONLOAD INITIALISE               //
//                                              //
//////////////////////////////////////////////////
function passwordChangeInit()
{
   
    checkEmailInputs();
    checkPassInputs();


    GEBID("btnSubmit").addEventListener("click",() => 
    {
            var data = {}; //DATA TO POST
            
            //////////////////GET INPUTS///////////////////////
            inputs = document.getElementsByClassName("input");

            ///////////////////////////////////////////////////
            // ---------------- LOOP INPUTS ---------------- //
            ///////////////////////////////////////////////////
            for (var i = 0; i < inputs.length; i++)
            {
               data[inputs[i].id] = inputs[i].value;                
            }
           
            /////////////////POST INPUTS//////////////////////
            postData(data, 'php/passwordChange.php').then((p)=>
            {
                
               if(p.status == 200)
               {

                   /////CONFIRM TO USER
                //    GEBID("inputEmail").style.display = "none";
                //    GEBID("txtBack").style.display = "none";
                    GEBID("main").innerHTML = `

                    <p id="formTitle"> Password Changed</p>
                    <p id = "txtConf">Your Password Has Been Updated 
                                        <br>
                                          Please Now Login Using Your New Details 
                    </p>
                
                    <form id="form">
                        <a href = "login.php" id = "btnSubmit" >Login</a>
                        <br>
                    </form>
                `;

                    GEBID("main").style.height = "250px";
                    
               }
           
            }).catch(errorHandler);
    });
}


//////////////////////////////////////////////////
//                                              //
//               XHR ERROR HANDLER              //
//                                              //
//////////////////////////////////////////////////
function errorHandler(error)
{    
    var rTxt     = JSON.parse(error.responseText)[0];

    var rMsg     = rTxt.msg;
    var rCode    = rTxt.code;
    var httpCode = error.status;

    switch (httpCode) {
        case 400:
          alert("400");
          break;

        case 404:
          alert("404");
          break;

          case 401:
          alert("404");
          break;
      }

      GEBID("txtResponse")     .innerHTML          = rMsg;
  
}































//////////////////////////////////////////////////
//                                              //
//      EMAIL INPUT VALIDATION LISTENERS        //
//                                              //
//////////////////////////////////////////////////
function checkEmailInputs()
{
    //////////////////GET INPUTS///////////////////////
    var inputConfirmation = GEBID("inputConfirmEmail");


    ////////REMEMBER IF FOCUS WAS LOST ON INPUTS///////
    eLostFocus =  false;

    ///////////////////////////////////////////////////
    // ------- INPUT KEYUP LISTENER INPUT 1 -------- //
    ///////////////////////////////////////////////////
    inputConfirmation.addEventListener('keyup', (event) =>
    {
        ///////////////VALIDATE EMAIL FORMAT//////////////
        if (emailIsValid(event.target.value))
        {
            FP(inputConfirmation, true); //CSS STYLE TO VALID
        }
        else
        {
            //////////////////REMOVE TICKS////////////////////
            GEBID(inputConfirmation.id + "TC").innerHTML = "";

            //FOCUS LOST. CHECK ON KEYUP (DECREASE CHECK TOLERANCE)//
            if (eLostFocus)
            {
                FP(inputConfirmation, false);//CSS STYLE TO INVALID
            }
        }
    });


    ///////////////////////////////////////////////////
    // ------- INPUT CHANGE LISTENER INPUT 1 ------- //
    ///////////////////////////////////////////////////
    inputConfirmation.addEventListener('change', (event) =>
    {
        eLostFocus = true; //FOCUS LOST

        //VALIDATE EMAIL FORMAT
        if (!emailIsValid(event.target.value))
        {
            FP(inputConfirmation, false); //CSS STYLE TO INVALID
        }
    });

}



//////////////////////////////////////////////////
//                                              //
//     PASSWORD INPUT VALIDATION LISTENERS      //
//                                              //
//////////////////////////////////////////////////
function checkPassInputs()
{
    //////////////////GET INPUTS///////////////////////
    var input =             GEBID("inputPass");
    var inputConfirmation = GEBID("inputConfirmPass");

    ////////REMEMBER IF FOCUS WAS LOST ON INPUT////////
    var pLostFocus = false;
    var pcLostFocus = false;

    ///////////////////////////////////////////////////
    // ------- INPUT KEYUP LISTENER INPUT 1 -------- //
    ///////////////////////////////////////////////////
    input.addEventListener('keyup', (event) =>
    {
        /////////////VALIDATE PASSWORD FORMAT////////////
        if (passIsValid(event.target.value))
        {
            FP(input, true); //CSS STYLE TO VALID

            inputConfirmation.disabled = false; //ENABLE CONFIRMATION EMAIL INPUT
            inputConfirmation.classList.remove("disabled"); //Add disabled class to manip css

            GEBID("passReqs").style.display = "none"; //hide password requierments
            
            ///////////////ARE INPUTS IDENTICAL///////////////
            if (inputConfirmation.value == event.target.value)
            {
                FP(inputConfirmation, true); //CSS STYLE TO VALID
            }

        }
        else
        {
            //////////////////REMOVE TICKS////////////////////
            GEBID(input            .id + "TC").innerHTML = "";
            GEBID(inputConfirmation.id + "TC").innerHTML = "";

            inputConfirmation.disabled = true; //DISABLE CONFIRMATION EMAIL INPUT
            inputConfirmation.classList.add("disabled");

            GEBID("passReqs").style.display = "block";//show password requierments
            

            //FOCUS LOST. CHECK ON KEYUP (DECREASE CHECK TOLERANCE)//
            if (pLostFocus)
            {
                FP(input, false); //CSS STYLE TO INVALID
            }
        }
    });


    ///////////////////////////////////////////////////
    // ------- INPUT CHANGE LISTENER INPUT 1 ------- //
    ///////////////////////////////////////////////////
    input.addEventListener('change', (event) =>
    {
        //email lost focus
        pLostFocus = true;

        //VALIDATE PASSWORD FORMAT
        if (!passIsValid(event.target.value))
        {
            FP(input, false);
        }
    });


    ///////////////////////////////////////////////////
    // -------- INPUT KEYUP LISTENER INPUT 2 ------- //
    ///////////////////////////////////////////////////
    inputConfirmation.addEventListener('keyup', (event) =>
    {
        //ARE INPUTS IDENTICAL
        if (input.value == event.target.value)
        {
            // FP PASS inputConf
            FP(inputConfirmation, true);
        }
        else
        {
            //////////////////REMOVE TICKS////////////////////
            GEBID(inputConfirmation.id + "TC").innerHTML = "";
            
            //FOCUS LOST. CHECK ON KEYUP (DECREASE CHECK TOLERANCE)//
            if (pcLostFocus)
            {
                
                FP(inputConfirmation, false); //CSS STYLE TO INVALID
            }
        }
    });


    ///////////////////////////////////////////////////
    // ------- INPUT CHANGE LISTENER INPUT 2 ------- //
    ///////////////////////////////////////////////////
    inputConfirmation.addEventListener('change', (event) =>
    {
        pcLostFocus = true; //FOCUS LOST

        ///////////////ARE INPUTS IDENTICAL///////////////
        if (input.value != event.target.value)
        {
            FP(inputConfirmation, false); //CSS STYLE TO INVALID
        }

    });


    ///////////////////////////////////////////////////
    // ------- INPUT CLICK LISTENER INPUT 1 -------- //
    ///////////////////////////////////////////////////
    input.addEventListener('click', () =>
    {
        ///////////SHOW PASSWORD REQUIERMENTS/////////////
        GEBID("passReqs").style.display = "block";
     
    }); 

    ///////////////////////////////////////////////////
    // ------- INPUT KEYUP LISTENER INPUT 1 -------- //
    ///////////////////////////////////////////////////
    input.addEventListener('keyup', (event) =>
    {
      
        //////////PASSWORD VALIDATION CONDITIONS//////////

        ///////////TICK COMPLETED REQUIERMENTS////////////

        if (input.value.length >= 8 && input.value.length <= 16)
        {
            GEBID("lentik").style.display = "inline"
        }
        else
        {
            GEBID("lentik").style.display = "none"
        }

        if (input.value.match(/[A-Z]/)) //CAPITAL LETTERS
        {
            GEBID("Utik").style.display = "inline"
        }
        else
        {
            GEBID("Utik").style.display = "none"
        }

        if (input.value.match(/[a-z]/)) //REGULAR LETTERS
        {
            GEBID("Ltik").style.display = "inline"
        }
        else
        {
            GEBID("Ltik").style.display = "none"
        }

        if (input.value.match(/[0-9]/)) //NUMBERS
        {
            GEBID("Ntik").style.display = "inline"
        }
        else
        {
            GEBID("Ntik").style.display = "none"
        }
        
    });

}


