
import eventBus from "./EventBus.js"
import landingPage from "./LandingPage.js"

class DuplicateBtn {
    constructor() {
        this.machine = null
    }
    start(machine) {
        this.machine = machine
        landingPage.duplicateBtn.addEventListener('click', () => {
            eventBus.dispatchEvent('duplicate.btn',null)            
        })

    }
    stop() {
        this.machine = null
    }
}

let duplicateBtn = new DuplicateBtn()

export default duplicateBtn