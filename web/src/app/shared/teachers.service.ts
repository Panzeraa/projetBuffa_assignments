import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggingService } from './logging.service';
import {Observable, of} from 'rxjs';
import { Teacher } from '../teachers/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  constructor(private logginService: LoggingService,
    private http: HttpClient) { }

  public teachers: Teacher;

  uriImg = 'https://assignmentrestapi.herokuapp.com/api/image';
  uri = 'https://assignmentrestapi.herokuapp.com/api/teachers';

  public getTeachers() {
    this.http.get<Teacher>(this.uri).subscribe((data) => {
      this.teachers = data;
    })
  }

  addTeacher(teacher: Teacher): Observable<any> {
    // this.assignments.push(assignment);

    this.logginService.log(teacher.name, 'ajouté');
    console.log(teacher.name, 'ajouté');
    // return of("assignmet ajouté");

    return this.http.post(this.uri, teacher);
  }
}
