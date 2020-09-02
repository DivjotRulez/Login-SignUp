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
//          EMAIL VALIDATION CONDITIONS         //
//                                              //
//////////////////////////////////////////////////
function emailIsValid(email)
{
    console.log(email)
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}