import isEditor from './Auth.js';
import cache from './Cache.js';
import eventBus from './EventBus.js';
import headerEditor from './HeaderEditor.js';
import landingPage from './LandingPage.js';
import machine from './Machine.js';
import searcher from './Searcher.js';

class SearchResultFactory {
    constructor() {
        this.container = document.createElement('li')
        this.container.classList.add('search-result-module')
        this.title = document.createElement('b')
        this.description = document.createElement('i')
        this.container.appendChild(this.title)
        this.container.appendChild(this.description)
    }
    getResult(id, title, description) {
        this.title.innerText = title
        this.description.innerText = description
        let eventHandler = () => {
            eventBus.dispatchEvent('bring.chapter.from.server', id)
            document.body.appendChild(machine.container)
            document.body.appendChild(landingPage.container)
            cache.appendChild(searcher.container)
        }

        let node = this.container.cloneNode(true);
        node.firstChild.addEventListener('click', eventHandler)
        node.childNodes[1].addEventListener('click', () => {
            if (!isEditor())  return
            headerEditor.start(id, node.firstChild, node.childNodes[1])
        })
        return node
    }
}

let searchResultFactory = new SearchResultFactory()

export default searchResultFactory