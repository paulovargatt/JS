import {CameraController} from './CameraController'
import {DocumentPreviewController} from './DocumentPreviewController'

export class MenuController {

    static EventsMenu(scope){
        scope.el.btnAttach.on('click', e => {
            e.stopPropagation();
            scope.el.menuAttach.addClass('open'); //Bind para não perder o escopo de classe
            document.addEventListener('click', this.closeMenuAttach.bind(scope));
        });

        scope.el.btnAttachPhoto.on('click', e=> {
            scope.el.inputPhoto.click();
        });

        scope.el.inputPhoto.on('change', e => {
            console.log(scope.el.inputPhoto.files);
            [...scope.el.inputPhoto.files].forEach(file => {
                console.log(file)
            });
        })


        scope.el.btnAttachCamera.on('click', e=> {
            this.closeAllMainPanel(scope);
            scope.el.panelCamera.addClass('open');
            scope.el.panelCamera.css({
                'height':'calc(100% - 266px)'
            });

            this._camera = new CameraController(scope.el.videoCamera);
        });

        scope.el.btnClosePanelCamera.on('click', e => {
            scope.el.panelCamera.removeClass('open');
            scope.el.panelMessagesContainer.show();
            this._camera.stop()
        });

        scope.el.btnTakePicture.on('click', e => {
            scope._camera.takePicture();
            console.log('take')
        });

        scope.el.btnAttachDocument.on('click', e=> {
            this.closeAllMainPanel(scope);
            scope.el.panelDocumentPreview.addClass('open');
            // scope.el.

            scope.el.inputDocument.click();
        });

        scope.el.inputDocument.on('change', e => {
           if(scope.el.inputDocument.files.length){
               let file = scope.el.inputDocument.files[0];
               console.log(file)
               scope._documentPreviewController = new DocumentPreviewController(file);
               scope._documentPreviewController.getPreviewData().then(data => {
                   console.log(data)
                   scope.el.imgPanelDocumentPreview.src = data.src;
                   scope.el.infoPanelDocumentPreview.innerHTML = data.info;

                   scope.el.imagePanelDocumentPreview.show();
                   scope.el.filePanelDocumentPreview.hide();


               }).catch(err => {

                   switch (file.type){
                       case 'application/vnd.ms-excel':
                       case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                           scope.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-xls';
                           break;
                       case 'application/vnd.ms-powerpoint':
                       case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                           scope.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-ppt';
                           break;

                       case 'application/msword':
                       case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                           scope.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-doc';
                           break;

                       default:
                           scope.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-generic';
                        break;
                   }
                   scope.el.filenamePanelDocumentPreview.innerHTML = file.name
                   scope.el.imagePanelDocumentPreview.hide();
                   scope.el.filePanelDocumentPreview.show();

                   console.log(err)
               })
           }
        });

        scope.el.btnClosePanelDocumentPreview.on('click', e => {
            this.closeAllMainPanel(scope);
            scope.el.panelMessagesContainer.show();
        });

        scope.el.btnSendDocument.on('click', e => {
            console.log(e)
        });

        scope.el.btnAttachContact.on('click', e => {
            scope.el.modalContacts.show();
        });

        scope.el.btnCloseModalContacts.on('click', e => {
            scope.el.modalContacts.hide();
        });
    }

   static closeMenuAttach(scope){
        this.el.menuAttach.removeClass('open');
        document.removeEventListener('click', this.closeMenuAttach);
    }

    static closeAllMainPanel(scope){
        scope.el.panelMessagesContainer.hide();
        scope.el.panelDocumentPreview.removeClass('open');
        scope.el.panelCamera.removeClass('open');
    }

}
