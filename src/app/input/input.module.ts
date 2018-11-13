import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { InputErrorComponent } from './input-error/input-error.component';
import { ValidationDirective } from './shared/directives/validation.directive';
import { HandlerErrorService } from './shared/services/handler-error.service';
import { MinLengthErrorComponent } from './min-length-error/min-length-error.component';
import { MaxLengthErrorComponent } from './max-length-error/max-length-error.component';
import { RequiredErrorComponent } from './required-error/required-error.component';
import { StrEmptyComponent } from './str-empty/str-empty.component';
import { UrlPatternErrorComponent } from './url-pattern-error/url-pattern-error.component';
import { NegativeErrorComponent } from './negative-error/negative-error.component';
import { PasswordMatchErrorComponent } from './password-match-error/password-match-error.component';
import { PatternEmailErrorComponent } from './pattern-email-error/pattern-email-error.component';
import { DefaultPatternComponent } from './default-pattern/default-pattern.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    InputComponent,
    InputErrorComponent,
    ValidationDirective,
    MinLengthErrorComponent,
    MaxLengthErrorComponent,
    RequiredErrorComponent,
    StrEmptyComponent,
    UrlPatternErrorComponent,
    NegativeErrorComponent,
    PasswordMatchErrorComponent,
    PatternEmailErrorComponent,
    DefaultPatternComponent,
  ],
  exports: [
    InputComponent,
    InputErrorComponent,
    ValidationDirective,
  ],
  providers: [
    HandlerErrorService
  ]
})
export class InputModule { }
