import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Observable } from 'rxjs/index';
import { AuthStoreFacadeService } from '../shared/services/auth-store-facade.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUp: FormGroup;
  hide = true;
  serverError: null;
  error$: Observable<string>;
  constructor(public fb: FormBuilder,
              public auth: AuthService,
              private authFacadeService: AuthStoreFacadeService) { }

  ngOnInit(): void {
    this.createForm();
    this.getError();

  }



  getError() {
    this.error$ = this.authFacadeService.getSignUpErrors$();
  }

  createForm(): void {
    this.signUp = this.fb.group({
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
  }

  socialSignIn(): void {
    this.auth.loginWithGoogle();
  }

  // Using getters will make your code look pretty
  get email(): AbstractControl { return this.signUp.get('email'); }
  get password(): AbstractControl { return this.signUp.get('password'); }

  // Step 1
  onSubmit(e) {
    e.preventDefault();
    this.authFacadeService.signUpEmail({
      email: this.email.value,
      password: this.password.value
    });
  }

}
