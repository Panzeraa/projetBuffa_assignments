import { Component, OnInit } from '@angular/core';
import {Subject} from '../subject.model';
import {SubjectsService} from '../../shared/subjects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css']
})
export class EditSubjectComponent implements OnInit {
  subject: Subject;

  constructor(private subjectService: SubjectsService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  const id = this.route.snapshot.params.id;

  this.subjectService
  .getSubject(id)
  .subscribe((sub) => (this.subject = sub));

  const paramsHTTP = this.route.snapshot.queryParams;
  const fragment = this.route.snapshot.fragment;
  console.log('Query Params :');
  console.log(paramsHTTP);
  console.log('Fragment :');
  console.log(fragment);
  }

  onSaveSubject(event) {
    event.preventDefault();

    this.subjectService
    .updateSubject(this.subject)
    .subscribe((message) => {
    console.log(message);
    // retour à la page d'accueil en étant sûr que l'update est terminé
    this.router.navigate(['/subjects']);
    });
  }

  onDeleteSubject() {
    this.subjectService.deleteSubject(this.subject)
      .subscribe((message) => {
        console.log(message);
        this.subject = null;
        this.router.navigate(['home']); // dans le subscribe pour n'afficher
        // la page d'accueil que quand le dete
        // a bien été effectué dans MongoDB
      });
  }
}
            