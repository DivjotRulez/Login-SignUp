
/////////////////////////////////////////////////
// ------------------------------------------- //
// -                                         - //
// -                LOGIN.JS                 - //
// -                                         - //
// -    THIS SCRIPT WILL:                    - //
// -    1. SEND DATA TO BE HANDLED BY PHP    - //
// ------------------------------------------- //
/////////////////////////////////////////////////


//////////////////////////////////////////////////
//                                              //
//              ONLOAD INITIALISE               //
//                                              //
//////////////////////////////////////////////////
function rprInit()
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
            postData(data, 'php/resetPass.php').then((p)=>
            {
                
               if(p.status == 200)
               {
                   /////CONFIRM TO USER
                //    GEBID("inputEmail").style.display = "none";
                //    GEBID("txtBack").style.display = "none";
                    GEBID("main").innerHTML = `

                    <p id="formTitle"> Request Password Reset</p>
                    <p id = "txtConf">An Email Has Been Sent To Your Account 
                                        <br>
                                          Follow The Instructions To Reset Your Password 
                    </p>
                
                    <form id="form">
                        <p><a href = "login.php" id = "btnSubmit" >Login</a></p>
                        <br>
                    </form>`;
                    
               }
            //    else
            //    {
            //     alert("cx");
            //         GEBID("inputEmail").style.marginBottom = "0px";
               
                   
            //    }
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
      
      GEBID("txtResponse").innerHTML = rMsg;
    
}

