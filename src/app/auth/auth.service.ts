import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {map, tap, catchError} from 'rxjs/operators';
import Amplify, {Auth} from 'aws-amplify';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';

@Injectable()
export class AuthService {
  loggedIn: BehaviorSubject<boolean>;

  constructor(private router: Router) {
    Amplify.configure(environment.amplify);
    this.loggedIn = new BehaviorSubject<boolean>(false);
  }

  signUp(email: string, password: string): Observable<any> {
    return fromPromise(Auth.signUp(email, password));
  }

  confirmSignUp(email: string, code: string): Observable<any> {
    return fromPromise(Auth.confirmSignUp(email, code));
  }

  signIn(email: string, password: string): Observable<any> {
    return fromPromise(Auth.signIn(email, password))
      .pipe(
        tap(() => this.loggedIn.next(true))
      );
  }

  changePassword(email: string, password: string, result) {
    if (result.challengeName === 'NEW_PASSWORD_REQUIRED') {
      if (!result.challengeParam.userAttributes.email) result.challengeParam.userAttributes.email = email;
      result.completeNewPasswordChallenge(password, result.challengeParam.userAttributes, {
        onSuccess: session => {
          console.log('success ' + session);
        },
        onFailure: err => {
          console.log('completeNewPassword failure', err);
        }
      });
    }
  }

  isAuthenticated(): Observable<boolean> {
    return fromPromise(Auth.currentAuthenticatedUser())
      .pipe(
        map(_result => {
          console.log('t');
          this.loggedIn.next(true);
          return true;
        }),
        catchError(error => {
          console.log('e');
          this.loggedIn.next(false);
          return of(false);
        })
      );
  }

  signOut() {
    fromPromise(Auth.signOut())
      .subscribe(
        _result => {
          this.loggedIn.next(false);
          this.router.navigate(['/login']);
        },
        error => console.log(error)
      );
  }
}