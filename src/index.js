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
