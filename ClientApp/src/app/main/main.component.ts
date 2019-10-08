import { Component, OnInit, Output, EventEmitter, Inject, Injectable } from '@angular/core'
import * as firebase from 'firebase'
import * as signalR from '@microsoft/signalr'
import {firebaseConfig} from '../firebase.config.js'
import {AppState} from '../app.state'
import {State} from '../Models/app.model'
import {User} from '../Models/app.model'
import {Store, select} from '@ngrx/store'
import {Observable, Subscription, Subject} from 'rxjs'
import { ChatComponent } from '../chat/chat.component.js'
import {SignalRService} from '../signalR/signalRService'
import { FirebaseService } from '../Firebase/firebaseService.js'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [SignalRService, FirebaseService]
})
@Injectable() 
export class MainComponent implements OnInit{
  constructor(private signalR: SignalRService, public firebaseService: FirebaseService) {}

  ngOnInit() {
    this.signalR.startConnection()
    this.signalR.addMessageListener()
  }
}