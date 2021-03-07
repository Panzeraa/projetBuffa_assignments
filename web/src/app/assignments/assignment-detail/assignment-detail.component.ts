import { Component /*, Input*/, OnInit } from '@angular/core';
import {Assignment} from '../assignment.model';
import {AssignmentsService} from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  // @Input() assignmentTransmis:Assignment;
  assignmentTransmis: Assignment;

  constructor(private assignmentService: AssignmentsService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    // on récupère l'id passé dans l'URL via l'objet snapshot
    // attention l'url étant composé de strings on utilisera
    // "+" pour forcer la conversion en number
    const id = this.route.snapshot.params.id;

    console.log(id);
    this.assignmentService.getAssignment(id)
      .subscribe(a => this.assignmentTransmis = a);
  }

  onAssignmentRendu() {
    this.assignmentTransmis.rendu = true;

    this.assignmentService.updateAssignment(this.assignmentTransmis)
      .subscribe((message) => {
        console.log(message);
        this.assignmentTransmis = null;
        this.router.navigate(['home']);
       });

  }

  onDelete() {
    this.assignmentService.deleteAssignment(this.assignmentTransmis)
    .subscribe((message) => {
      console.log(message);
      this.assignmentTransmis = null;
      this.router.navigate(['home']); // dans le subscribe pour n'afficher
                                      // la page d'accueil que quand le dete
                                      // a bien été effectué dans MongoDB
    });
  }

  onClickEdit() {
    this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit'],
                          {
                            queryParams: {nom: this.assignmentTransmis.nom},
                            fragment: 'edition'
                          });
  }

  isAdmin() {
     return this.authService.loggedIn;
  }
}
