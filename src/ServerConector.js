import eventBus from "./EventBus.js";

class ServerConector {
    constructor() {
        // this.url = (location.origin == 'http://127.0.0.1:5500') ? 'http://0.0.0.0:8080' : location.origin;
        // this.url = 'https://studious-restrictio.000webhostapp.com'
        // this.url = 'http://desarrollodevideojuegos3dconjavascript.42web.io'
        this.url = 'http://localhost:3000'

    }
    start() {

        eventBus.addSuscriber('save.current.chapter', () => {
            //
            let data = localStorage.getItem('data') || '[]'
            let chapter = localStorage.getItem('chapter') || '0'
            if (chapter === '0') return
            this.apiClient(
                'PATCH',
                this.url + '/chapter/' + chapter,
                { data:data }
            ).then(response => {
                // console.log(response);
            })
        })
        eventBus.addSuscriber('save.chapter.on.bk', () => {
            //todo
            let data = localStorage.getItem('data') || '[]'
            let chapter = JSON.parse(localStorage.getItem('chapter')) || 0
            if (!(chapter > 0)) return
            this.apiClient(
                'POST',
                this.url + '/chapter',
                {
                    id: chapter,
                    data: data
                }
            ).then(response => {
                console.log(response);
            })
        })

        eventBus.addSuscriber('search.text.in.chapters', (textToSearch) => {
            // console.log(textToSearch);
            this.apiClient('GET', this.url + '/chapter?s=' + textToSearch).then(response => {
                if (response.status == 200 || response.status == 404) {
                    let chapters = response.payload.chapters.map(chapter => {

                        return {
                            id: chapter._id,
                            title: chapter.title,
                            description: chapter.description,
                            data: chapter.data || '[{\"tag\":\"h1\",\"text\":\"Dummy Text\"}]',
                        }
                    })
                    console.log(chapters);
                    eventBus.dispatchEvent('response.chapters.found', chapters)
                }
            })
        })

        eventBus.addSuscriber('bring.chapter.from.server', (id) => {
            console.log(id);
            this.apiClient(
                'GET', this.url + '/chapter/' + id
            ).then(response => {
                console.log(response);
                localStorage.setItem('chapter', id)
                let data = JSON.parse(response.payload.data || "[{\"tag\":\"h1\",\"text\":\"Dummy Text\"}]")
                eventBus.dispatchEvent('dom.render.page', data)
            })
        })




        eventBus.addSuscriber('create.new.chapter', (params) => {
            this.apiClient('POST', this.url + '/chapter', {
                title: params[0],
                description: params[0]
            }).then(response => {
                console.log(response.status, response.payload)
            })
        })
        eventBus.addSuscriber('update.chapter.header', (params) => {
            this.apiClient('PATCH', this.url + '/chapter/' + params[0], {
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
                method
                , headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded'
                }
                // ,referrerPolicy: 'origin'
                // , mode: 'no-cors'
            }
            if (body) {
                params.body = JSON.stringify(body)
                console.log(params.body);
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