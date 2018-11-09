import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from '../shared/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/index';
import { MatDialog } from '@angular/material';
import { SendRestoreLinkComponent } from '../send-restore-link/send-restore-link.component';
import { AuthStoreFacadeService } from '../shared/services/auth-store-facade.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signIn: FormGroup;
  hide = true;
  serverError$: Observable<string>;
  constructor(public fb: FormBuilder,
              public auth: AuthService,
              public dialog: MatDialog,
              private authFacadeService: AuthStoreFacadeService) { }

  ngOnInit() {

    // First Step
    this.signIn = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.required
      ]
      ],
    });
    this.getError();
  }

  getError() {
    this.serverError$ = this.authFacadeService.getSignInErrors$();
  }

  socialSignIn() {
    this.auth.loginWithGoogle();
  }

  signInEmail() {
    if (this.signIn.valid) {
      this.authFacadeService.signInEmail(this.signIn.value);
    }
  }

  // Using getters will make your code look pretty
  get email() { return this.signIn.get('email'); }
  get password() { return this.signIn.get('password'); }

  // Step 1
  signup() {
    // this.auth.emailSignUp(this.email.value, this.password.value);
  }

  openForgot(e) {
    const dialogRef = this.dialog.open(SendRestoreLinkComponent, {
       minWidth: '320px',
      // height: '300px',
      data: null
    });
  }

}
