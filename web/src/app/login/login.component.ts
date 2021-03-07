import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService) { }

  public user = {
    username : "",
    password : ""
  }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logOut();
    console.log(this.authService.isAdmin())
  }

  login(){
    console.log(this.user.username + this.user.password)
    this.authService.logIn(this.user)
    .subscribe(message => {
      console.log(this.authService.loggedIn);
      console.log(message);
      // on navigue vers la page d'accueil, en mettant cette ligne ici on est sur
      // d'afficher le nouvel élément inséré...
      // this.router.navigate(['home']);S
    });
  }

}
