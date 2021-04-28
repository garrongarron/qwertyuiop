import eventBus from "./EventBus.js"
import landingPage from "./LandingPage.js";

class ImageLoader{
    constructor(){}
    start(){
        eventBus.addSuscriber('image.loader.start',(e)=>{
            this.upload(e)
        })
    }

    upload(e){
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            eventBus.dispatchEvent('duplicate.btn',null) 
            eventBus.dispatchEvent('machine.image.loaded', reader.result)
        }
        reader.readAsDataURL(file);
    }
    stop(){}
}

let imageLoader = new ImageLoader()

export default imageLoader