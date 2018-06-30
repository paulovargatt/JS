class MenuController {

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
        });

        scope.el.btnAttachDocument.on('click', e=> {
            this.closeAllMainPanel(scope);
            scope.el.panelDocumentPreview.addClass('open');
            // scope.el.
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
