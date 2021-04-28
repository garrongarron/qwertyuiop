import landingPage from "./LandingPage.js";
import eventBus from "./EventBus.js";

class Loader {
    constructor() {
        this.machine = null
    }

    start() {
        eventBus.addSuscriber('get.machine', (machine) => {
            this.machine = machine
            let data = JSON.parse(localStorage.getItem('data')) || []
            let chapter = JSON.parse(localStorage.getItem('chapter')) || 0
            console.log(chapter);
            if (chapter == 0) return

            if (data.length > 0) {
                this.load(data)
                machine.selectFirstOne(data[0].text)
            }
        })

        landingPage.export.addEventListener('click', () => {
            eventBus.dispatchEvent('export.content.html', null)
        })

        landingPage.upload.addEventListener('click', (e) => {
            landingPage.uploadInput.click()
        })

        landingPage.uploadInput.addEventListener('change', (e) => {
            eventBus.dispatchEvent('upload.content.json', { e: e, container: this.machine.container })
        })

        //
        landingPage.imgUp.addEventListener('click', (e) => {
            landingPage.imgInput.click()
        })

        landingPage.imgInput.addEventListener('change', (e) => {
            eventBus.dispatchEvent('image.loader.start', e)
        })
    }


    load(data) {
        data.forEach(params => {
            eventBus.dispatchEvent('dom.add.new.node', params)
        });
        Prism.highlightAll();
        eventBus.dispatchEvent('data.loaded', data)
    }

    stop() {
        this.machine = null
    }
}
let loader = new Loader()

export default loader