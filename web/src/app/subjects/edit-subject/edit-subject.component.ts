import { Component, OnInit } from '@angular/core';
import { Subject } from '../subject.model';
import { SubjectsService } from '../../shared/subjects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css']
})
export class EditSubjectComponent implements OnInit {
  subject: Subject;

  constructor(private subjectService: SubjectsService,
    public assignmentService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
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

  openSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
    });
  }

  fileChange(event) {
    console.log(event);
    let fileList: FileList = event.target.files;
    console.log(fileList);
    if (fileList.length > 0) {
      let file: File = fileList[0];
      console.log(file);
      let formData: FormData = new FormData();
      formData.append('uploadfile', file, this.subject._id);
      console.log(formData.get("uploadfile"));

      this.assignmentService
        .sendFile(formData)
        .subscribe((message) => {
          this.openSnackBar("L'image a bien été envoyé")
          console.log(message);
        });

      // this.restApi.envoiFichier("contacts/icon/" + this._contact.id, "post", null, formData, true).then(success => {
      //   // console.log(success);
      //   this.toastsService.displayMessage("Votre icon a bien été envoyé.", null, 'Icon ajouté');
      // }).catch(error => {
      //   console.log("error : " + error);
      // });
    }
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
