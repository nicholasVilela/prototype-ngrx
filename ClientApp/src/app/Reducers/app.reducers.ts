import {Action} from '@ngrx/store'
import {State, User, Messages} from '../Models/app.model'
import { ChangeChannel, ChangeMessages } from '../Actions/app.actions'
import { SetUser } from '../Actions/app.actions'

const initialState: State = {
    currentChannel: 'Public',
    channels: ['Public', 'Other'],
}

export const channelReducer = (state: State[] = [initialState], action: ChangeChannel) => {
    switch(action.type) {
        case 'CHANGE':
            state[0].currentChannel = action.payload
            return state
        default:
            return state
    }
}

export const userReducer = (state: User[] = [], action: SetUser) => {
    switch(action.type) {
        case 'SET':
            return [...state, action.payload]
        default:
            return state
    }
}

export const messagesReducer = (state: Messages[] = [], action: ChangeMessages) => {
    switch(action.type) {
        case 'CHANGE_MESSAGES':
            return [...state, action.payload]
        default:
            return state
    }
}