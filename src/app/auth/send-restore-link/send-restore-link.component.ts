import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs/index';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AuthService } from '../shared/auth.service';
import { catchError, filter, takeUntil } from 'rxjs/internal/operators';
import { AuthStoreFacadeService } from '../shared/services/auth-store-facade.service';

@Component({
  selector: 'app-send-restore-link',
  templateUrl: './send-restore-link.component.html',
  styleUrls: ['./send-restore-link.component.scss']
})
export class SendRestoreLinkComponent implements OnInit, OnDestroy {

  public onDestroy$ = new Subject();
  public retrieveForm: FormGroup;
  public serverError$: Observable<string>;
  public sendSuccess$: Observable<boolean>;

  constructor(public dialogRef: MatDialogRef<SendRestoreLinkComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private auth: AuthService,
              private authFacadeService: AuthStoreFacadeService) { }

  ngOnInit() {
    this.createForm();
    this.getServerError();
    this.getSendSuccessLink();
    // this.retrieveForm.valueChanges
    //   .pipe(takeUntil(this.onDestroy$))
    //   .subscribe(value => {
    //     if (this.serverError) {
    //       this.serverError = false;
    //     }
    //   });
  }

  getSendSuccessLink() {
    this.sendSuccess$ = this.authFacadeService.getSendSuccessLink$();
  }

  getServerError() {
    this.serverError$ = this.authFacadeService.getRestorePasswordErrors$();
  }

  public closed() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.authFacadeService.defaultRestoreState();
  }

  public createForm() {
    this.retrieveForm = this.fb.group({
      email: [null, [
        Validators.required,
        Validators.minLength(5),
        this.auth.checkEmail
      ]]
    });
  }

  public getErrorMessage(control: FormControl) {
   // return this.handlerError.getError(control);
  }

  public onSubmit( form: FormGroup) {

    if (form.valid) {
      console.log(form);
      this.authFacadeService.sendRestoreLink(form.value);
      // this.auth.resetPassword(form.value)
      //   .pipe(catchError(error => {
      //       this.serverError = error.error;
      //       return of('error');
      //     }),
      //     filter(value =>  value !== 'error'))
      //   .subscribe(response => {
      //     this.successSend = true;
      //   });
    }
  }

}
