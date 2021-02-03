import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  log(assignmentName, action) {
    console.log('Log: l\'assignment ' +
                assignmentName + ' a été ' + action);
  }
}
