import pageList from './PageList.js';
class Router {
    constructor(pageList) {
        this.prevPage = null
        this.pageList = pageList
    }
    goTo(pageName) {
        if (this.pageList[pageName]) {
            if (this.prevPage) this.prevPage.close()
            this.pageList[pageName].open()
            this.prevPage = this.pageList[pageName]
        } else {
            console.log('Page not found');
        }
    }
}
let router = new Router(pageList)
export default router