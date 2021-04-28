import eventBus from "./EventBus.js"

class Database {
    constructor() {
        this.database = []
        this.afterSet = null
    }
    start() {
        eventBus.addSuscriber('database.image.loaded', (blob) =>{
            this.database[request.index].text = blob
            this.database[request.index].tag = 'img'
            this.save()
            eventBus.dispatchEvent('request.dom.update.node', {
                index: request.index,
                data: this.database[request.index]
            })
        })
        eventBus.addSuscriber('request.database.update', (request) => {
            this.database[request.index].text = request.text
            this.save()
            eventBus.dispatchEvent('request.dom.update.node', {
                index: request.index,
                data: this.database[request.index]
            })
        })

        eventBus.addSuscriber('database.duplicate', (index) => {
            let params = this.duplicate(index)
            eventBus.dispatchEvent('request.dom.duplicate.node', params)
        })

        eventBus.addSuscriber('create.first', (params) => {
            this.set(params.index, params.data)
        })
        
        eventBus.addSuscriber('data.loaded',(data)=>{
            this.setDatabase(data)
        })

        eventBus.addSuscriber('database.update.tag',(params)=>{
            this.database[params.index].tag = params.tag
            this.save()
            eventBus.dispatchEvent('request.dom.update.node', {
                index: params.index,
                data: this.database[params.index]
            })
        })
        eventBus.addSuscriber('database.set.img',(params)=>{
            this.database[params.index].tag = params.tag
            this.database[params.index].text = params.text
            this.database[params.index].blob = params.blob
            this.save()
            eventBus.dispatchEvent('request.dom.update.node', {
                index: params.index,
                data: this.database[params.index]
            })
        })
        eventBus.addSuscriber('database.update.line.number',(params)=>{
            this.database[params.index].lineNumber = params.lineNumber
            console.log(this.database[params.index]);
            this.save()
            eventBus.dispatchEvent('request.dom.update.node', {
                index: params.index,
                data: this.database[params.index]
            })
        })

        eventBus.addSuscriber('database.delete.element', (index)=>{
            this.delete(index)
        })
    }
    stop() { }

    duplicate(index) {
        let data = Object.assign({}, this.get(index))
        database.insert(index, data)
        return {index, data}
    }
    insert(index, data) {
        let emptyIndex = index + 1
        this.database.splice(emptyIndex, 0, data);
        this.save()
    }
    get(index) {
        return this.database[index]
    }

    set(index, data) {
        this.database[index] = data
        this.save()
    }

    setDatabase(database) {
        this.database = database
    }

    delete(index) {
        this.database = this.database.filter((node, i) => {
            return index != i
        })
        this.save()
    }

    save() {
        let data = JSON.stringify(this.database)
        localStorage.setItem('data', data)
    }
}

let database = new Database()

export default database
