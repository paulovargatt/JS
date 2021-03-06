export class CameraController {
    constructor(videoEl){
        this._videoEl = videoEl;

        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(stream =>{
            this._stream = stream;
            this._videoEl.src = URL.createObjectURL(stream);
            this._videoEl.play();

        }).catch(erro => {
            console.log(erro)
        });
    }

    stop(){
        this._stream .getTracks().forEach(track => {
            track.stop()
        });
    }

    takePicture(mimeType = 'image/png'){
        let canvas = document.createElement('canvas');
        canvas.setAttribute()
    }
}