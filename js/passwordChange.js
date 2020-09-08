
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
                    </form>`;

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
      
      GEBID("txtResponse")     .style.display      = "block";
      GEBID("txtResponse")     .innerHTML          = rMsg;
      GEBID("inputConfirmPass").style.marginBottom = "0px";
      GEBID("txtResponse")     .style.marginBottom = "25px";
      GEBID("main")            .style.height       = "340px";
      
    
}

