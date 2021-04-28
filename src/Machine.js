import start from "./DomController.js";
import eventBus from "./EventBus.js";
import landingPage from "./LandingPage.js";
import cache from './Cache.js';
import searcher from './Searcher.js';

class Machine {
    constructor() {
        this.index = null
        this.container = document.body.querySelector('#container')
    }
    getIndex(){
        return this.index
    }
    setIndex(index){
        if(this.index!=null) this.currentNode().classList.remove('node-selected')
        this.index = index
        this.currentNode().classList.add('node-selected')
    }
    start() {
        start(this, eventBus, landingPage)
    }
    stop() { }
    currentNode() {
        return this.container.children[this.index]
    }
    insertAfter(newNode, existingNode) {
        existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    }
    setClickOnNode(node, text) {
        node.addEventListener('click', () => {
            this.setIndex(this.getIndexOf(node))
            eventBus.dispatchEvent('click.on.container.node', text)
        })
    }
    getIndexOf(node) {
        let index = Array.from(this.container.children).indexOf(node)
        return index
    }
    selectFirstOne(text) {
        this.setIndex(0)
        landingPage.textarea.value = text
    }
    showSearcher(){
        cache.appendChild(this.container)
        cache.appendChild(landingPage.container)
        searcher.start()
    }
}
const machine = new Machine()
export default machine