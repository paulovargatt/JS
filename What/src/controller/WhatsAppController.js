import {Format} from './../util/Format';
import {Prototypes} from  './../util/Prototypes';
import {MenuController} from './MenuController'
import {MicrophoneController} from './MicrophoneController'
import {Firebase} from "../util/Firebase";
import {User} from "../model/User";

export class WhatsAppController {

    constructor(){
        this._firebase = new Firebase();
        this.initAuth();
        this.elementsPrototype();
        this.loadElements();
        this.initEvents();

    }

    initAuth(){
        this._firebase.initAuth()
            .then(response => {
                this._user = new User(response.user.email);

                this._user.on('datachange', data => {
                   document.querySelector('title').innerHTML = data.name + ' - Whats ';

                   this.el.inputNamePanelEditProfile.innerHTML = data.name;

                   if(data.photo){
                    let photo = this.el.imgPanelEditProfile;
                    photo.src = data.photo;
                    photo.show();
                    this.el.imgDefaultPanelEditProfile.hide();

                    let photo2 = this.el.myPhoto.querySelector('img');
                       photo2.src = data.photo;
                       photo2.show();

                   }
                });

                this._user.name = response.user.displayName;
                this._user.email = response.user.email;
                this._user.photo = response.user.photoURL;

                this._user.save().then(()=> {
                    this.el.appContent.css({
                        display:'flex'
                    });
                });

            })
            .catch(err => {
                console.log('err', err)

            })
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

        this.el.photoContainerEditProfile.on('click', e => {
            this.el.inputProfilePhoto.click();
        });

        this.el.inputNamePanelEditProfile.on('keypress', e => {
           if(e.key == 'Enter'){
               e.preventDefault();
               this.el.btnSavePanelEditProfile.click();
           }
        });

        this.el.btnSavePanelEditProfile.on('click', e => {
            this.el.btnSavePanelEditProfile.disabled = true;
            this._user.name = this.el.inputNamePanelEditProfile.innerHTML;
            this._user.save().then(()=>{
                this.el.btnSavePanelEditProfile.disabled = false;
            });

            console.log();
        });

        this.el.formPanelAddContact.on('submit', e => {
            e.preventDefault();
            let formData = new FormData(this.el.formPanelAddContact);
            let contact = new User(formData.get('email'));

            contact.on('datachange', data => {
               if(data.name){
                   this._user.addContact(contact).then(()=>{
                       this.el.btnClosePanelAddContact.click();
                       console.info('contato add')
                   });
               }else{
                   console.log('Usuário não encontrado')
               }
            });
        })

        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item => {
            console.log(item)
            item.on('click', e => {
                this.el.home.hide();
                this.el.main.css({
                    display: 'flex'
                });
            });
        });

       MenuController.EventsMenu(this);
       MicrophoneController.eventsMicrophone(this);

        this.el.inputText.on('keypress', e => {
            if(e.key === 'Enter' && !e.ctrlKey){
                e.preventDefault();
                this.el.btnSend.click();
            }
        })


       this.el.inputText.on('keyup', e => {
          if(this.el.inputText.innerHTML.length){
              this.el.inputPlaceholder.hide();
              this.el.btnSendMicrophone.hide();
              this.el.btnSend.show();
          }else{
              this.el.inputPlaceholder.show();
              this.el.btnSendMicrophone.show();
              this.el.btnSend.hide();
          }
       });

       this.el.btnSend.on('click', e => {
           console.log(this.el.inputText.innerHTML)
       })

        this.el.btnEmojis.on('click', e => {
            this.el.panelEmojis.toggleClass('open')
        });

       this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji => {
           emoji.on('click', e => {
               console.log(emoji.dataset.unicode);

               let img = this.el.imgEmojiDefault.cloneNode();

               img.style.cssText = emoji.style.cssText;
               img.dataset.unicode = emoji.dataset.unicode;
               img.alt = emoji.dataset.unicode;

               emoji.classList.forEach(name => {
                  img.classList.add(name)
               });

               let cursor = window.getSelection();

               if(!cursor.focusNode || !cursor.focusNode.id == 'input-text'){
                   this.el.inputText.focus();
                   cursor = window.getSelection();
               }

               let range = document.createRange();

               range = cursor.getRangeAt(0);
               range.deleteContents();

               let frag = document.createDocumentFragment();
               frag.appendChild(img);
               range.insertNode(frag)
               range.setStartAfter(img);
               this.el.inputText.focus()
               this.el.inputText.dispatchEvent(new Event('keyup'))

           })
       });


    }


    closeAllLeftPanel(){
        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();
    }
}