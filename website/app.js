let card = document.querySelector('.card')
let cardContainer = document.querySelector('.cards')
for (let index = 0; index < 2; index++) {
    cardContainer.appendChild(card.cloneNode(true))
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

document.querySelectorAll('header>ul>li').forEach(e => {
    if (e.innerText == "CONTACT") {
        e.addEventListener('click', () => {
            window.open("https://discord.gg/ve4uhqGWkB");
        })
    }
    if (e.innerText == "VIDEOS") {
        e.addEventListener('click', () => {
            window.open("https://www.youtube.com/c/garronargentina?sub_confirmation=1");
        })
    }
    if (e.innerText == "BLOG") {
        e.addEventListener('click', () => {
            window.open("https://desarrollodevideojuegos3dconjavascript.wordpress.com");
        })
    }

    if (e.innerText == "TWITTER") {
        e.addEventListener('click', () => {
            window.open("https://twitter.com/samugarrondev");
        })
    }
    if (e.innerText == "BOOK") {
        e.addEventListener('click', () => {
            window.open("/book.html");
        })
    }
})