const firebase = require('firebase');
require('firebase/firestore');

export class Firebase {
    constructor(){
        this._config = {
            apiKey: "AIzaSyCjZeTzAQKDCv9ENTGIFhBv8JMgzkOFUZw",
            authDomain: "whats-vargatt.firebaseapp.com",
            databaseURL: "https://whats-vargatt.firebaseio.com",
            projectId: "whats-vargatt",
            storageBucket: "",
            messagingSenderId: "49830676912"
        };
        this.init();
    }

    init(){
        if(!window._initializedFirebase){
            firebase.initializeApp(this._config);

            firebase.firestore().settings({
                timestampsInSnapshots: true
            });

            window._initializedFirebase = true;
        }
    }

    static db(){
        return firebase.firestore();
    }

    static hd(){
        return firebase.storage();
    }

    initAuth(){
        return new Promise((s, f) => {
            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
                .then(result => {
                    let token = result.credential.accessToken;
                    let user = result.user;
                    s({
                        user,
                        token
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        })
    }
}