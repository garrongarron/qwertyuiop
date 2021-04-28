import isEditor from './Auth.js';
import build from './Builder.js';
import eventBus from './EventBus.js';
import MasterPage from "./MasterPage.js";

class LandingPage extends MasterPage {
    constructor() { super('landingPage') }
    init() {
        let c = build('div', null, 'lateral-forms')
        this.textarea = build('textarea', null, null, c)
        let btnContainer = build('div', null, 'btnContainer')
        this.duplicateBtn = build('button', 'Duplicate', 'duplicateBtn', btnContainer)
        this.deleteBtn = build('button', 'Delete', 'deleteBtn', btnContainer)
        c.appendChild(btnContainer)

        let typesContainer = build('div', null, 'typesContainer')
        this.h1 = build('button', 'h1', 'h1', typesContainer)
        this.h2 = build('button', 'h2', 'h2', typesContainer)
        this.p = build('button', 'p', 'p', typesContainer)
        this.html = build('button', 'html', 'html', typesContainer)
        this.css = build('button', 'css', 'css', typesContainer)
        this.js = build('button', 'js', 'javascript', typesContainer)
        c.appendChild(typesContainer)

        //Linenumber
        let lineNumberContainer = build('div', null, 'linenumberContainer')
        this.imgUp = build('button', 'ImgUp', 'i', lineNumberContainer)

        this.imgInput = build('input', null, null, lineNumberContainer)
        this.imgInput.setAttribute('type', 'file')
        this.imgInput.setAttribute('accept', 'image/png, image/jpeg')
        this.imgInput.setAttribute('style', 'display:none')

        this.italic2 = build('button', '-', 'i', lineNumberContainer)
        this.italic3 = build('button', '-', 'i', lineNumberContainer)


        this.lineNumber = build('input', null, 'lineNumber', lineNumberContainer)
        this.lineNumber.setAttribute('type', 'number')
        this.lineNumber.setAttribute('placeholder', 'Line number')
        this.lineNumberBtn = build('button', '1-| On', 'lineNumberBtn', lineNumberContainer)
        this.lineNumberBtnClear = build('button', '1-| Off', 'lineNumberBtn', lineNumberContainer)
        c.appendChild(lineNumberContainer)



        let actionsContainer = build('div', null, 'actionsContainer')
        this.upload = build('button', 'Upload Json', 'up', actionsContainer)
        this.uploadInput = build('input', null, null, actionsContainer)
        this.uploadInput.setAttribute('type', 'file')
        this.uploadInput.setAttribute('accept', 'application/JSON')
        this.uploadInput.setAttribute('style', 'display:none')

        this.download = build('button', 'Download Json', 'down', actionsContainer)
        this.export = build('button', 'Download HTML', 'export', actionsContainer)
        this.toggle = build('button', 'hide-show', 'hide-show', actionsContainer)
        let bool = false
        this.toggle.addEventListener('click', () => {
            bool = !bool
            c.classList.toggle('small')
            if (bool) {

            }
        })
        c.appendChild(actionsContainer)



        let databaseBtn = build('div', null, 'database-section')
        this.searcher = build('button', 'Search', 'search-btn', databaseBtn)
        this.saveChapter = build('button', 'Save', 'save-btn', databaseBtn)

        c.appendChild(databaseBtn)

        this.container = c
        if (!isEditor()) {
            this.container.classList.add('hide')
            let searcher = document.createElement('input')
            searcher.setAttribute('type','button')
            searcher.value = 'Search'
            searcher.classList.add('search-fixed')
            searcher.addEventListener('click',()=>{
                eventBus.dispatchEvent('show.searcher',null)
            })
            document.body.appendChild(searcher)
        }
    }
}
let landingPage = new LandingPage()
export default landingPage