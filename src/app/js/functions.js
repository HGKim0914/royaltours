
export function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export function getCurrentDate(){
    //Get current date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if(dd<10) dd = '0'+dd;
    if(mm<10) mm = '0'+mm;

    today = yyyy + '-' + mm + '-' + dd;

   return today;
}

 
export function getCurrentYear(){
    var today = new Date();
    var yyyy = today.getFullYear();
    
    return yyyy;
}

export function checkIfAuthorized(authorization, idx){
    if(authorization[idx] === "t"){
        return true;
    }

    return false;
}

export function getTourcode(url){
    var tourcode = url[url.length - 1];
    return decodeURIComponent(tourcode);
}

export function reloadPage(){
    window.location.reload(true);
}