var urlu = 'https://api.openai.com/v1/engines/davinci-codex/completions';
var temperature = .6, max_tokens=128,top_p=1,frequency_penalty=0,presence_penalty=0,stop=['####'];
var seedElement=document.getElementById("codegen.js");
var prompt = seedElement.getAttribute('data-input');
var key = "Bearer "+document.getElementById("openaikey").value;
var org = document.getElementById("openaiorg").value;
var body=JSON.stringify({"prompt":prompt,"temperature":parseFloat(temperature),"max_tokens":parseInt(max_tokens),"top_p":parseFloat(top_p),"frequency_penalty":parseFloat(frequency_penalty),"presence_penalty":parseFloat(presence_penalty),"stop":stop});


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
            seedElement.setAttribute('data-output',data.choices[0].text);
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

