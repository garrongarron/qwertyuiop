import eventBus from "./EventBus.js"
import searchResultFactory from "./SearchResult.js"

class SearchController{
    constructor(){
        this.searcher = null
        this.ul = null
    }
    start(searcher){
        if(this.searcher == null) this.init(searcher)
        eventBus.addSuscriber('response.chapters.found',(list)=>{
            this.ul.innerText = ''
            for (let index = 0; index < list.length; index++) {
                let chapter = list[index]
                let result = searchResultFactory.getResult(chapter.id, chapter.title, chapter.description)
                this.ul.appendChild(result)
            }
        })
    }
    init(searcher){
        this.ul = document.createElement('ul')
        searcher.body.appendChild(this.ul)
        this.searcher = searcher
    }
    stop(){}
}

let searchController = new SearchController()
export default searchController