import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectsService } from '../../shared/subjects.service';
import {Subject} from '../subject.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {TeachersService} from 'src/app/shared/teachers.service';


@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class AddSubjectComponent implements OnInit {

  nouveauSubject: Subject;
  teacherSubject: '';
  nameSubject: '';
  constructor(private subjectService: SubjectsService, private router: Router, private _formBuilder: FormBuilder, public teachersService: TeachersService) { }

  ngOnInit(): void {
    this.teachersService.getTeachers();
  }

  onSubmit() {
    //event.preventDefault();

    console.log('onSubmit dans add-subject');
    const nouveauSubject = new Subject();

    nouveauSubject.idTeacher = this.teacherSubject;
    nouveauSubject.name = this.nameSubject;

    if(nouveauSubject.idTeacher!=null && nouveauSubject.name!=null) {
      this.subjectService.addSubject(nouveauSubject)
      .subscribe(message => {
        console.log(message);
        // on navigue vers la page d'accueil, en mettant cette ligne ici on est sur
        // d'afficher le nouvel élément inséré...
        this.router.navigate(['/subject', message.id, 'edit']);
      });
    } else {
     alert("Les champs 'Nom de l'enseignement' et 'Enseignant(e)' sont obligatoires");
    }
  }

}
