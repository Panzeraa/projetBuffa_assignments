import {AfterViewInit, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import {Assignment} from './assignment.model';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {map, pairwise,filter,throttleTime} from 'rxjs/operators';
@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit, AfterViewInit {
  assignments: Assignment[] = [];
  page : Number;
  nextPage : Number = 1;
  limit : Number = 10;
  countAssignments : Number ;
  constructor(private assignmentService: AssignmentsService,private ngZone: NgZone) {  }

  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;

  ngAfterViewInit():void{
    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
      throttleTime(200)
    ).subscribe(() => {
      this.ngZone.run(() => {
        this.getAssignments();
      })
    })
  }
  ngOnInit(): void {
    this.getAssignments();
  }
  getAssignments() {
    if(!this.nextPage)
      return
    this.assignmentService.getAssignments(this.nextPage,this.limit)
      .subscribe((data) => {
        this.page = data['page']
        this.nextPage = data['nextPage']
        this.countAssignments = data['totalDocs']
        this.assignments = this.assignments.concat(data['docs']);
    });
  }
}
