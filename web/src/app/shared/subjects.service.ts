import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggingService } from './logging.service';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(private logginService: LoggingService,
    private http: HttpClient) { }

  uri = 'http://localhost:8010/api/subjects';

  getSubjects(): Observable<Object> {
    return this.http.get<Object>(this.uri)
  }
}
