import { Injectable, Output, ɵɵNgOnChangesFeature } from '@angular/core'
import { firebaseConfig } from '../firebase.config.js'
import * as firebase from 'firebase'
import { Subscription } from 'rxjs'
import {Store, select} from '@ngrx/store'
import { AppState, MessageState } from '../app.state.js'
import { FirebaseDatabase } from '@angular/fire'
import { validateEventsArray } from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/auth'
import { SetUser, ChangeMessages, messagesAction } from '../Actions/app.actions.js'
 
@Injectable()
export class FirebaseService {
    constructor(private stateStore: Store<AppState>, public afAuth: AngularFireAuth, private messageStore: Store<MessageState>){}
    messages
    messagesState: Subscription = this.messageStore
        .select(state => state.messagesStore.messages)
        .subscribe(x => this.messages = x)

    user: string[]
    userState: Subscription = this.stateStore
        .select(state => state.userStore.map(x => x.displayName))
        .subscribe(x => this.user = x)
    database = firebase.database()
    

    public startFirebase = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
        }
    }

    public addMessage = (channel, user, message) => {
        const messageData = {
            user: user,
            channel: channel,
            message: message,
            date: new Date()
        }

        console.log('adding')
    
        const messageKey = this.database.ref().child(channel).push().key
        const updates = {}
        updates[`${channel}/messages/${messageKey}`] = messageData
    
        this.database.ref().update(updates)
    }

    public readMessages = (channel) => {
        this.messages = [{}]
        console.log('reading')
        this.database
            .ref(channel)
            .once('value')
            .then(snap => {
                snap.forEach(messageList => {
                    messageList.forEach(message => {
                        this.messageStore.dispatch(messagesAction({
                            type: 'CHANGE_MESSAGES',
                            payload: {
                                user: message.val().user,
                                message: message.val().message,
                                date: message.val().date
                            }
                        }))
                    })
                })
                console.log(this.messages)
            })

    }

    public googleLogin = () => {
        return new Promise<any>((resolve, reject) => {
            const provider = new firebase.auth.GoogleAuthProvider()
            this.afAuth.auth
                .signInWithPopup(provider)
                .then(res => {
                    resolve(res)
                    console.log(res)  
                    this.stateStore.dispatch(new SetUser({uid: res.user.uid, displayName: res.user.displayName}))
                    this.user.forEach(x => console.log(x))
                })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }
}