import eventBus from "./EventBus.js";

class ServerConector {
    constructor() {
        this.url = (location.origin == 'http://127.0.0.1:5501') ? 'http://0.0.0.0:8080' : location.origin;
        this.url = 'https://studious-restrictio.000webhostapp.com'
    }
    start() {
        eventBus.addSuscriber('save.current.chapter', () => {
            let data = localStorage.getItem('data') || '[]'
            let chapter = JSON.parse(localStorage.getItem('chapter')) || 0
            if (!(chapter > 0)) return
            this.apiClient(
                'PATCH',
                this.url + '/body/' + chapter,
                { data }
            ).then(response => {
                // console.log(response);
            })
        })
        eventBus.addSuscriber('save.chapter.on.bk', () => {
            let data = localStorage.getItem('data') || '[]'
            let chapter = JSON.parse(localStorage.getItem('chapter')) || 0
            if (!(chapter > 0)) return
            this.apiClient(
                'POST',
                this.url + '/body',
                {
                    id: chapter,
                    data
                }
            ).then(response => {
                console.log(response);
            })
        })
        eventBus.addSuscriber('search.text.in.chapters', (textToSearch) => {
            // console.log(textToSearch);
            this.apiClient('GET', this.url + '/header?s=' + textToSearch).then(response => {
                if (response.status == 200 || response.status == 404) {
                    eventBus.dispatchEvent('response.chapters.found', response.payload)
                }
            })
        })
        eventBus.addSuscriber('bring.chapter.from.server', (id) => {
            console.log(id);
            this.apiClient(
                'GET', this.url + '/body/' + id
            ).then(response => {
                localStorage.setItem('chapter', id)
                let data = JSON.parse(response.payload[0].data)
                eventBus.dispatchEvent('dom.render.page', data)
            })
        })

        eventBus.addSuscriber('create.new.chapter', (params) => {
            this.apiClient('POST', this.url + '/header', {
                title: params[0],
                description: params[0]
            }).then(response => {
                console.log(response.status, response.payload)
            })
        })
        eventBus.addSuscriber('update.chapter.header', (params) => {
            this.apiClient('PATCH', this.url + '/header/' + params[0], {
                title: params[1],
                description: params[2]
            }).then(response => {
                console.log(response.status, response.payload)
            })
        })
    }
    apiClient(method, url, body) {
        let request = new Promise((resolve, reject) => {
            let params = {
                method: (method == "PATCH") ? 'POST' : method
                , mode: 'no-cors'
            }
            if (body) {
                if (method == "PATCH") {
                    let arr = url.split('/')
                    let id = arr.pop()
                    url = arr.join('/')
                    params.body = JSON.stringify({
                        body,
                        method: 'PATCH',
                        id
                    })

                } else {
                    params.body = JSON.stringify(body)
                }
            }
            let status = null
            fetch(url, params).then(response => {
                status = response.status;
                return response.json()
            }).then(payload => {
                resolve({ status, payload })
            }).catch(reject)
        })
        return request
    }

    stop() { }
}

let serverConector = new ServerConector()
export default serverConector