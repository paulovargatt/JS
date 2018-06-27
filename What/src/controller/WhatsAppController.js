class WhatsAppController {

    constructor(){

        this.elementsPrototype();
        this.loadElements();
        this.initEvents();
    }
    elementsPrototype(){
        return Prototypes.addProto();
    }

    loadElements(){
        this.el = {};
        document.querySelectorAll('[id]').forEach(element => {
            this.el[Format.getCamelCase(element.id)] = element
        });

    }

    initEvents(){
        this.el.myPhoto.on('click', e => {
            this.closeAllLeftPanel();
            this.el.panelEditProfile.show();
            setTimeout(()=>{
                this.el.panelEditProfile.addClass('open');
            },300)
        });


        this.el.btnNewContact.on('click', e => {
            this.closeAllLeftPanel();
            this.el.panelAddContact.show();
            setTimeout(()=>{
                this.el.panelAddContact.addClass('open');
            },300)
        });

        this.el.btnClosePanelEditProfile.on('click', e => {
            this.el.panelEditProfile.removeClass('open');
        });

        this.el.btnClosePanelAddContact.on('click', e => {
            this.el.panelAddContact.removeClass('open')
        });
    }

    closeAllLeftPanel(){
        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();
    }
}