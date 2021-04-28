import build from "./Builder.js"
import cache from "./Cache.js"
import eventBus from './EventBus.js';
class HeaderEditor {
    constructor() {
        this.container = document.createElement('div')
        this.container.classList.add('form-new-chapter','fix-bottom')
        this.input = build('input', null, null, this.container)
        this.input.setAttribute('type', 'text')
        this.input.setAttribute('placeholder', 'Title')
        this.textarea = build('textarea', null, null, this.container)
        this.textarea.setAttribute('placeholder', 'Description')
        this.btn = build('input', null, null, this.container)
        this.btn.setAttribute('type', 'button')
        this.btn.value = 'Close'
        this.chapter = null
        this.btn.addEventListener('click', () => {
            this.stop()
        })
    }

    save(){
        eventBus.dispatchEvent('update.chapter.header', [
            this.chapter,
            this.input.value,
            this.textarea.value
        ])
    }
    start(id, titleNode, descriptionNode) {
        this.chapter = id
        this.titleNode = titleNode
        this.input.value = titleNode.innerText
        this.descriptionNode = descriptionNode
        this.textarea.value = descriptionNode.innerText
        document.body.appendChild(this.container)
        this.input.addEventListener('keyup', this.up.bind(this))
        this.textarea.addEventListener('keyup', this.up.bind(this))
    }
    up(e){
        if(e.target.tagName.toLowerCase() == 'input'){
            this.titleNode.innerText = this.input.value
        }
        if(e.target.tagName.toLowerCase() == 'textarea'){
            this.descriptionNode.innerText = this.textarea.value
        }
    }
    stop() {
        this.save()
        cache.appendChild(this.container)
    }
}
let headerEditor = new HeaderEditor()
export default headerEditor
