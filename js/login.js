
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
function loginInit()
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
            postData(data, 'php/login.php').then((p)=>
            {
               if(p.status == 200)
               {
                    window.location.replace("index.php");
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
          alert("401");
          break;
      }

      GEBID("txtResponse")     .style.display      = "block";
      GEBID("txtResponse")     .innerHTML          = rMsg;
      GEBID("formTitle")       .style.marginBottom = "10px";
      GEBID("inputPass").style.marginBottom = "0px";
      GEBID("txtResponse")     .style.marginBottom = "25px";
      GEBID("main")            .style.height       = "580px";
    
}

