import build from "./Builder.js"
import cache from "./Cache.js"
import eventBus from './EventBus.js';
class ChapterCreator{
    constructor(){
        this.container = document.createElement('div')
        this.container.classList.add('form-new-chapter')
        this.input = build('input', null, null, this.container)
        this.input.setAttribute('type','text')
        this.input.setAttribute('placeholder','Title')
        this.textarea = build('textarea', null, null, this.container)
        this.textarea.setAttribute('placeholder','Description')
        this.btn = build('input', null, null, this.container)
        this.btn.setAttribute('type','button')
        this.btn.value = 'Create'
        this.newChapterBtn = null
        this.btn.addEventListener('click',()=>{
            eventBus.dispatchEvent('create.new.chapter',[this.input.value, this.textarea.value])
            this.newChapterBtn.click()
        })
    }
    start(parent, newChapterBtn){
        this.newChapterBtn =  newChapterBtn
        if(this.container== null) this.init()
        parent.appendChild(this.container)
    }
    stop(){
        cache.appendChild(this.container)
    }
    init(){
        this.container = document.createElement('div')
        this.input = build('input', null, null, this.container)
        this.textarea = build('textarea', null, null, this.container)
        this.btn = build('input', null, null, this.container)
    }
}
let chapterCreator = new ChapterCreator()
export default chapterCreator