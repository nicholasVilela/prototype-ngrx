import { Component } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { firebaseConfig } from '../firebase.config.js'

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})

export class LoginComponent {
    app = firebase.initializeApp(firebaseConfig)

    googleLogin(){
        
    }
}
