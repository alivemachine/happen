var allContents=[];
window.onload =  async function() {
    var data = await github('https://api.github.com/repos/alivemachine/happen/contents/')
    readContents(data);
};
async function importRepo(){
    if(event!=undefined){
        var input = event.target.getAttribute('data-input');
        var data = await github('https://cors-anywhere.herokuapp.com/'+input);
        readContents(data);
    }
}
importRepo();
async function github(url){
    return new Promise(resolve => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            resolve(data);
          })
        .catch((error) => {
          console.error('Error:', error);
          resolve(error);
        });
    });
}


async function readContents(seeds){
    if(seeds !=null && seeds !=undefined && seeds !=''){
        var paras = document.getElementsByClassName('seedivContainer');
        while(paras[0]) {
            paras[0].parentNode.removeChild(paras[0]);
        }
        for(var s=0;s<seeds.length;s++){
            var file = seeds[s];
            var obj = await github(file.url);
            seeds[s]=obj;
            allContents[s]=obj;
            newSeed(obj);
        }
    }
}
function newSeed(obj){
    if(document.body.contains(document.getElementById(obj.name))==false){
                var seediv=document.createElement("TEXTAREA");
                seediv.id=obj.name;
                seediv.className="seediv";
                seediv.value=obj.name;
                seediv.setAttribute('data-input', '');
                
                seediv.setAttribute('data-output', '');
                try{
                    seediv.setAttribute('data-content', atob(obj.content));
                }catch(e){
                    console.log(e.toString());
                }
                seediv.addEventListener('click', (event) => {
                    var div = event.target;
                    var id = div.id;
                    makeArea(id,'input');
                    makeArea(id,'output');
                    var allseedivs = document.getElementsByClassName("seediv");
                    for(var s=0;s<allseedivs.length;s++){
                        if(allseedivs[s].id!=id){
                            allseedivs[s].value=allseedivs[s].id;
                            allseedivs[s].classList.remove("opened");
                         }
                    }
                    div.classList.add("opened");

                    if(div.value==id){
                    
                        div.value=div.getAttribute('data-content');
                    }else{
                        div.setAttribute('data-content',div.value);
                    }
                    think(id);
                });

                document.body.appendChild(seediv);
            }
}
async function think(name){
    var div = document.getElementById(name);
    div.classList.add('running');
    if(name.split('.')[1]=='css'){
        styleEle = document.getElementById('eleId');
        if (styleEle)styleEle.remove();
        styleEle = document.createElement("style");
        styleEle.type = "text/css";
        styleEle.id = "eleId";
        styleEle.textContent = div.getAttribute('data-content');
        const head = document.getElementsByTagName("body")[0];
        head.appendChild(styleEle);
        var paras = document.getElementsByClassName('gate');
        while(paras[0]) {
            paras[0].parentNode.removeChild(paras[0]);
        }
    }else if(name.split('.')[1]=='js'){
        try{
            await eval(div.getAttribute('data-content'));
            div.classList.remove('bugged');
        }catch(e){
            div.setAttribute('data-output', e.toString());
            div.classList.add('bugged');
        }
    }else{
        var paras = document.getElementsByClassName('gate');
        while(paras[0]) {
            paras[0].parentNode.removeChild(paras[0]);
        }
    }
    setTimeout(function(){
        div.classList.remove('running');
    },10);
    return new Promise(resolve => {resolve();});
}

function makeArea(seedName, areaName){
    var div = document.getElementById(seedName);
    var area = document.getElementsByClassName(areaName);
    while(area[0]) {
        area[0].parentNode.removeChild(area[0]);
    }
    for(var a=0;a<div.attributes.length;a++){
            if(div.attributes[a].name.includes(areaName)){
                var outdiv=document.createElement("TEXTAREA");
                    outdiv.id=seedName+areaName;
                    outdiv.className=areaName;
                    outdiv.classList.add('gate');
                    outdiv.value=div.getAttribute(div.attributes[a].name);
                    outdiv.addEventListener('keypress', function (e) {
                    if (e.key === 'Enter') {
                        var seediv = document.getElementById(e.target.id.replace(areaName,''));
                        seediv.setAttribute('data-'+areaName,e.target.value);//outdiv target
                        seediv.click();
                    }
            });
            if(areaName=='input'){
                document.body.insertBefore(outdiv, div);
                outdiv.style.borderTopRightRadius=0;
                outdiv.style.borderBottomRightRadius=0;
            }else{
                div.after(outdiv);
                outdiv.style.borderTopLeftRadius=0;
                outdiv.style.borderBottomLeftRadius=0;
            }
            }
    }
    
}