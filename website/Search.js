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
search.addEventListener('keyup',(e)=>{
    if(e.keyCode==13){
        setTimeout(() => {
            search.blur();
        }, 100);
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
        cards.querySelectorAll('.card').forEach(element => {
            let title = element.querySelector('.data h2').innerText
            let p = element.querySelector('.data p').innerText
            let string = title+" "+p
            if(string.toLowerCase().includes(search.value.toLowerCase())){
                element.classList.remove('hide')
            } else {
                element.classList.add('hide')
            }
        });
    }, 1000);
    
})