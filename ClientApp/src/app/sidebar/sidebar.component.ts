import { Component, OnInit, Injectable } from '@angular/core'
import {Store} from '@ngrx/store'
import {State} from '../Models/app.model'
import {AppState} from '../app.state'
import {Observable, Subscription} from 'rxjs'
import {channelAction} from '../Actions/app.actions'
import {ChatComponent} from '../chat/chat.component'
import { MainComponent } from '../main/main.component'
import * as signalR from '@microsoft/signalr'
import { SignalRService } from '../signalR/signalRService'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [SignalRService]
})
export class SidebarComponent implements OnInit {
  constructor(private store: Store<AppState>, public signalR: SignalRService) {
    this.state = this.store.select('stateStore')
    this.state.forEach(x => x.forEach(i => this.channels.push(i.channels)))
  }
  state: Observable<State[]>
  channels = []
  currentChannel: string[]
  channelState: Subscription = this.store
    .select(state => state.stateStore.map(x => x.currentChannel))
    .subscribe(x => this.currentChannel = x)  

  changeChannel(channel) {
    this.store.dispatch(channelAction(channel))
    this.signalR.joinChannel(channel)
  }
  
  ngOnInit() {
    this.signalR.startConnection()
    this.signalR.addMessageListener()
  }

}
