var urlu = 'https://api.openai.com/v1/engines/davinci/completions';
var temperature = .6, max_tokens=8,top_p=1,frequency_penalty=0,presence_penalty=0,stop=['\n'];
var seedElement=document.getElementById("namer.js");
var prompt = '```\n'+seedElement.getAttribute('data-input')+'\n//Package the previous code into a function named `';
var key = "Bearer "+document.getElementById("openaikey").value;
var org = document.getElementById("openaiorg").value;
var body=JSON.stringify({"prompt":prompt,"temperature":parseFloat(temperature),"max_tokens":parseInt(max_tokens),"top_p":parseFloat(top_p),"frequency_penalty":parseFloat(frequency_penalty),"presence_penalty":parseFloat(presence_penalty),"stop":stop});

var namer = document.getElementById("namer.js");
async function openai(url){
    return new Promise(resolve => {
        fetch(urlu, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json','Authorization': key,'OpenAI-Organization':org
    },
    body: body
  })
        .then(response => response.json())
        .then(data => {
            var result= data.choices[0].text.replace(/["'\(\)\n, `.;={}:]/g,'').split(" ")[0].split(".")[0]+ext(seedElement.getAttribute('data-input'));



            namer.setAttribute('data-output',result);
            seedElement.setAttribute('data-output',result);
            if(document.getElementById(seedElement.id+'output')){
                document.getElementById(seedElement.id+'output').value=seedElement.getAttribute('data-output');
            }
            resolve(data);
          })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
}openai();

function ext(code){
   if (code.match(/^<[^>]+>/)) {
       return '.html';
   }
   else if (code.match(/^(#|\.)?[^{]+{/)) {
     return '.css';
   }else{
     return '.js';
   }

}

