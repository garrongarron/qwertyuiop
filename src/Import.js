import eventBus from "./EventBus.js";
import loader from "./Loader.js";

class ImportFile {
    start(){
        eventBus.addSuscriber('upload.content.json',(params)=>{
            this.upload(params.e, params.container)
        })
    }
    
    stop(){
        
    }

    upload(e, container) {
        var file = e.target.files[0];
        var textType = 'application/json';

        if (file.type.match(textType)) {
            var reader = new FileReader();

            reader.onload = function(e) {
                localStorage.setItem('data', reader.result);
                container.innerHTML = ''
                loader.load(JSON.parse(reader.result))
            }

            reader.readAsText(file);
        } else {
            console.error('error', e)
        }
    }
}

const importFile = new ImportFile();

export default importFile;