var inputSiteName = document.getElementById('siteName');
var inputSiteUrl = document.getElementById('siteUrl');
var globalIndex;

var siteInformation = [];

if(localStorage.getItem('sites') !==null){
    siteInformation = JSON.parse(localStorage.getItem('sites'));
    displaySiteForUser();
}
function addSite(){
    if( checkValidName()===true && checkValidUrl()===true ){
        var siteName = {
            name : inputSiteName.value,
            url : inputSiteUrl.value
        }
        siteInformation.push(siteName);
        console.log(siteInformation);
    
        setAtLocalStorageAndDisplay();
        clearSite();
    }
    
}

function clearSite(){
    inputSiteName.value='';
    inputSiteUrl.value='';
}

function displaySiteForUser(){
    var addSite = ``;
    for(var i = 0 ; i<siteInformation.length ; i++){
        addSite += ` <tr>
        <td>${i+1}</td>
        <td>${siteInformation[i].name}</td>
        <td><a href="${siteInformation[i].url}"><button class="btn btn-success" onclick="visitYourWebsite();"id="visitBtn"><i class="fa-regular fa-eye"></i> Visit</button></a></td>
        <td><button onclick="deleteSite(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i> Delete</button></td>
    </tr>`
    
    }
    document.getElementById('tBody').innerHTML=addSite;
}

function deleteSite(index){
    globalIndex = index;
    siteInformation.splice(index , 1);
    setAtLocalStorageAndDisplay();
}

function setAtLocalStorageAndDisplay(){
    localStorage.setItem('sites' , JSON.stringify(siteInformation));
    displaySiteForUser();
}

function checkValidUrl(){
    var regex = /^www\.[a-z]{3,10}\.[a-z]{3}$/
if(regex.test(inputSiteUrl.value)===true) {
    document.getElementById('wrongUrlSite').classList.add( 'd-none');
    return true;
}else{
    document.getElementById('wrongUrlSite').classList.remove('d-none');
    return false;
}
}

function checkValidName(){
    var regex = /^[A-Z][a-z]{3,10}$/
    if(regex.test(inputSiteName.value) === true){
    document.getElementById('wrongUrlName').classList.add('d-none');
    return true;
    }else{
    document.getElementById('wrongUrlName').classList.remove('d-none');
    return false;
    }
}

function visitYourWebsite(index){
    document.getElementById('visitBtn')=globalIndex;
    inputSiteUrl.value = siteInformation[index].url;
    
}
