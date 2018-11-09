import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {
  public passwordForm: FormGroup;
  public serverError = false;
  public hide = true;
  public hideConfirm = true;
  private key: string;
  private email: string;
  constructor(private fb: FormBuilder,
              private auth: AuthService) { }

  ngOnInit() {
    this.createForm();
  }

  public onSubmit(form: FormGroup): void {
    if (form.valid) {
      const params = {
        email: this.email,
        'reset_password_token': this.key,
      };
      console.log(form.value);
      // this.auth.changePassword(this.password.value);
     // this.auth.forgotPassword(form.value.email);

      // this.authService.sendNewPassword(form.value.password, params)
      //   .pipe(catchError(error => {
      //       this.serverError = error.error;
      //       return of('error');
      //     }),
      //     filter(value =>  value !== 'error'))
      //   .subscribe(result => {
      //     setTimeout(() => {
      //       this.snotifyService.clear();
      //       this.router.navigate(['/auth/sign-in']);
      //     }, 2500);
      //   });
    }
  }

  get password() {
    return this.passwordForm.get('password');
  }

  public getErrorMessage(control: FormControl) {
    // return this.handlerError.getError(control);
  }

  private createForm() {
    this.passwordForm = this.fb.group({
      email: [null, [         Validators.required,
        Validators.minLength(6),
        Validators.maxLength(128)]],
        password: [null, [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(128)
        ]],
        confirmPassword: [null, [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(128)
        ]],
      },
      { validator: this.auth.passwordMatch });
  }
}
