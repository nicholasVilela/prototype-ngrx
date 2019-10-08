import { AngularFireAuth } from '@angular/fire/auth'
import { Component } from '@angular/core'
import * as firebase from 'firebase/app'
import {User} from '../Models/app.model'
import {AppState} from '../app.state'
import {Observable} from 'rxjs'
import {Store} from '@ngrx/store'
import {SetUser} from '../Actions/app.actions'
import { FirebaseService } from '../Firebase/firebaseService'

@Component({  
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [FirebaseService]
  })

export class LoginComponent {
    user: Observable<User[]>

    constructor(public afAuth: AngularFireAuth, private store: Store<AppState>, public firebaseService: FirebaseService){
      this.user = store.select('userStore')
    }

    googleLogin(){
        this.firebaseService.googleLogin()
    }
}
