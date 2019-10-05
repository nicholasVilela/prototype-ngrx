import { Component, OnInit } from '@angular/core'
import {Store} from '@ngrx/store'
import {State} from '../Models/app.model'
import {AppState} from '../app.state'
import {Observable} from 'rxjs'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  state: Observable<State[]>
  constructor(private store: Store<AppState>) {
    this.state = store.select('stateStore')
  }

  ngOnInit() {
  }

}
