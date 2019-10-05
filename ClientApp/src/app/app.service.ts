import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
export class AppService{
   listener: Subject<any> = new Subject()
}