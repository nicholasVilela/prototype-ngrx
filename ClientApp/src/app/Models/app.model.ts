export interface User {
    uid: string
    displayName: string
}

export interface State {
    currentChannel: string
    channels: string[]
}

export interface Messages {
    messages:any
}