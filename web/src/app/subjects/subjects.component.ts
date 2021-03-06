import { Component, OnInit } from '@angular/core';
import { SubjectsService } from '../shared/subjects.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  constructor(public subjectsService: SubjectsService) { }

  ngOnInit(): void {
    this.subjectsService.getSubjects();
  }

}
