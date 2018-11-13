import {
  AfterViewInit, Directive, ElementRef, HostBinding, HostListener, OnChanges, OnDestroy, Optional, SimpleChanges
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs/index';
import { takeUntil } from 'rxjs/internal/operators';
import { InputFormFieldControl } from '../input-form-fieldControl';

@Directive({
  selector: '[appValidation]',
  providers: [
    {provide: InputFormFieldControl, useExisting: ValidationDirective}
  ]
})
export class ValidationDirective implements OnDestroy, AfterViewInit, InputFormFieldControl<any> {
  focus = false;
  onDestroy$ = new Subject<boolean>();
  stateChange$ = new Subject<boolean>();

  constructor(public el: ElementRef, @Optional()public control: NgControl) {
  }

  ngAfterViewInit() {
    if (this.control && this.control.valueChanges) {
      this.control.valueChanges
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(() => {

          /**
           * for emit event when change value
           * */
          this.stateChange$.next(true);

        });
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  @HostListener('focus') onFocus() {
    this.focus = true;
    this.stateChange$.next(true);
  }

  @HostListener('blur') onBlur() {
    this.focus = false;
    this.stateChange$.next(true);
  }

  get stateErrors(): boolean {

    if (this.control && this.control.errors) {
      // && this.control.dirty
      return Object.keys(this.control.errors).length > 0  && this.control.touched;
    }

    return false;
  }

}
