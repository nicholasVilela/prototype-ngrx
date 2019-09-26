import { AngularFireAuth } from '@angular/fire/auth'
import * as firebase from 'firebase/app'
import { Component } from '@angular/core'
import { firebaseConfig } from '../firebase.config.js'

  export class LoginComponent {
      app = firebase.initializeApp(firebaseConfig)
      constructor(public afAuth: AngularFireAuth){}

      googleLogin(){
          return new Promise<any>((resolve, reject) => {
            const provider = new firebase.auth.GoogleAuthProvider()
            this.afAuth.auth
                .signInWithPopup(provider)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
          })
      }
  }
  