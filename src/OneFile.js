let style = document.createElement('style')

document.head.appendChild(style)
fetch('/css/style.css').then(response => response.text()).then(data => {
    style.textContent += data
    document.querySelector('#style').remove()
});
fetch('/css/prism.css').then(response => response.text()).then(data => {
    style.textContent += data
    document.head.appendChild(style)
    document.querySelector('#prism').remove()
});
fetch('css/line-number.css').then(response => response.text()).then(data => {
    style.textContent += data
    document.head.appendChild(style)
    document.querySelector('#line-number').remove()
});

fetch('css/print.css').then(response => response.text()).then(data => {
    style.textContent += data
    document.head.appendChild(style)
    document.querySelector('#print').remove()
});

document.querySelectorAll('script').forEach(script=>{
    script.remove()
})