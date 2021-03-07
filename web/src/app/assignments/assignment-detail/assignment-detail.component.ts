import { Component /*, Input*/, Inject, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../assignments.component';

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
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    // on récupère l'id passé dans l'URL via l'objet snapshot
    // attention l'url étant composé de strings on utilisera
    // "+" pour forcer la conversion en number
    const id = this.route.snapshot.params.id;

    console.log(id);
    this.assignmentService.getAssignment(id)
      .subscribe(a => this.assignmentTransmis = a);
  }

  // openDialog(): void {
  //   // event.previousContainer.data[event.previousIndex]['name'], event.previousContainer.data[event.previousIndex]['_id']
  //   const dialogRef = this.dialog.open(NoteDetailAssignmentDialog, {
  //     width: '500px',
  //     data: { name: this.assignmentTransmis.name, _id: this.assignmentTransmis._id }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     console.log(result);

  //     if (result.hasOwnProperty('note') && result.hasOwnProperty('remarque')) {
  //       if (result.note >= 0 && result.note <= 20 && !isNaN(result.note) && result.note != null) {
  //         result.rendu = true;
  //         this.assignmentService.updateAssignment(result)
  //           .subscribe((message) => {
  //             console.log(message);
  //             console.log("transfer");
  //               this.assignmentTransmis.rendu = true;
  //               this.assignmentTransmis.note = result.note;
  //               this.assignmentTransmis.remarque = result.remarque;
  //               this.assignmentService.updateAssignment(this.assignmentTransmis)
  //                 .subscribe((message) => {
  //                   console.log(message);
  //                   this.assignmentTransmis = null;
  //                   this.router.navigate(['home']);
  //                  });
  //           });
  //       }
  //       else {
  //         this.openSnackBar("Les valeurs sont invalides.")
  //       }
  //     }
  //     else {
  //       this.openSnackBar("Les valeurs sont invalides.")
  //     }
  //   });
  // }

  openSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
    });
  }

  onAssignmentRendu() {
    this.authService.isAdmin()
      .then((authentifie: Boolean) => {
        if (authentifie) {
          this.onClickEdit();
        } else {
          alert("Vous ne disposez pas de toutes les permissions pour effectuer cette action.\nVeuillez vous connecter.")
        }
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
    this.router.navigate(['/assignment', this.assignmentTransmis._id, 'edit'],
      {
        queryParams: { nom: this.assignmentTransmis.name },
        fragment: 'edition'
      });
  }

  isAdmin() {
    return this.authService.loggedIn;
  }
}
