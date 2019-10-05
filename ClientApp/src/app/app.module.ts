import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';

import {StoreModule} from '@ngrx/store'
import {channelReducer} from './Reducers/app.reducers';
import {userReducer} from './Reducers/app.reducers';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component'

import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { firebaseConfig } from '../app/firebase.config'

import { FormsModule } from '@angular/forms';
import { ChannelHeaderComponent } from './channel-header/channel-header.component';
import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SidebarComponent,
    LoginComponent,
    ChatComponent,
    ChannelHeaderComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({
      stateStore: channelReducer,
      userStore: userReducer
    }),
    RouterModule.forRoot([
      { path: 'chat', component: MainComponent, pathMatch: 'full'},
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]), 
    CommonModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
