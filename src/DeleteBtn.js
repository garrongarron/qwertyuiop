import eventBus from "./EventBus.js";
import landingPage from "./LandingPage.js";

class DeleteBtn {
    constructor() {
        this.machine = null
        this.eventHandler = (e) => {
            let index = this.machine.getIndexOf(e.currentTarget)
            //delete from dom
            e.currentTarget.remove()
            //delete from database
            eventBus.dispatchEvent('database.delete.element', index)
            e.stopPropagation()
            e.preventDefault()
            //to delete once at a time
            this.clean()
        }
    }
    start() {
        eventBus.addSuscriber('get.machine', (machine)=>{
            this.machine = machine
            landingPage.deleteBtn.addEventListener('click', () => {
                landingPage.deleteBtn.classList.toggle('red')
                if (landingPage.deleteBtn.classList.contains('red')) {
                    this.readyToDelete()
                } else {
                    this.clean()
                }
                
            })
        })
        
    }
    readyToDelete() {
        let collection = this.machine.container.children
        Array.from(collection).forEach(el => {
            el.addEventListener('click', this.eventHandler)
        });
    }

    clean() {
        let collection = this.machine.container.children
        Array.from(collection).forEach(el => {
            el.removeEventListener('click', this.eventHandler)
        });
        landingPage.deleteBtn.classList.remove('red')
    }
    stop() {

    }
}

let deleteBtn = new DeleteBtn()

export default deleteBtn