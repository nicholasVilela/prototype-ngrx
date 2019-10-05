import { Component, OnInit, Injectable } from '@angular/core'
import {Store} from '@ngrx/store'
import {State} from '../Models/app.model'
import {AppState} from '../app.state'
import {Observable, Subscription} from 'rxjs'
import {channelAction} from '../Actions/app.actions'
import {ChatComponent} from '../chat/chat.component'
import { AppService } from '../app.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [AppService]
})
@Injectable()
export class SidebarComponent implements OnInit {
  state: Observable<State[]>
  active = document.activeElement.tagName
  channels = []
  messages: [{}] = [{}]
  currentChannel: string[]
  channelState: Subscription = this.store
    .select(state => state.stateStore.map(x => x.currentChannel))
    .subscribe(x => this.currentChannel = x)  

  constructor(private store: Store<AppState>, private service: AppService) {
    this.state = this.store.select('stateStore')
    this.state.forEach(x => x.forEach(i => this.channels.push(i.channels)))
  }

  changeChannel(channel) {
    this.store.dispatch(channelAction(channel))
    console.log('changed')
    this.service.listener.next()
  }
  
  ngOnInit() {
  }

}
