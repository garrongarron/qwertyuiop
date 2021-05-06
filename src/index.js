import buttonManager from './ButtonManager.js';
import database from './Database.js';
import deleteBtn from './DeleteBtn.js';
import duplicateBtn from './DuplicateBtn.js';
import exportFile from './Export.js';
import importFile from './Import.js';
import nodeBuilder from './NodeBuilder.js';
import PageList from './PageList.js';
import router from './Router.js';
import textarea from './TextArea.js';
import './OneFile.js';
import imageLoader from './ImageLoader.js';
import loader from './Loader.js';
import machine from './Machine.js';
import serverConector from './ServerConector.js';
import eventBus from './EventBus.js';

router.goTo(PageList.landingPage)
textarea.start()
duplicateBtn.start()
database.start()
nodeBuilder.start()
buttonManager.start()
deleteBtn.start()
importFile.start()
imageLoader.start()
exportFile.start()
loader.start()
serverConector.start()
machine.start()

//todo mejorar arquitectura
document.querySelector('#container').innerText = 'Loading...'
setTimeout(() => {
    if(location.search.length>1){
        let id = location.search.replace('?c=', '')
        eventBus.dispatchEvent('bring.chapter.from.server', id)
    }
}, 1000);
