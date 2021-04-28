import isEditor from './Auth.js';
import cache from './Cache.js';
import chapterCreator from './ChapterCreator.js';
import eventBus from './EventBus.js';
import searchController from './SearcherController.js';

class Searcher {
    constructor() {
        this.creator = false
        let searcher = document.createElement('div')
        searcher.id = 'searcher'
        searcher.classList.add('searcher')

        let header = document.createElement('div')
        header.classList.add('searcher-header')
        searcher.appendChild(header)


        let input = document.createElement('input')
        input.classList.add('text-to-search')
        header.appendChild(input)

        let searchBtn = document.createElement('input')
        searchBtn.classList.add('btn-to-search')
        searchBtn.setAttribute('type', 'button')
        searchBtn.value = 'search'
        searchBtn.addEventListener('click', () => {
            eventBus.dispatchEvent('search.text.in.chapters', input.value)
        })
        header.appendChild(searchBtn)


        let newChapterBtn = document.createElement('input')
        newChapterBtn.classList.add('btn-new-chapter')
        newChapterBtn.setAttribute('type', 'button')
        newChapterBtn.value = 'New Chapter'
        newChapterBtn.addEventListener('click', () => {
            this.creator = !this.creator
            if (this.creator) {
                chapterCreator.start(header, newChapterBtn)
            } else {
                chapterCreator.stop()
            }
        })
        if (isEditor()) {
            header.appendChild(newChapterBtn)
        }

        this.body = document.createElement('div')
        let title = document.createElement('strong')
        title.innerText = 'Results:'
        this.body.classList.add('searcher-body')
        this.body.appendChild(title)
        searcher.appendChild(this.body)
        this.container = searcher
    }
    start() {
        searchController.start(this)
        document.body.appendChild(this.container)
    }
    clase() {
        cache.appendChild(this.container)
        searchController.stop()
    }
}

let searcher = new Searcher()
export default searcher