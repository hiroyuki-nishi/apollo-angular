import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {AuthService} from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public loggedIn: boolean;
  private subscription: Subscription;

  constructor(
    public auth: AuthService
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.auth.isAuthenticated()
      .subscribe(result => {
        this.loggedIn = result;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClickLogout(): void {
    this.auth.signOut();
  }
}
