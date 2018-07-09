import {ClassEvent} from "../util/ClassEvent";

export class MicrophoneController extends ClassEvent{
    constructor(){
        super();
    }

    static eventsMicrophone(scope){
        scope.el.btnSendMicrophone.on('click', e => {
            scope.el.recordMicrophone.show();
            scope.el.btnSendMicrophone.hide();
            this.startRecorMicrophoneTime(scope);
        });

        scope.el.btnCancelMicrophone.on('click', e=> {
            this.closeRecordMicrophone(scope)
        })

        scope.el.btnFinishMicrophone.on('click', e=> {
            this.closeRecordMicrophone(scope)
        })
    }

    static closeRecordMicrophone(scope){
        scope.el.recordMicrophone.hide();
        scope.el.btnSendMicrophone.show();
        clearInterval(scope._recordMicrophoneInterval);
    }

    static startRecorMicrophoneTime(scope){
        let start = Date.now();
        scope._recordMicrophoneInterval = setInterval(()=> {
            scope.el.recordMicrophoneTimer.innerHTML = Format.toTime(Date.now() - start);
        }, 100)
    }

}