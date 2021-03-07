import { BrowserModule } from '@angular/platform-browser';
import {NgModule, ViewChild} from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {MatGridListModule} from '@angular/material/grid-list';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { FormsModule } from '@angular/forms';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { RouterModule, Routes } from '@angular/router';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AuthGuard } from './shared/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { LoginComponent } from './login/login.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { AddSubjectComponent } from './subjects/add-subject/add-subject.component';
import { EditSubjectComponent } from './subjects/edit-subject/edit-subject.component';
import { DetailSubjectComponent } from './subjects/detail-subject/detail-subject.component';
import { NoteAssignmentDialog } from './assignments/assignments.component';
import { TeachersComponent } from './teachers/teachers.component';
import { RemarquePipe } from './shared/remarque.pipe';


const routes: Routes = [
  {path: '', component: AssignmentsComponent},
  {path: 'home', component: AssignmentsComponent},
  {path: 'add', component: AddAssignmentComponent},
  {path: 'assignment/:id', component: AssignmentDetailComponent},
  {
    path: 'assignment/:id/edit',
    component: EditAssignmentComponent,
    canActivate: [AuthGuard]
  },
  {path: 'subjects', component: SubjectsComponent},
  {path: 'subjects/add', component: AddSubjectComponent},
  {path: 'subject/:id', component: DetailSubjectComponent},
  {path: 'subject/:id/edit', component: EditSubjectComponent,
  canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    LoginComponent,
    SubjectsComponent,
    AddSubjectComponent,
    EditSubjectComponent,
    DetailSubjectComponent,
    NoteAssignmentDialog,
    TeachersComponent,
    RemarquePipe
  ],
  imports: [
    ScrollingModule,
    BrowserModule,
    BrowserAnimationsModule, MatButtonModule,
    MatIconModule, MatDividerModule, MatRadioModule,
    MatInputModule, MatFormFieldModule,
    MatDatepickerModule, MatNativeDateModule,
    MatListModule, MatCardModule, MatSelectModule,
    MatCheckboxModule, MatSlideToggleModule,
    MatToolbarModule,MatMenuModule,MatTabsModule,MatStepperModule,
    MatGridListModule,DragDropModule,MatDialogModule,MatSnackBarModule,
    FormsModule, HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
