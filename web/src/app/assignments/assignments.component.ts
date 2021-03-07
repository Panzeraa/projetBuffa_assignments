import { AfterViewInit, Component, NgZone, OnInit, ViewChild, Inject } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { map, pairwise, filter, throttleTime } from 'rxjs/operators';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubjectsService } from '../shared/subjects.service';
import { AuthService } from '../shared/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  _id: string;
  name: string;
  note: number;
  remarque: string;
}

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit, AfterViewInit {
  assignmentsRendu: Assignment[] = [];
  assignmentsNonRendu: Assignment[] = [];

  page: Number;
  nextPage: Number = 1;
  limit: Number = 20;
  countAssignments: Number;

  pageNonRendu: Number;
  nextPageNonRendu: Number = 1;
  limitNonRendu: Number = 20;
  countAssignmentsNonRendu: Number;


  constructor(private _snackBar: MatSnackBar,
     private authService: AuthService, 
     private assignmentService: AssignmentsService, 
     private ngZone: NgZone, 
     private ngZoneNonRendu: NgZone, 
     public dialog: MatDialog, 
     public subjectsService: SubjectsService) { }

  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;
  @ViewChild('scrollerNonRendu') scrollerNonRendu: CdkVirtualScrollViewport;

  ngAfterViewInit(): void {
    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
      throttleTime(200)
    ).subscribe(() => {
      this.ngZone.run(() => {
        this.getAssignmentsRendu();
      })
    })

    this.scrollerNonRendu.elementScrolled().pipe(
      map(() => this.scrollerNonRendu.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
      throttleTime(200)
    ).subscribe(() => {
      this.ngZoneNonRendu.run(() => {
        this.getAssignmentsNonRendu();
      })
    })
  }
  ngOnInit(): void {
    this.getAssignmentsRendu();
    this.getAssignmentsNonRendu();
  }
  getAssignmentsRendu() {
    if (!this.nextPage)
      return
    this.assignmentService.getAssignments(this.nextPage, this.limit, true)
      .subscribe((data) => {
        this.page = data['page']
        this.nextPage = data['nextPage']
        this.countAssignments = data['totalDocs']
        this.assignmentsRendu = this.assignmentsRendu.concat(data['docs']);
      });
  }
  getAssignmentsNonRendu() {
    if (!this.nextPageNonRendu)
      return
    this.assignmentService.getAssignments(this.nextPageNonRendu, this.limitNonRendu, false)
      .subscribe((data) => {
        this.pageNonRendu = data['page'];
        this.nextPageNonRendu = data['nextPage'];
        this.countAssignmentsNonRendu = data['totalDocs'];
        this.assignmentsNonRendu = this.assignmentsNonRendu.concat(data['docs']);
      });
  }

  openDialog(event: CdkDragDrop<Assignment[]>): void {
    // event.previousContainer.data[event.previousIndex]['name'], event.previousContainer.data[event.previousIndex]['_id']
    const dialogRef = this.dialog.open(NoteAssignmentDialog, {
      width: '500px',
      data: { name: event.previousContainer.data[event.previousIndex]['name'], _id: event.previousContainer.data[event.previousIndex]['_id'] }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      if (result.hasOwnProperty('note') && result.hasOwnProperty('remarque')) {
        if (result.note >= 0 && result.note <= 20 && !isNaN(result.note) && result.note != null) {
          result.rendu = true;
          this.assignmentService.updateAssignment(result)
            .subscribe((message) => {
              console.log(message);
              console.log("transfer");
              event.previousContainer.data[event.previousIndex]['note'] = result.note;
              event.previousContainer.data[event.previousIndex]['remarque'] = result.remarque;
              transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
              // this.getAssignmentsRendu();
              // this.getAssignmentsNonRendu();
            });
        }
        else {
          this.openSnackBar("Les valeurs sont invalides.")
        }
      }
      else {
        this.openSnackBar("Les valeurs sont invalides.")
      }
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
    });
  }

  drop(event: CdkDragDrop<Assignment[]>) {
    //TODO Prendre en compte connexion
    if (event.previousContainer === event.container) {
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.authService.isAdmin()
        .then((authentifie: Boolean) => {
          if (authentifie) {
            this.openDialog(event);
          } else {
            alert("Vous ne disposez pas de toutes les permissions pour effectuer cette action.\nVeuillez vous connecter.")
          }
        });
    }
  }
}

@Component({
  selector: 'note-assignment-dialog',
  templateUrl: 'note-assignment-dialog.html',
})
export class NoteAssignmentDialog {
  constructor(
    public dialogRef: MatDialogRef<NoteAssignmentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
