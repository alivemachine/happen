var fullCode = document.body.innerHTML;
var input = event.target.getAttribute('data-input');
var result='';
var limit=4;
var surface = 120;
//bring back search results in this repository and this document
function bringback(i){
    var foundpos=fullCode.search(input);
    var similar = "```..."+document.body.innerHTML.substring(foundpos-surface,foundpos+surface)+"...```";
  try{
    var path= allContents.filter(element => atob(element.content).includes(input))[i].path;
    result = result+'//'+path+'\n'+similar+'\n\n';
  }catch(e){
    var path = window.location.pathname;
    var page = path.split("/").pop();
    result = result+'//'+page+'\n'+similar+'\n\n';
  }
  fullCode=fullCode.replace(input,'');
    i++;
    if(i<=3){bringback(i);}
}bringback(0);

event.target.setAttribute('data-input',input);
event.target.setAttribute('data-output',result);
document.getElementById(event.target.id+'output').style.width='600px';
//document.getElementById(event.target.id+'output').style.height='300px';
document.getElementById(event.target.id+'output').value=event.target.getAttribute('data-output');