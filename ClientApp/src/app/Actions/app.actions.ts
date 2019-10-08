import {Injectable} from '@angular/core'
import {Action} from '@ngrx/store'
import {User} from '../Models/app.model'
import {State} from '../Models/app.model'

export const CHANGE_CHANNEL = 'CHANGE'

export class ChangeChannel implements Action {
    type = CHANGE_CHANNEL

    constructor(public payload: string){}
}

export class ChangeMessages implements Action {
    type = 'CHANGE_MESSAGES'

    constructor(public payload: Object){}
}

export const messagesAction = (data) => {
    return {
        type: 'CHANGE_MESSAGES',
        payload: data
    }
}

export class SetUser implements Action {
    type = 'SET'

    constructor(public payload: User) {}
}

export const channelAction = (channel) => {
    return {
        type: CHANGE_CHANNEL,
        payload: channel
    }
}