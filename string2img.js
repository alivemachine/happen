var ta = document.getElementsByTagName('TEXTAREA');
var canvas = document.createElement('canvas');
var gl = canvas.getContext('webgl');

//Create a background image for each textarea
for(var t=0;t<ta.length;t++){
    if(ta[t].classList.contains('seediv')&&ta[t].getAttribute('data-content')){
        var c =  randomColor(ta[t].getAttribute('data-content').length);
        ta[t].setAttribute('color',c);
        ta[t].style.backgroundColor=c;
        ta[t].style.backgroundImage='url("'+string2b64(ta[t].getAttribute('data-content'))+'")';
    }
}
//return a new color based on the amount of characters in the textarea
function randomColor(seed){
    var s = parseFloat('0.'+seed);
    const randomColor = '#'+Math.floor(s*16777215).toString(16);
    return randomColor;
}
//return a base64 image from a string of characters
function string2b64(str){
    return tex2b64(array2tex(string2array(str)));
}
//return an array of values from a string of characters
function string2array(str){
    if (str !== undefined && str !== null)
    {
        var arr=[];
        const strLength = str.length;
        arr.length = strLength;
        for (let i = 0; i < strLength; i++)
        {
            arr[i] = str.charCodeAt(i)/5;
        }
        return arr
    }
}



//return a texture of RGB values from an array of values
function array2tex(arr){
    if(!arr){return;}
    
    var pixels=new Uint8Array(10);
    var width=Math.ceil(Math.sqrt(arr.length/3));
    var height=Math.ceil(arr.length/3/width);

    const num=width*4*height;
    if(pixels.length!=num)pixels=new Uint8Array(num);

    var i=0,j=0;
    var idx=0;

    for(j=0;j<width*height;j++)
    {
        idx++;
        var idxa=idx;
        if(idx*3>arr.length-1)idxa=0;
        pixels[idx*4+0]=(arr[idxa*3+0]+0.)*255;
        pixels[idx*4+1]=(arr[idxa*3+1]+0.)*255;
        pixels[idx*4+2]=(arr[idxa*3+2]+0.)*255;
        pixels[idx*4+3]=255;
    }

    
   

gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true);
var texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
texture.width=width;
texture.height=height;
return texture
}

//return a base64 image from a texture
function tex2b64(tex){
    let fb = null;
    
    if (!tex) return;
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    const width = tex.width;
    const height = tex.height;

    if (!fb)fb = gl.createFramebuffer();

    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    const canRead = (gl.checkFramebufferStatus(gl.FRAMEBUFFER) == gl.FRAMEBUFFER_COMPLETE);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    
    if (!canRead){alert('cant read');return;}

    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    const data = new Uint8Array(width * height * 4);
    gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, data);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");

    // Copy the pixels to a 2D canvas
    const imageData = context.createImageData(width, height);
    imageData.data.set(data);

    const data2 = imageData.data;

    // flip image
    Array.from({ "length": height }, (val, i) => data2.slice(i * width * 4, (i + 1) * width * 4))
        .forEach((val, i) => data2.set(val, (height - i - 1) * width * 4));

    context.putImageData(imageData, 0, 0);
    let dataString = "";

    dataString = canvas.toDataURL();
    
    return dataString;
}