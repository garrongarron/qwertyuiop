import loader from './Loader.js';

let start = (machine, eventBus, landingPage) => {
    eventBus.addSuscriber('show.searcher',()=>{
        machine.showSearcher()
    })
    eventBus.addSuscriber('machine.image.loaded', (blob) => {
        eventBus.dispatchEvent('database.set.img', {
            index: machine.getIndex(),
            tag: 'img',
            text: 'Image',
            blob
        })
        landingPage.textarea.value = 'Image'
    })
    eventBus.dispatchEvent('get.machine', machine)
    eventBus.addSuscriber('textarea.keyup', (text) => {
        if (machine.getIndex() == null) return
        eventBus.dispatchEvent(
            'request.database.update',
            {
                index: machine.getIndex(),
                text
            })
    })
    eventBus.addSuscriber('duplicate.btn', () => {
        let text = landingPage.textarea.value
        text = (text == '') ? 'Dummy Text' : text
        if (machine.getIndex() == null) {
            eventBus.dispatchEvent('create.first', {
                index: 0,
                data: {
                    tag: 'h1',
                    text
                }
            })
            machine.setIndex(0)
        } else {
            eventBus.dispatchEvent('database.duplicate', machine.getIndex())
            let index = machine.getIndex()
            machine.setIndex(++index)
        }


    })
    eventBus.addSuscriber('request.dom.duplicate.node', (params) => {
        let clone = machine.currentNode().cloneNode(true)
        machine.insertAfter(clone, machine.currentNode())
        machine.setClickOnNode(clone, params.data.text)
    })
    eventBus.addSuscriber('update.node.tag', (tag) => {
        eventBus.dispatchEvent('database.update.tag', {
            index: machine.getIndex(),
            tag
        })
    })

    eventBus.addSuscriber('update.node.line.number', (lineNumber) => {
        eventBus.dispatchEvent('database.update.line.number', {
            index: machine.getIndex(),
            lineNumber
        })
    })

    eventBus.addSuscriber('dom.render.page', (data) => {
        machine.container.innerText = ''
        machine.index = 0 //to process
        loader.load(data)
        localStorage.setItem('data', JSON.stringify(data));
        machine.setIndex(0)//to point current node
        landingPage.textarea.value = data[0].text
    })


}
export default start