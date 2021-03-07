import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggingService } from './logging.service';
import {Observable, of} from 'rxjs';
import { Subject } from '../subjects/subject.model';
import {map, tap, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(private logginService: LoggingService,
    private http: HttpClient) { }

  public subjects: Subject;

  uriImg = 'http://localhost:8010/api/image';
  uri = 'http://localhost:8010/api/';

  public getSubjects() {
    this.http.get<Subject>(this.uri + 'subjects').subscribe((data) => {
      this.subjects = data;
    })
  }

  getSubject(id): Observable<Subject> {
    return this.http.get<Subject>(this.uri + 'subject/' + id)
      .pipe(
      tap(_ => {
        console.log('Assignment id= ' + id +
                        ',requête GET envoyée dans le cloud et réponse reçue...');
      }),
      catchError(this.handleError<Subject>(`getAssignment(id=${id})`))
    );
  }
  private handleError<T>(operation, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // pour afficher l'erreur dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }

  updateSubject(subject: Subject): Observable<any> {
    this.logginService.log(subject.name, 'modifié');
    return this.http.put(this.uri + 'subjects', subject);
  }

  deleteSubject(subject: Subject): Observable<any> {
    this.logginService.log(subject.name, 'supprimé');
    const deleteURI = this.uri + 'subject/' + subject._id;
    return this.http.delete(deleteURI);
  }

  addSubject(subject: Subject): Observable<any> {
    this.logginService.log(subject.name, 'ajouté');
    return this.http.post(this.uri + 'subjects', subject);
  }
}
