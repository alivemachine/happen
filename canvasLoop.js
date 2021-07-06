var canvas;
var ctx;
if(page.contains(document.getElementById("loopingcanvas"))==false){
    canvas=document.createElement("CANVAS");
ctx = canvas.getContext('2d');

canvas.id="loopingcanvas";

page.appendChild(canvas);

}else{
	document.getElementById("loopingcanvas").remove();
	
}

