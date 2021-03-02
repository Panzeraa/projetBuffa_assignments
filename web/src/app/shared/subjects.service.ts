import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggingService } from './logging.service';
import {Observable, of} from 'rxjs';
import { Subject } from '../subjects/subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(private logginService: LoggingService,
    private http: HttpClient) { }

  public subjects: Subject;

  uri = 'http://localhost:8010/api/subjects';

  public getSubjects() {
    this.http.get<Subject>(this.uri).subscribe((data) => {
      this.subjects = data;
    })
  }
}
