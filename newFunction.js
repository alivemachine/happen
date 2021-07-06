var input = document.getElementById("newFunction.js").getAttribute('data-input');
if(input!=''){newOBJ(input);}
async function newOBJ(input){
    document.getElementById('namer.js').setAttribute('data-input',input);
    await think('namer.js');
    var name = document.getElementById('namer.js').getAttribute('data-output');
    
    var str = '{"content":"'+btoa(input)+'","url":"","name":"'+name+'","path":"'+name+'"}';
    
    var obj = JSON.parse(str);
    newFunc(obj);
    
}


async function newFunc(obj){
    if(document.body.contains(document.getElementById(obj.name))==false){
                var seediv=document.createElement("TEXTAREA");
                seediv.id=obj.name;
                seediv.className="seediv";
                seediv.value=obj.name;
                seediv.setAttribute('data-input', '');
                
                seediv.setAttribute('data-output', '');
                
                seediv.setAttribute('data-content', atob(obj.content));
                
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