//Loop between Codegen and Search functions
var input = event.target.getAttribute('data-input');
if(input!=''){generate();}
async function generate(){
document.getElementById('searcher.js').setAttribute('data-input',input);
await think('searcher.js');
var search = document.getElementById('searcher.js').getAttribute('data-output');
var fullprompt = search +'\n\n'+'//index.html'+'\n```...'+input;

document.getElementById('codegen.js').setAttribute('data-input',fullprompt);
event.target.setAttribute('data-output',fullprompt);
document.getElementById('looper.jsoutput').value=fullprompt;
//alert(fullprompt);
await think('codegen.js');
var code = document.getElementById('codegen.js').getAttribute('data-output');
document.getElementById('newFunction.js').setAttribute('data-input',code);

await think('newFunction.js');
//var out = document.getElementById('codegen.js').getAttribute('data-output');
//event.target.setAttribute('data-output',out);
//document.getElementById('looper.jsoutput').value=event.target.getAttribute('data-output');
}