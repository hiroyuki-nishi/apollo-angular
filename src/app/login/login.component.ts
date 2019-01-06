import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from './../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  onSubmitLogin(value: any): void {
    const email = value.email, password = value.password;
    this.auth.signIn(email, password)
      .subscribe(
        result => {
          if (result.challengeName === 'NEW_PASSWORD_REQUIRED') {
            this.changePassword(email, password, result);
          } else {
            this.router.navigate(['/home']);
          }
        },
        error => console.log(error)
      );
  }

  private changePassword(email: string, password: string, result): void {
    this.auth.changePassword(email, password, result);
  }
}
