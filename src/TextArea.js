import eventBus from "./EventBus.js";
import landingPage from "./LandingPage.js";

class Textarea {
    constructor() {
        this.machine = null
        this.keyup = (e) => {
            eventBus.dispatchEvent('textarea.keyup', e.target.value)
        }
    }
    start(machine) {
        this.machine = machine
        landingPage.textarea.addEventListener('keyup', this.keyup)
        eventBus.addSuscriber('click.on.container.node', (text) => {
            landingPage.textarea.value = text
        })
    }
    stop() {
        this.machine = null
        landingPage.textarea.removeEventListener('keyup', this.keyup)
    }
}

let textarea = new Textarea()

export default textarea