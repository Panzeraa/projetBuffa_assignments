import { Component /*, Input*/, OnInit } from '@angular/core';
import {Subject} from '../subject.model';
import {SubjectsService} from '../../shared/subjects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-detail-subject',
  templateUrl: './detail-subject.component.html',
  styleUrls: ['./detail-subject.component.css']
})
export class DetailSubjectComponent implements OnInit {
  // @Input() assignmentTransmis:Assignment;
  subjectTransmis: Subject;

  constructor(private subjectService: SubjectsService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    // on récupère l'id passé dans l'URL via l'objet snapshot
    // attention l'url étant composé de strings on utilisera
    // "+" pour forcer la conversion en number
    const id = this.route.snapshot.params.id;

    console.log(id);
    this.subjectService.getSubject(id)
      .subscribe(a => this.subjectTransmis = a);
  }
  onDelete() {
    this.subjectService.deleteSubject(this.subjectTransmis)
    .subscribe((message) => {
      console.log(message);
      this.subjectTransmis = null;
      this.router.navigate(['home']); // dans le subscribe pour n'afficher
                                      // la page d'accueil que quand le dete
                                      // a bien été effectué dans MongoDB
    });
  }

  onClickEdit() {
    this.router.navigate(['/subject', this.subjectTransmis._id, 'edit'],
                          {
                            queryParams: {nom: this.subjectTransmis.name},
                            fragment: 'edition'
                          });
  }

  isAdmin() {
     return this.authService.loggedIn;
  }
}
