import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  // permet d'éviter de l'ajouter dans les modules....
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(private logginService: LoggingService,
    private http: HttpClient) { }


  // assignments: Assignment[] = [
  //   {
  //     id: 1,
  //     nom: 'TP WebComponents INTENSE',
  //     dateDeRendu: new Date('2020-11-17'),
  //     rendu: true,
  //     eleve: 'John Carter',
  //     matiere: 'Base de données',
  //     note: '15',
  //     remarque: 'Des progres... continue !'
  //   },
  //   {
  //     id: 2,
  //     nom: 'TP Angular INTENSE',
  //     dateDeRendu: new Date('2020-12-03'),
  //     rendu: false,
  //     eleve: 'Alexis Delage',
  //     matiere: 'Communication',
  //     note: '16',
  //     remarque: 'Des progres... continue !'
  //   },
  //   {
  //     id: 3,
  //     nom: 'TP React INTENSE',
  //     dateDeRendu: new Date('2021-01-10'),
  //     rendu: false,
  //     eleve: 'Michel Braws',
  //     matiere: 'Angular',
  //     note: '14',
  //     remarque: 'Des progres... continue !'
  //   },
  // ];

  public students: any = [];

  uri = 'http://localhost:8010/api/';

  getAssignments(nextPage: Number = 1, limit: Number = 10, rendu: Boolean = false): Observable<Object> {
    return this.http.get<Object>(this.uri + "assignments" + `?page=${nextPage}&limit=${limit}&rendu=${rendu ? 1 : 0}`)
  }

  getAssignment(id): Observable<Assignment> {
    return this.http.get<Assignment>(this.uri + "assignments" + '/' + id)
      .pipe(
        tap(_ => {
          console.log('Assignment id= ' + id +
            ',requête GET envoyée dans le cloud et réponse reçue...');
        }),
        catchError(this.handleError<Assignment>(`getAssignment(id=${id})`))
      );
  }

  private handleError<T>(operation, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // pour afficher l'erreur dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }

  getNewId(): number {
    return Math.floor((Math.random() * 100000));
  }

  addAssignment(assignment: Assignment): Observable<any> {
    // this.assignments.push(assignment);

    this.logginService.log(assignment.name, 'ajouté');

    // return of("assignmet ajouté");

    return this.http.post(this.uri + "assignments", assignment);
  }


  updateAssignment(assignment: Assignment): Observable<any> {
    /*this.assignments.forEach((a, index) => {
      if(a === assignment) {
        this.assignments[index] = assignment;
      }
    });*/
    this.logginService.log(assignment.name, 'modifié');

    /*
    let pos = this.assignments.indexOf(assignment);
    this.assignments[pos] = assignment;
    */

    // return of("assignmentt modifié");
    return this.http.put(this.uri + "assignments", assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    this.logginService.log(assignment.name, 'supprimé');

    // let pos = this.assignments.indexOf(assignment);
    // this.assignments.splice(pos, 1);

    // il faut _id et pas _id car _id est l'id mongoDB alors que id
    // est celui que nous générons manuellement.... on aurait pu se passer,
    // en fait, de id si on était partis directement sur mongoDB...
    const deleteURI = this.uri + "assignments" + '/' + assignment._id;
    return this.http.delete(deleteURI);
  }

  getStudents() {
    this.http.get<Object>(this.uri + "students").subscribe((data) => {
      this.students = data;
    });
  }
}
