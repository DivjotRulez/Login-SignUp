
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
    GEBID("btnLogin").addEventListener("click",() => 
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

