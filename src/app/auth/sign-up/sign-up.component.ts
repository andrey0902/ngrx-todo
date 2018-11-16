import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Observable } from 'rxjs/index';
import { AuthStoreFacadeService } from '../shared/services/auth-store-facade.service';
import { HelperValidators } from '../../input/shared/helper-validators';

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
  errorMessage = {
    pattern: () =>  'Wrong pattern'
  };
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
        Validators.pattern(/^([a-z0-9_-]+\.)*[a-z0-9_+0-9-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/),
        Validators.minLength(6),
        Validators.maxLength(50)
      ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.required
      ]
      ]
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
