import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { map, pairwise, filter, throttleTime } from 'rxjs/operators';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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
  constructor(private assignmentService: AssignmentsService, private ngZone: NgZone, private ngZoneNonRendu: NgZone) { }

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
        this.pageNonRendu = data['page']
        this.nextPageNonRendu = data['nextPage']
        this.countAssignmentsNonRendu = data['totalDocs']
        this.assignmentsNonRendu = this.assignmentsNonRendu.concat(data['docs']);
      });
  }

  drop(event: CdkDragDrop<Assignment[]>) {
    if (event.previousContainer === event.container) {
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      var note = parseFloat(prompt("Entrez la note : "));
      console.log(note);
      console.log(isNaN(note));
      if(!isNaN(note)) {
        console.log("transfer");
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
    }
  }
}
