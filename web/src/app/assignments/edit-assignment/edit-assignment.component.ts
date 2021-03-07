import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectsService } from 'src/app/shared/subjects.service';
@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment: Assignment;

  constructor(
    public assignmentService: AssignmentsService,
    public subjectsService: SubjectsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;

    this.assignmentService
      .getAssignment(id)
      .subscribe((ass) => {
        this.assignment = ass
        this.assignment.idStudent = this.assignment['student']['_id']
        this.assignment.idSubject = this.assignment['subject']['_id']
        this.assignment.note = this.assignment.note == -1?null:this.assignment.note;

        delete this.assignment['student']
        delete this.assignment['subject']
        console.log(this.assignment)
      });



    const paramsHTTP = this.route.snapshot.queryParams;
    const fragment = this.route.snapshot.fragment;
    console.log('Query Params :');
    console.log(paramsHTTP);
    console.log('Fragment :');
    console.log(fragment);

    this.subjectsService.getSubjects();
    this.assignmentService.getStudents();
  }

  checkRendu(){
    this.assignment.rendu = true;
  }

  uncheckRendu(){
    this.assignment.remarque = null;
    this.assignment.note = null;
  }

  onSaveAssignment(event) {
    event.preventDefault();

    this.assignmentService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);
        // retour à la page d'accueil en étant sûr que l'update est terminé
        this.router.navigate(['home']);
      });


  }
}
