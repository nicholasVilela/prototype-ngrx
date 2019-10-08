import { Injectable, Output } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, MessageState } from '../app.state';
import { ChangeMessages, messagesAction } from '../Actions/app.actions.js';
import { messagesReducer } from '../Reducers/app.reducers';
 
@Injectable()
export class SignalRService {
  constructor(private store: Store<MessageState>){}
  messages
  messagesState: Subscription = this.store
    .select(state => state.messagesStore.messages)
    .subscribe(x => this.messages = x)
 
  private connection: signalR.HubConnection
 
  public startConnection = () => {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('/chat')
      .build();
 
    this.connection
      .start()
      .then(() => console.log('Connection started'))
      .then(() => this.joinChannel("Public"))
      .catch(err => console.log('Error while starting connection: ' + err))
  }
 
  public addMessageListener = () => {
    this.connection
      .on('ReceiveMessage', (user:string, message:string) => {
        console.log('Received.')
        const messageData = {
            user: user,
            message: message,
            date: new Date()
        }
        this.store.dispatch(messagesAction({
          type: 'CHANGE_MESSAGES',
          payload: messageData
        }))
      });
  }

  public joinChannel = (channel) => {
    this.connection
        .invoke('JoinChannel', channel)
        .then(() => console.log(`Successfully joined ${channel}.`))
        .catch(err => console.log(err))
  }

  public sendChannelMessage = (channel, user, message) => {
      this.connection   
        .invoke('SendChannelMessage', channel, user, message)
        .then(() => console.log('Sent message.'))
        .catch(err => console.log(err))
  }
}