import { AngularFireAuth } from '@angular/fire/auth'
import { Component } from '@angular/core'
import * as firebase from 'firebase/app'
import {User} from '../Models/app.model'
import {AppState} from '../app.state'
import {Observable} from 'rxjs'
import {Store} from '@ngrx/store'
import {SetUser} from '../Actions/app.actions'

@Component({  
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })

export class LoginComponent {
    user: Observable<User[]>

    constructor(public afAuth: AngularFireAuth, private store: Store<AppState>){
      this.user = store.select('userStore')
    }

    googleLogin(){
        return new Promise<any>((resolve, reject) => {
            const provider = new firebase.auth.GoogleAuthProvider()
            this.afAuth.auth
                .signInWithPopup(provider)
                .then(res => {
                    resolve(res)
                    console.log(res)  
                    this.store.dispatch(new SetUser({uid: res.user.uid, displayName: res.user.displayName}))
                    this.user.forEach(x => console.log(x))
                })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }
}
