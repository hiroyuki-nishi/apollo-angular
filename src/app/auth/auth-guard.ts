import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.isAuthenticated()
      .pipe(
        tap(loggedIn => {
          if (!loggedIn) {
            this.router.navigate(['/login']);
          }
        })
      );
  }
}

