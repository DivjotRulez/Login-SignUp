function init()
{
    checkEmailInputs();

    checkPassInputs();

    checkNameInput();

    GEBID("btnSignUp").addEventListener("click", btnSignUp);

   

    
}

function checkNameInput()
{
  GEBID("inputName").addEventListener('keyup', (event) =>
  {
    if(event.target.value.length > 0)
    {
      
      FP(event.target,true)
    }

  });
  

}

function checkEmailInputs()
{
    var input = GEBID("inputEmail");
    var inputConfirmation = GEBID("inputConfirmEmail");

    eLostFocus = false;

    //INPUT KEYUP LISTENER
    input.addEventListener('keyup', (event) =>
    {
        //VALIDATE EMAIL FORMAT
        if (emailIsValid(event.target.value))
        {
            // FP PASS input
            FP(input, true);

            //ENABLE CONFIRMATION EMAIL INPUT
            inputConfirmation.disabled = false;

            //ARE INPUTS IDENTICAL
            if (inputConfirmation.value.toLowerCase() == event.target.value.toLowerCase())
            {
                // FP PASS inputConf
                FP(inputConfirmation, true);
            }

        }
        else
        {

            GEBID(input.id + "TC").innerHTML = "";
            GEBID(inputConfirmation.id + "TC").innerHTML = "";
            //Disable conf box
            inputConfirmation.disabled = true;

            //if focus was lost check on keyup
            if (eLostFocus)
            {
                // FP FAIL input
                FP(input, false);
            }
        }
    });

    input.addEventListener('change', (event) =>
    {
        //email lost focus
        eLostFocus = true;

        //VALIDATE EMAIL FORMAT
        if (!emailIsValid(event.target.value))
        {
            FP(input, false);
        }
    });





    ecLostFocus = false;

    //INPUT CONFIRMATION KEYUP LISTENER
    inputConfirmation.addEventListener('keyup', (event) =>
    {
        //ARE INPUTS IDENTICAL
        if (input.value.toLowerCase() == event.target.value.toLowerCase())
        {
            // FP PASS inputConf
            FP(inputConfirmation, true);
        }
        else
        {
          GEBID(inputConfirmation.id + "TC").innerHTML = "";
            //if emailConf lost focus check on keyup
            if (ecLostFocus)
            {
                // FP FAIL input
                FP(inputConfirmation, false);
            }
        }
    });

    //INPUT CONFIRMATION CHANGE LISTENER
    inputConfirmation.addEventListener('change', (event) =>
    {
        //email conf focus lost
        ecLostFocus = true;

        //do inputs match
        if (input.value.toLowerCase() != event.target.value.toLowerCase())
        {
            // FP FAIL input
            FP(inputConfirmation, false);
        }

    });

}


function checkPassInputs()
{
    var input = GEBID("inputPass");
    var inputConfirmation = GEBID("inputConfirmPass");

    var pLostFocus = false;

    //INPUT KEYUP LISTENER
    input.addEventListener('keyup', (event) =>
    {
        //VALIDATE EMAIL FORMAT
        if (passIsValid(event.target.value))
        {
            // FP PASS input
            FP(input, true);

            //ENABLE CONFIRMATION EMAIL INPUT
            inputConfirmation.disabled = false;

            //ARE INPUTS IDENTICAL
            if (inputConfirmation.value == event.target.value)
            {
                // FP PASS inputConf
                FP(inputConfirmation, true);
            }

        }
        else
        {

            GEBID(input.id + "TC").innerHTML = "";
            GEBID(inputConfirmation.id + "TC").innerHTML = "";
            //Disable conf box
            inputConfirmation.disabled = true;

            //if focus was lost check on keyup
            if (pLostFocus)
            {
                // FP FAIL input
                FP(input, false);
            }
        }
    });

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





    var pcLostFocus = false;

    //INPUT CONFIRMATION KEYUP LISTENER
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
          GEBID(inputConfirmation.id + "TC").innerHTML = "";
            //if emailConf lost focus check on keyup
            if (pcLostFocus)
            {
                // FP FAIL input
                FP(inputConfirmation, false);
            }
        }
    });

    //INPUT CONFIRMATION CHANGE LISTENER
    inputConfirmation.addEventListener('change', (event) =>
    {
        //email conf focus lost
        pcLostFocus = true;

        //do inputs match
        if (input.value != event.target.value)
        {
            // FP FAIL input
            FP(inputConfirmation, false);
        }

    });

}


function btnSignUp()
{

  
    
    var isAllValid = true;

    inputs = document.getElementsByClassName("input");

    for(var i = 0; i < inputs.length; i++)
    {
     // console.log(inputs[i].id +" : "+inputs[i].value +" : "+inputs[i].value.length);
      
      if(inputs[i].value.length <= 0)
      {
        FP(inputs[i], false);
      }
      if(inputs[i].type == "email")
      {
        if(!emailIsValid(inputs[i].value))
        {
          isAllValid = false;
        }
      }
      if(inputs[i].type == "password")
      {
        if(!passIsValid(inputs[i].value))
        {
          isAllValid = false;
        }
      }
    }
   
    if(GEBID("inputEmail").value.toLowerCase() != GEBID("inputConfirmEmail").value.toLowerCase()  ||  
       GEBID("inputPass").value !== GEBID("inputConfirmPass").value)
    {
      isAllValid = false;
    }

    if(isAllValid)
    {
      console.log("VALID!!!!!")
    }
}



//Validate Password
function passIsValid(password)
{
console.log(password)



var pass = password.split("");

 var hasLetters    = false;
 var hasCapLetters = false;
 var hasNumbers    = false;

  if(pass.length >= 8)
  {
    for (i=0; i<pass.length;i++)
    {
      if (pass[i].match(/[A-Z]/g)) 
      {
        hasCapLetters = true;
      }
      if (pass[i].match(/[a-z]/g)) 
      {
        hasLetters = true
      }
      if (pass[i].match(/[0-9]/g)) 
      {
        hasNumbers = true;
      }
    }
    if(hasLetters && hasCapLetters && hasNumbers)
    {
      return true
    }
  }
  else
  {
    //TOO SHORT
  }    
}
//Validate Email Format
function emailIsValid(email)
{
    console.log(email)
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
//Get ElementByID shortcut
function GEBID(ElID)
{
    return document.getElementById(ElID);
}
//Perform dependant on pass/fail (true/false) of input validation
function FP(input, FP)
{

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

















//   document.getElementById("inputEmailTC").style.Color = "red";
//     //Get Inputs
//     var input = GEBID("inputEmail");
//     var inputConfirmation = GEBID("inputConfirmEmail");

//     //INPUT ONE KEYUP LISTENER
//     input.addEventListener('keyup', (event) =>
//     {

//         //VALIDATE EMAIL FORMAT
//         if (emailIsValid(event.target.value))
//         {
          
//             console.log("VALID EMAIL");

//             //ENABLE CONFIRMATION EMAIL INPUT
//             inputConfirmation.disabled = false;

//             //ARE INPUTS IDENTICAL
//             if (inputConfirmation.value.toLowerCase() == event.target.value.toLowerCase())
//             {
//                 console.log("EMAIL MATCH");

//                 // GEBID(event.target.id+"TC").innerHTML = "✔";
//                 // GEBID(event.target.id+"TC").style.color = "Green";
//                 FP(input,true);
//             }
//         }
//         //INCORRECT EMAIL FORMAT
//         else
//         {
//             console.log("INVALID EMAIL");
//             //DISABLE CONFIRMATION EMAIL INPUT
//             inputConfirmation.disabled = true;
//         }
//     });


    

//     //INPUT CONFIRMATION CHANGE LISTENER
//     inputConfirmation.addEventListener('change', (event) =>
//     {
//         //ARE INPUTS IDENTICAL
//         if (input.value.toLowerCase() == event.target.value.toLowerCase())
//         {
//             console.log("EMAIL MATCH");
//         }

//         else //INPUTS NOT IDENTICAL
//         {
//             console.log("no match");

//             //INPUT CONFIRMATION KEYUP LISTENER
//             inputConfirmation.addEventListener('keyup', (event) =>
//             {


//                 //ARE INPUTS IDENTICAL
//                 if (input.value.toLowerCase() == event.target.value.toLowerCase())
//                 {
//                     console.log("EMAIL MATCH");
//                 }
//                 else
//                 {
//                     console.log("F");
//                 }
//             });
//         }
//     });