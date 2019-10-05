import { Component, OnInit, Output, EventEmitter, Inject, Injectable } from '@angular/core'
import * as firebase from 'firebase'
import * as signalR from '@aspnet/signalr'
import {firebaseConfig} from '../firebase.config.js'
import {AppState} from '../app.state'
import {State} from '../Models/app.model'
import {User} from '../Models/app.model'
import {Store, select} from '@ngrx/store'
import {Observable, Subscription, Subject} from 'rxjs'
import { validateEventsArray } from '@angular/fire/firestore'
import { getLocaleDateTimeFormat } from '@angular/common'
import { SidebarComponent } from '../sidebar/sidebar.component.js'
import { AppService } from '../app.service.js'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [AppService]
})
@Injectable() 
export class ChatComponent implements OnInit {
  constructor(public store: Store<AppState>, private service: AppService) {
    this.service.listener.subscribe(() => this.readMessagesFromDB())
  }

  message: string = ''
  messages: [{}] = [{}]

  user: string[]
  userState: Subscription = this.store
    .select(state => state.userStore.map(x => x.displayName))
    .subscribe(x => this.user = x)

  channel: string[]
  channelState: Subscription = this.store
    .select(state => state.stateStore.map(x => x.currentChannel))
    .subscribe(x => this.channel = x)

  app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
  database = firebase.database()

  connection = new signalR.HubConnectionBuilder()
        .withUrl('/chat')
        .build()

  sendMessage() {
    // console.log(this.message)
    this.connection
      .invoke('SendChannelMessage', this.channel[0], this.user[0], this.message)
      // .then(() => console.log(this.message))
      .then(() => this.message = '')
      .catch(err => console.log(err))

    this.addMessageToDB(this.channel[0], this.user[0], this.message)
    // console.log(this.sidebarComp.messages)
  }

  addMessageToDB(channel: string, user: string, message: string) {
      const messageData = {
        user: user,
        channel: channel,
        message: message,
        date: new Date()
      }

      const messageKey = this.database.ref().child(channel).push().key

      const updates = {}
      updates[`${channel}/messages/${messageKey}`] = messageData

      this.database.ref().update(updates)

      this.readMessagesFromDB()
  }

  readMessagesFromDB() {
    this.messages = [{}]  
    const read = this.database
      .ref(`${this.channel}`)
      .once('value')
      .then(snap => {
        snap.forEach(messageList => {
          messageList.forEach(message => {
            const user = message.val().user
            const mess = message.val().message
            const date = message.val().date
            this.messages.push({user: user, message: mess, date: date})
          })
        })
      })
    return read
  }

   async setup() {
      await this.connection
          .start()
          .then(() => console.log('Connection Successful'))
          .catch(err => console.log(err))

      this.connection
          .on('ReceiveMessage', (user: string, message: string) => {
              const text = `${user}: ${message}`
              
          }) 
    }

    ngOnInit() {
      this.setup()
      // this.readMessagesFromDB()
    }
}
