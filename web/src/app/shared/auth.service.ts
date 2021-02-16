import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:8010/api/utilisateurs';

  logIn(user: any): Observable<any> {
    this.loggedIn = true;
    return this.http.post(this.uri, user);
  }

  logOut() {
    this.loggedIn = false;
  }

  isAdmin() {
    const isUserAdmin = new Promise(
      (resolve, reject) => {
        resolve(this.loggedIn);
      }
    );

    return isUserAdmin;
  }
}
