
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
                    <p id = "txtResponse">An Email Has Been Sent To Your Account 
                                        <br>
                                          Follow The Instructions To Reset Your Password 
                    </p>
                
                    <form id="form">
                        <a href = "login.php" id = "btnSubmit" >Login</a>
                    </form>`;
                

               }
            }).catch(errorHandler);
    });
}

