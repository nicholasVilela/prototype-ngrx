import {State, User, Messages} from './Models/app.model'

export interface AppState {
    stateStore: State[]
    userStore: User[]
}

export interface MessageState {
    messagesStore: Messages
}