import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import {AssignmentsService} from './shared/assignments.service';

// import * as data from "./../assets/assignments.json"

import {Assignment} from './assignments/assignment.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titre = 'Application de gestion des devoirs (Assignments)';
  constructor(private assignmentService: AssignmentsService,private authService: AuthService, private router: Router) {

  }


  // assignments_json: any = (data as any).default;

  // peupler(){
  //   for (let i = 0; i < this.assignments_json.length; i++) {
  //     const a = this.assignments_json[i]

  //     const new_assignment = new Assignment();

  //     new_assignment.id = this.assignmentService.getNewId();

  //     new_assignment.name = a.nom;
  //     new_assignment.dateDeRendu = new Date(a.dateDeRendu);
  //     new_assignment.rendu = false;
  //     this.assignmentService.addAssignment(new_assignment)
  //       .subscribe(message => {
  //         console.log("Assignment Créé");
  //       });
  //   }
  // }

  login() {
    // if (this.authService.loggedIn) {
    //   this.authService.logOut();
    //   this.router.navigate(['/home']);
    // } else {
    //   this.authService.logIn();
    // }
  }
}
