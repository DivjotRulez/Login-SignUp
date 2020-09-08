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
