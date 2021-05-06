import './Links.js';
import './Search.js';
let card = document.querySelector('.card')
let cardContainer = document.querySelector('.cards')
for (let index = 0; index < 10; index++) {
    let clone = card.cloneNode(true)
    let h2 = clone.querySelector('h2')
    h2.innerText += ' '+index
    cardContainer.appendChild(clone)
}

// let link = document.createElement('style')
// fetch('/style.css?' + Math.random())
//     .then(e => {
//         return e.text()
//     })
//     .then(e => {
//         link.innerText = e
//         // console.log(e);
//         document.head.appendChild(link)
//     })

let menu = false;
let menuBtn = document.querySelector('header>div>span')
menuBtn.addEventListener('click', () => {
    menu = !menu
    if (menu) {
        document.querySelector('header>ul').style.display = "flex"
    } else {
        document.querySelector('header>ul').style.display = "none"
    }
})
