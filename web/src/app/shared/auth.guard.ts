import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;

    return this.authService.isAdmin()
    .then((authentifie: Boolean) => {
      if (authentifie) {
        return true;
      } else {
        // avant d'interdire la navigation on renvoie aussi vers la page
        // d'accueil
        this.router.navigate(['/home']);
        return false;
      }
    });

  }

}
