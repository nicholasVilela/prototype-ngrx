import { Component, OnInit, Output, EventEmitter, Inject, Injectable } from '@angular/core'
import * as firebase from 'firebase'
import * as signalR from '@microsoft/signalr'
import {firebaseConfig} from '../firebase.config.js'
import {AppState, MessageState} from '../app.state'
import {State} from '../Models/app.model'
import {User} from '../Models/app.model'
import {Store, select} from '@ngrx/store'
import {Observable, Subscription, Subject} from 'rxjs'
import { validateEventsArray } from '@angular/fire/firestore'
import { getLocaleDateTimeFormat } from '@angular/common'
import { SidebarComponent } from '../sidebar/sidebar.component.js'
import { MainComponent } from '../main/main.component.js'
import { SignalRService } from '../signalR/signalRService.js'
import { FirebaseService } from '../Firebase/firebaseService.js'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [SignalRService, FirebaseService]
})
@Injectable() 
export class ChatComponent implements OnInit{
  constructor(public messageStore: Store<MessageState>, public store: Store<AppState>, public signalRService: SignalRService, public firebaseService: FirebaseService) {}

  message: string = ''
  messages
  messagesState: Subscription = this.messageStore
    .select(state => state.messagesStore.messages)
    .subscribe(x => this.messages = x)

  user: string[]
  userState: Subscription = this.store
    .select(state => state.userStore.map(x => x.displayName))
    .subscribe(x => this.user = x)

  channel: string[]
  channelState: Subscription = this.store
    .select(state => state.stateStore.map(x => x.currentChannel))
    .subscribe(x => this.channel = x)

  sendMessage() {
    this.signalRService.sendChannelMessage(this.channel[0], this.user[0], this.message)
    this.firebaseService.addMessage(this.channel[0], this.user[0], this.message)
    this.message = ''
    this.firebaseService.readMessages(this.channel[0])
    console.log(this.messages)
  }

  ngOnInit() {
    this.signalRService.startConnection()
    this.firebaseService.startFirebase()
    this.firebaseService.readMessages(this.channel[0])
  }
}
