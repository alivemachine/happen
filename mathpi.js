var input = event.target.getAttribute('data-input');
input = parseInt(input)*Math.PI;
event.target.setAttribute('data-input',input);
event.target.setAttribute('data-output',input);
document.getElementById(event.target.id+'output').value=event.target.getAttribute('data-output');