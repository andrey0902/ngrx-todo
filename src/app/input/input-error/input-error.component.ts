import { Component, Host, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { NgControl, ValidationErrors } from '@angular/forms';
import { Observable, Subject } from 'rxjs/index';
import { filter, takeUntil } from 'rxjs/internal/operators';
import { HandlerErrorService } from '../shared/services/handler-error.service';
import { ErrorMessageModel } from '../shared/errorMessage.model';

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss']
})
export class InputErrorComponent implements OnInit, OnDestroy {
  id: string = '_' + Math.random().toString(36).substr(2, 9);
  public onDestroy$ = new Subject();

  errorMessage: string| string[];

  @Input() showAllMessage = false;
  /**
   * used for update new local message for current component
   * */
  @Input() configMessage: ErrorMessageModel;

  constructor(@Host() private parent: InputComponent, public handlerErrors: HandlerErrorService) { }

  ngOnInit(): void {
    this.init();
  }

  createRefUniqueMessage() {
    this.handlerErrors.setRefMessage(this.id, this.configMessage);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  init() {
    this.changeControl();
    if (this.configMessage) {
      this.createRefUniqueMessage();
    }
  }

  isState(): Observable<any> {
    if ( this.parent && (this.parent.control || this.parent.controlSelect)) {
      return (this.parent.control || this.parent.controlSelect).stateChanges;
    }
      return null;
  }
/**
 * errorStateMatcher used for defined first state of control
 * show error or not
 * */
  errorStateMatcher(): boolean {
    const control = this.getControl();
    // && control.dirty
    return control.touched ;
  }

  getControl(): NgControl | null {
    return (this.parent.control || this.parent.controlSelect).ngControl;
  }

  changeControl(): void {
    const state: Observable<any> | null = this.isState();

    if (state) {
       this.handlerChang(state);
    }
  }

  handlerChang(state: Observable<any>) {
    state
      .pipe(
        filter(() => this.errorStateMatcher()),
        takeUntil(this.onDestroy$)
      )
      .subscribe(value => {
        this.errorMessage = this.handlerError();
      });
  }

  hasErrors(control: NgControl): ValidationErrors | null {
    return control ? control.errors : null;
  }

  handlerError(): string | string[] {
    const control = this.getControl();

    const errors = this.hasErrors(control);

    if (errors) {
       const listErrorsName: string[] = this.handlerErrors.getError(control);

       return this.getErrorMessage(control, listErrorsName);
    }
    return null;
  }
  /**
   * return value errors
   * */
  getErrorMessage(control, listError: string[]): string | string[] {
    if (this.showAllMessage) {
      return this.getAllMessage(control, listError);
    }
    return this.getSingMessage(control, listError);
  }

  getSingMessage(control, listError): string {
    const errorName: string = this.selectMessage(listError);

    return this.handlerErrors.newGetMessage(
      errorName,
      control.errors[errorName],
      this.id
    );
  }

  getAllMessage(control, listError): string[] {
    return this.handlerErrors.getAllErrors(control, listError, this.id);
  }

  selectMessage(messages: any[]): string {
    return messages[0];
  }
}
