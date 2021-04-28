import Export from "./Export.js";
import landingPage from "./LandingPage.js";
import eventBus from './EventBus.js';

class ButtonManager {
    constructor() {
        this.machine = null
        this.h1 = () => {
            eventBus.dispatchEvent('update.node.tag', 'h1')
        }
        this.h2 = () => {
            eventBus.dispatchEvent('update.node.tag', 'h2')
        }
        this.p = () => {
            eventBus.dispatchEvent('update.node.tag', 'p')
        }
        //
        this.html = () => {
            eventBus.dispatchEvent('update.node.tag', 'html')
        }
        this.css = () => {
            eventBus.dispatchEvent('update.node.tag', 'css')
        }
        this.js = () => {
            eventBus.dispatchEvent('update.node.tag', 'javascript')
        }


        this.down = () => {
            console.log('down');
            Export.download()
        }

        this.lineNumber = (e) => {
            eventBus.dispatchEvent('update.node.line.number', e.target.value)
        }
    }
    start() {

        landingPage.h1.addEventListener('click', this.h1)
        landingPage.h2.addEventListener('click', this.h2)
        landingPage.p.addEventListener('click', this.p);
        //
        landingPage.html.addEventListener('click', this.html)
        landingPage.css.addEventListener('click', this.css)
        landingPage.js.addEventListener('click', this.js)


        landingPage.lineNumber.addEventListener('keyup', this.lineNumber)
        landingPage.lineNumber.addEventListener('change', this.lineNumber)

        //
        landingPage.download.addEventListener('click', this.down)

        landingPage.searcher.addEventListener('click', () => {
            eventBus.dispatchEvent('show.searcher',null)
            let chapter = JSON.parse(localStorage.getItem('chapter')) || 0
            console.log(chapter);
            if (chapter > 0) {
                eventBus.dispatchEvent('save.current.chapter', null)
            }
        })
        landingPage.saveChapter.addEventListener('click', () => {
            eventBus.dispatchEvent('save.chapter.on.bk', null)
        })

    }
    stop() {
        this.machine = null
        landingPage.h1.removeEventListener('click', this.h1)
        landingPage.h2.removeEventListener('click', this.h2)
        landingPage.p.removeEventListener('click', this.p);
        //
        landingPage.html.removeEventListener('click', this.html)
        landingPage.css.removeEventListener('click', this.css)
        landingPage.js.removeEventListener('click', this.js)

        landingPage.lineNumber.removeEventListener('keyup', this.lineNumber)
        landingPage.lineNumber.removeEventListener('change', this.lineNumber)

        landingPage.download.removeEventListener('click', this.down)

    }
}
let buttonManager = new ButtonManager()

export default buttonManager