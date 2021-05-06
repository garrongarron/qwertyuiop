
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
            window.open("/book.html?c=608d44b27ef351001358798f");
        })
    }
})
window.onload = function () {
    document.querySelector('.yt-icon').addEventListener('click', () => {
        window.open("https://www.youtube.com/c/garronargentina?sub_confirmation=1");
    })
};

