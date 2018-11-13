import { Component, Host, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { NgControl, ValidationErrors } from '@angular/forms';
import { Observable, Subject } from 'rxjs/index';
import { takeUntil } from 'rxjs/internal/operators';
import { HandlerErrorService } from '../shared/services/handler-error.service';

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss']
})
export class InputErrorComponent implements OnInit, OnDestroy {
  public onDestroy$ = new Subject();
  public messages: string[];
  // new strategy
  errorMessage: string;
  errorsType: string; // | string[]
  // show all message or one
  @Input() showAllMessage = false;
  constructor(@Host() private parent: InputComponent, public handlerErrorsService: HandlerErrorService) { }

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  init() {
    this.changeControl();
  }

  isState(): Observable<any> {
    if ( this.parent && this.parent.controlValidation) {
      return this.parent.controlValidation.stateChanges;
    }
      return null;
  }

  getControl(): NgControl | null {
    return this.parent.controlValidation.ngControl;
  }

  changeControl(): void {
    const state: Observable<any> | null = this.isState();

    if (state) {
       this.handlerChang(state);
    }
  }

  handlerChang(state: Observable<any>): void {
    state
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(value => {
        this.handlerError();
      });
  }

  hasErrors(control: NgControl): ValidationErrors | null {
    return control ? control.errors : null;
  }

  handlerError(): void {
    const control = this.getControl();

    const errors = this.hasErrors(control);

    if (errors) {
       const messageName = this.handlerErrorsService.getError(control);
       // old strategy i want rewrite it
       // this.messages = this.selectMessage(message);

      // this var used for ngSwitch show different error
       this.errorsType = this.selectMessage(messageName);

       // this var use for get error message for the current control
       this.errorMessage = this.handlerErrorsService.getMessage(this.errorsType, control.errors[this.errorsType]);

      return;
    }
    // this.messages = null;
    this.errorsType = null;
  }

  selectMessage(messages: any[]) {
    if (this.showAllMessage) {
      return messages;
    }

    return messages[0];
  }

  getStateFocused() {
    return (this.parent && this.parent.controlValidation &&  !this.parent.controlValidation.ngControl.touched);
  }

}
