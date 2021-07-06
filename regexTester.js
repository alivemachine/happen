var input = event.target.getAttribute('data-input');
input = input.replace(/'"()`\\n/g,'');

event.target.setAttribute('data-output',input);
document.getElementById(event.target.id+'output').value=event.target.getAttribute('data-output');