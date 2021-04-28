import build from "./Builder.js"
import eventBus from "./EventBus.js"


class NodeBuilder {

    constructor() {
        this.tagList = ['h1', 'h2', 'p']
        this.styleList = ['html', 'javascript', 'css']
        this.machine = null
    }

    start() {
        eventBus.addSuscriber('get.machine', (machine) => {
            this.machine = machine
        })
        eventBus.addSuscriber('request.dom.update.node', (params) => {
            this.update(params)
        })

        eventBus.addSuscriber('create.first', (params) => {
            this.create(params.data)
        })

        eventBus.addSuscriber('dom.add.new.node', (data) => {
            this.create(data)
        })
        
    }


    update(params) {
        let data = params.data
        let node
        let currentNode = this.machine.container.children[params.index]
        if (this.tagList.includes(data.tag)) {
            node = build(data.tag, data.text)
            this.machine.insertAfter(node, currentNode)
            currentNode.remove()
        }
        if (data.tag == 'img') {
            let imgContainer = build('div')
            imgContainer.classList.add('image-container')
            node = build(data.tag, null, null, imgContainer)
            node.setAttribute('src', data.blob)
            node.setAttribute('title', 'Ilustration')
            this.machine.insertAfter(imgContainer, currentNode)
            currentNode.remove()
            node = imgContainer
        }

        if (this.styleList.includes(data.tag)) {
            node = build('pre', null, 'language-' + data.tag)
            if (data.lineNumber !== '' && Number.isInteger(data.lineNumber * 1)) {
                node.classList.add('line-numbers')
                node.setAttribute('data-start', data.lineNumber)
            } else {
                if (typeof data.lineNumber != undefined) delete data.lineNumber
            }
            build('code', data.text, null, node)
            this.machine.insertAfter(node, currentNode)
            Prism.highlightAll();
            currentNode.remove()
        }
        this.machine.setIndex(params.index)
        this.machine.setClickOnNode(node, data.text)
    }

    create(data) {
        let node = null
        if (this.tagList.includes(data.tag)) {
            node = build(data.tag, data.text, null, container)//?????????????????
        }
        if (data.tag == 'img') {
            let imgContainer = build('div', null, null, container)//?????????????????
            imgContainer.classList.add('image-container')
            node = build(data.tag, null, null, imgContainer)
            node.setAttribute('src', data.blob)
            node.setAttribute('title', 'Ilustration')
            node = imgContainer
        }

        if (this.styleList.includes(data.tag)) {
            node = build('pre', null, 'language-' + data.tag, this.machine.container)
            build('code', data.text, null, node)
            if (data.lineNumber !== '' && Number.isInteger(data.lineNumber * 1)) {
                node.classList.add('line-numbers')
                node.setAttribute('data-start', data.lineNumber)
            } else {
                if (typeof data.lineNumber != undefined) delete data.lineNumber
            }
            // Prism.highlightElement(node);
        } 
        this.machine.setClickOnNode(node, data.text)
    }

    stop() {
        this.machine = null
    }
}

let nodeBuilder = new NodeBuilder()

export default nodeBuilder