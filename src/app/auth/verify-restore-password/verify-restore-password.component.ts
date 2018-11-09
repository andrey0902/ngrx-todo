import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { RestorePassword } from '../shared/restore-password.model';
import { Observable } from 'rxjs/index';
import { AuthStoreFacadeService } from '../shared/services/auth-store-facade.service';

@Component({
  selector: 'app-verify-restore-password',
  templateUrl: './verify-restore-password.component.html',
  styleUrls: ['./verify-restore-password.component.scss']
})
export class VerifyRestorePasswordComponent implements OnInit {
  @Input() code: any;
  public passwordForm: FormGroup;
  public serverError$: Observable<string>;
  public hide = true;
  public hideConfirm = true;
  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private authFacadeService: AuthStoreFacadeService) { }

  ngOnInit() {
    this.createForm();
    this.getSendNewPasswordError();
  }

  getSendNewPasswordError() {
    this.serverError$ = this.authFacadeService.getSendNewPasswordErrors$();
  }

  public onSubmit(form: FormGroup): void {
    if (form.valid) {
      const data: RestorePassword = {
        code: this.code,
        newPassword: form.value.password
      };

      this.authFacadeService.dispatchSendNewPassword(data);

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
