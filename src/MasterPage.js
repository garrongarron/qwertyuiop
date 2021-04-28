import cache from './Cache.js';
class MasterPage {
    constructor(pageName) {
        this.container = null
        this.pageName = pageName
    }
    toString() {
        return this.pageName
    }
    open() {
        if (!this.container) this.init()
        document.body.appendChild(this.container)
    }
    close() {
        cache.appendChild(this.container)
    }
}

export default MasterPage