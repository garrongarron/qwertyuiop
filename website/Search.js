let search = document.querySelector('#s')
let btn =document.querySelector('button')
btn.addEventListener('click',()=>{
    console.log(search.value);
    cards.querySelectorAll('.card').forEach(element => {
        console.log(element);
    });
})
let cards = document.querySelector('.cards')

let timer = null
search.addEventListener('keyup',()=>{
    clearTimeout(timer)
    timer = setTimeout(() => {
        cards.querySelectorAll('.card').forEach(element => {
            if(element.querySelector('.data h2').innerText.toLowerCase().includes(search.value.toLowerCase())){
                element.classList.remove('hide')
            } else {
                element.classList.add('hide')
            }
        });
    }, 1000);
    
})