//Create temporary UI for API keys
var page=document.body;
if(page.contains(document.getElementById("confidential"))==false){
    var divconf=document.createElement("DIV");  
divconf.id="confidential";
var linebreak = document.createElement("br");
divconf.innerHTML="The following information will not be saved anywhere:";
divconf.appendChild(linebreak);
var divkey=document.createElement("INPUT");
divkey.id="openaikey";
divkey.setAttribute("type", "password");
var divorg=document.createElement("INPUT"); 

divorg.id="openaiorg";
divconf.innerHTML+="OpenAI API key: ";
divconf.appendChild(divkey);
divconf.appendChild(linebreak);
divconf.innerHTML+="OpenAI org: ";
divconf.appendChild(divorg);
page.appendChild(divconf);
}else{
	document.getElementById("confidential").remove();
	
	document.getElementById("openaikey").remove();
	
	document.getElementById("openaiorg").remove();
	
}





