//////////////////////////////////////////////////
//                                              //
//              ONLOAD INITIALISE               //
//                                              //
//////////////////////////////////////////////////
function init()
{
    checkEmailInputs();

    checkPassInputs();

    checkNameInput();

    GEBID("btnSignUp").addEventListener("click",() => 
    {
        if(fullValidation())
        {

        }
        else
        {

        }
    });
}


//////////////////////////////////////////////////
//                                              //
//        NAME INPUT VALIDATION LISTENERS       //
//                                              //
//////////////////////////////////////////////////
function checkNameInput()
{

    GEBID("inputName").addEventListener('keyup', (event) =>
    {
        if (event.target.value.length > 0) //MINIMUM NAME LENGTH
        {
            FP(event.target, true) //CSS STYLE TO VALID 
        }
    });
}


//////////////////////////////////////////////////
//                                              //
//      EMAIL INPUT VALIDATION LISTENERS        //
//                                              //
//////////////////////////////////////////////////
function checkEmailInputs()
{
    //////////////////GET INPUTS///////////////////////
    var input =             GEBID("inputEmail");
    var inputConfirmation = GEBID("inputConfirmEmail");


    ////////REMEMBER IF FOCUS WAS LOST ON INPUTS///////
    eLostFocus =  false;
    ecLostFocus = false;

    ///////////////////////////////////////////////////
    // ------- INPUT KEYUP LISTENER INPUT 1 -------- //
    ///////////////////////////////////////////////////
    input.addEventListener('keyup', (event) =>
    {
        ///////////////VALIDATE EMAIL FORMAT//////////////
        if (emailIsValid(event.target.value))
        {
            FP(input, true); //CSS STYLE TO VALID
           
            inputConfirmation.disabled = false; //ENABLE CONFIRMATION EMAIL INPUT

            ///////////////ARE INPUTS IDENTICAL///////////////
            if (inputConfirmation.value.toLowerCase() == event.target.value.toLowerCase())
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

            //FOCUS LOST. CHECK ON KEYUP (DECREASE CHECK TOLERANCE)//
            if (eLostFocus)
            {
                FP(input, false);//CSS STYLE TO INVALID
            }
        }
    });


    ///////////////////////////////////////////////////
    // ------- INPUT CHANGE LISTENER INPUT 1 ------- //
    ///////////////////////////////////////////////////
    input.addEventListener('change', (event) =>
    {
        eLostFocus = true; //FOCUS LOST

        //VALIDATE EMAIL FORMAT
        if (!emailIsValid(event.target.value))
        {
            FP(input, false); //CSS STYLE TO INVALID
        }
    });


    ///////////////////////////////////////////////////
    // -------- INPUT KEYUP LISTENER INPUT 2 ------- //
    ///////////////////////////////////////////////////
    inputConfirmation.addEventListener('keyup', (event) =>
    {
        ///////////////ARE INPUTS IDENTICAL///////////////
        if (input.value.toLowerCase() == event.target.value.toLowerCase())
        {
            FP(inputConfirmation, true);//CSS STYLE TO VALID
        }
        else
        {
            //////////////////REMOVE TICK/////////////////////
            GEBID(inputConfirmation.id + "TC").innerHTML = "";

            //FOCUS LOST. CHECK ON KEYUP (DECREASE CHECK TOLERANCE)//
            if (ecLostFocus)
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
        ecLostFocus = true;  //FOCUS LOST

        ///////////////ARE INPUTS IDENTICAL///////////////
        if (input.value.toLowerCase() != event.target.value.toLowerCase())
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

}


//////////////////////////////////////////////////
//                                              //
//            FULL INPUT VALIDATION             //
//                                              //
//////////////////////////////////////////////////
function fullValidation()
{
    var isAllValid = true;

    //////////////////GET INPUTS///////////////////////
    inputs = document.getElementsByClassName("input");


    ///////////////////////////////////////////////////
    // ---------------- LOOP INPUTS ---------------- //
    ///////////////////////////////////////////////////
    for (var i = 0; i < inputs.length; i++)
    {
        ////////////FAIL IF INPUTS EMPTY//////////////
        if (inputs[i].value.length <= 0)
        {
            FP(inputs[i], false);
        }
         /////////////VALIDATE EMAIL//////////////////
        if (inputs[i].type == "email")
        {
            if (!emailIsValid(inputs[i].value))
            {
                isAllValid = false;
            }
        }
        /////////////VALIDATE PASSWORD////////////////
        if (inputs[i].type == "password")
        {
            if (!passIsValid(inputs[i].value))
            {
                isAllValid = false;
            }
        }
    }

    ////////CHECK INPUT MATCHES CONFIRMATION/////////
    if (GEBID("inputEmail").value.toLowerCase() != GEBID("inputConfirmEmail").value.toLowerCase() ||
        GEBID("inputPass").value !== GEBID("inputConfirmPass").value)
    {
        isAllValid = false;
    }

    //////////////ALL IS VALID//////////////////
    if (isAllValid) { return true }
}


//////////////////////////////////////////////////
//                                              //
//        PASSWORD VALIDATION CONDITIONS        //
//                                              //
//////////////////////////////////////////////////
function passIsValid(password)
{
    var pass = password.split(""); //PASSWORD CHARS TO ARRAY

    var hasLetters = false;
    var hasCapLetters = false;
    var hasNumbers = false;

    //////////PASSWORD VALIDATION CONDITIONS//////////
    if (pass.length >= 8)
    {
        
        ////////////LOOP CHARS AND LOOK FOR...////////////
        for (i = 0; i < pass.length; i++)
        {
            if (pass[i].match(/[A-Z]/g)) //CAPITAL LETTERS
            {
                hasCapLetters = true;
            }
            if (pass[i].match(/[a-z]/g)) //REGULAR LETTERS
            {
                hasLetters = true
            }
            if (pass[i].match(/[0-9]/g)) //NUMBERS
            {
                hasNumbers = true;
            }
        }
        
        ///////////MUST INCLUDE THESE TYPES//////////////
        if (hasLetters && hasCapLetters && hasNumbers) { return true }
    }
    else
    {
        //TOO SHORT
    }
}


//////////////////////////////////////////////////
//                                              //
//          EMAIL VALIDATION CONDITIONS         //
//                                              //
//////////////////////////////////////////////////
function emailIsValid(email)
{
    console.log(email)
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}


//////////////////////////////////////////////////
//                                              //
//       CHANGE CSS BASED ON VALIDATION         //
//                                              //
//////////////////////////////////////////////////
function FP(input, FP)
{

    ///////////////////////////////////////////////////
    // ----- EDIT CSS DEPENDANT ON VALIDATION ------ //
    ///////////////////////////////////////////////////
    if (FP)
    {
        GEBID(input.id + "TC").innerHTML = "✔";
        GEBID(input.id + "TC").style.color = "Green";
    }
    else
    {
        GEBID(input.id + "TC").innerHTML = "✖";
        GEBID(input.id + "TC").style.color = "red";
    }
}


//////////////////////////////////////////////////
//                                              //
//             GET EL BY ID SHORTCUT            //
//                                              //
//////////////////////////////////////////////////
function GEBID(ElID)
{
    return document.getElementById(ElID);
}











//////////////////////////////////////////////////
//                                              //
//                         //
//                                              //
//////////////////////////////////////////////////