import { Component, /*EventEmitter,*/ OnInit /*, Output*/ } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from '../../shared/assignments.service';
import {Assignment} from '../assignment.model';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';


import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { SubjectsService } from 'src/app/shared/subjects.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class AddAssignmentComponent implements OnInit {
  // @Output() nouvelAssignment = new EventEmitter<Assignment>();
  nouvelAssignment: Assignment;
  nomAssignment = '';
  dateRendu: Date;
  eleveAssignment = '';
  matiereAssignment =  '';
  noteAssignment = null;
  remarqueAssignment = '';
  renduAssignment = false;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(public assignmentService: AssignmentsService, private router: Router, private _formBuilder: FormBuilder, public subjectsService: SubjectsService) { }

  ngOnInit(): void {
    this.subjectsService.getSubjects();
    this.assignmentService.getStudents();
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
    // this.thirdFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
  }

  checkRendu(){
    this.renduAssignment = true;
  }

  uncheckRendu(){
    this.noteAssignment = null;
    this.remarqueAssignment = "";
  }

  saveAssignment(event) {
    event.preventDefault();

    console.log('onSubmit dans add-assignment');
    const nouvelAssignment = new Assignment();


    nouvelAssignment.idStudent = this.eleveAssignment;
    nouvelAssignment.name = this.nomAssignment;
    nouvelAssignment.idSubject = this.matiereAssignment;
    nouvelAssignment.dateDeRendu = this.dateRendu;
    nouvelAssignment.note = this.noteAssignment==null?-1:this.noteAssignment;
    nouvelAssignment.remarque = this.remarqueAssignment;
    nouvelAssignment.rendu = this.renduAssignment;

    // this.assignments.push(nouvelAssignment);
    // on envoie un événement appelé "nouvelAssignment" vers le père (ou autres..)
    // this.nouvelAssignment.emit(nouvelAssignment);

    this.assignmentService.addAssignment(nouvelAssignment)
      .subscribe(message => {
        console.log(message);
        // on navigue vers la page d'accueil, en mettant cette ligne ici on est sur
        // d'afficher le nouvel élément inséré...
        this.router.navigate(['home']);
      });


  }

}
