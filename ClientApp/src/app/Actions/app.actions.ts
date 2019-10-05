import {Injectable} from '@angular/core'
import {Action} from '@ngrx/store'
import {User} from '../Models/app.model'
import {State} from '../Models/app.model'

export const CHANGE_CHANNEL = 'CHANGE'

export class ChangeChannel implements Action {
    type = CHANGE_CHANNEL

    constructor(public payload: string){}
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