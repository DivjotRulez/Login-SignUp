/////////////////////////////////////////////////
// ------------------------------------------- //
// -    THIS SCRIPT WILL:                    - //
// -    1. VALIDATE USER INPUT               - //
// -    2. USE VALIDATION TO DIRECT USER     - //
// -    3. SEND DATA TO BE HANDLED BY PHP    - //
// ------------------------------------------- //
/////////////////////////////////////////////////


//////////////////////////////////////////////////
//                                              //
//              ONLOAD INITIALISE               //
//                                              //
//////////////////////////////////////////////////
function signUpInit()
{
    checkEmailInputs();

    checkPassInputs();

    checkNameInput();

    GEBID("btnSignUp").addEventListener("click",() => 
    {
        // if(fullValidation())
        // {
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
            postData(data, 'php/addNewUser.php').catch(errorHandler);
       // }
       
    });
}


//////////////////////////////////////////////////
//                                              //
//        NAME INPUT VALIDATION LISTENERS       //
//                                              //
//////////////////////////////////////////////////
function checkNameInput()
{
    var nLostFocus = false;

    ///////////////////////////////////////////////////
    // ------- INPUT KEYUP LISTENER INPUT 1 -------- //
    ///////////////////////////////////////////////////
    GEBID("inputName").addEventListener('keyup', (event) =>
    {
        if (event.target.value.length > 0) //MINIMUM NAME LENGTH
        {
            FP(event.target, true) //CSS STYLE TO VALID 
        }
        else
        {
            //////////////////REMOVE TICKS////////////////////
            GEBID(event.target.id + "TC").innerHTML = "";
           
            //FOCUS LOST. CHECK ON KEYUP (DECREASE CHECK TOLERANCE)//
            if (nLostFocus)
            {
                FP(event.target, false);//CSS STYLE TO INVALID
            }
        }
    });


    ///////////////////////////////////////////////////
    // ------- INPUT CHANGE LISTENER INPUT 1 ------- //
    ///////////////////////////////////////////////////
    GEBID("inputName").addEventListener('focusout', (event) =>
    {
        nLostFocus = true; //FOCUS LOST

        //VALIDATE NAME FORMAT
        if (event.target.value.length == 0) //MINIMUM NAME LENGTH
        {
            FP(event.target, false); //CSS STYLE TO INVALID
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

        strengthTest(input);
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
//         POST FIELD DATA TO PHP SCRIPT        //
//                                              //
//////////////////////////////////////////////////
function postData(data, url)
{
    var p = new Promise((resolve, reject) =>
    {
        var http = new XMLHttpRequest();
        http.open('POST', url, true);

        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function()
        { //Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200)
            {
                //alert(http.responseText);
                resolve(http);
            }
            if (http.readyState == 4 && http.status != 200)
            {
                //alert(JSON.parse(http.responseText).code+" : progress?!?!" + http.status);
                reject(http);
            }
        }
        http.send(objToQueryStr(data));

    });
    return p;
}


//////////////////////////////////////////////////
//                                              //
//               XHR ERROR HANDLER              //
//                                              //
//////////////////////////////////////////////////
function errorHandler(error)
{
    var errorMsg = "";
    
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
      }
    
}


//////////////////////////////////////////////////
//                                              //
//        CONVERT OBJECT TO QUERY STRING        //
//                                              //
//////////////////////////////////////////////////
function objToQueryStr(obj)
{
    var str = [];
    for (var p in obj)
    {
        if (obj.hasOwnProperty(p))
        {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    }
    return str.join("&");
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
//                 STRENGTH TEST                //          NOT IN USE!
//                                              //
//////////////////////////////////////////////////
function strengthTest(pass)
{
    var strPassword = pass;
	var charPassword = strPassword.split("");
	var minPasswordLength = 8;
	var baseScore = 0, score = 0;
	
	var num = {};
	num.Excess = 0;
	num.Upper = 0;
	num.Numbers = 0;
	num.Symbols = 0;

	var bonus = {};
	bonus.Excess = 3;
	bonus.Upper = 4;
	bonus.Numbers = 5;
	bonus.Symbols = 5;
	bonus.Combo = 0; 
	bonus.FlatLower = 0;
	bonus.FlatNumber = 0;


    if (charPassword.length >= minPasswordLength)
	{
		baseScore = 50;	
	}
	else
	{
		baseScore = 0;
    }
    
	for (i=0; i<charPassword.length;i++)
	{
		if (charPassword[i].match(/[A-Z]/g)) {num.Upper++;}
		if (charPassword[i].match(/[0-9]/g)) {num.Numbers++;}
		if (charPassword[i].match(/(.*[!,@,#,$,%,^,&,*,?,_,~])/)) {num.Symbols++;} 
	}
	
	num.Excess = charPassword.length - minPasswordLength;
	
	if (num.Upper && num.Numbers && num.Symbols)
	{
		bonus.Combo = 25; 
	}

	else if ((num.Upper && num.Numbers) || (num.Upper && num.Symbols) || (num.Numbers && num.Symbols))
	{
		bonus.Combo = 15; 
	}
	
	if (strPassword.match(/^[\sa-z]+$/))
	{ 
		bonus.FlatLower = -15;
	}
	
	if (strPassword.match(/^[\s0-9]+$/))
	{ 
		bonus.FlatNumber = -35;
    }

    score = baseScore + (num.Excess*bonus.Excess) + (num.Upper*bonus.Upper) + (num.Numbers*bonus.Numbers) + 
(num.Symbols*bonus.Symbols) + bonus.Combo + bonus.FlatLower + bonus.FlatNumber;

return score;

}