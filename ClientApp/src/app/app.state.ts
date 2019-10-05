import {State} from './Models/app.model'
import {User} from './Models/app.model'

export interface AppState {
    stateStore: State[]
    userStore: User[]
}