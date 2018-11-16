import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { InputErrorComponent } from './input-error/input-error.component';
import { ValidationDirective } from './shared/directives/validation.directive';
import { ERROR_CONFIG, HandlerErrorService } from './shared/services/handler-error.service';
import { MinLengthErrorComponent } from './min-length-error/min-length-error.component';
import { MaxLengthErrorComponent } from './max-length-error/max-length-error.component';
import { RequiredErrorComponent } from './required-error/required-error.component';
import { StrEmptyComponent } from './str-empty/str-empty.component';
import { UrlPatternErrorComponent } from './url-pattern-error/url-pattern-error.component';
import { NegativeErrorComponent } from './negative-error/negative-error.component';
import { PasswordMatchErrorComponent } from './password-match-error/password-match-error.component';
import { PatternEmailErrorComponent } from './pattern-email-error/pattern-email-error.component';
import { DefaultPatternComponent } from './default-pattern/default-pattern.component';
import { ErrorsMessagesService } from './shared/services/errorsMessages';
import { ErrorMessageModel } from './shared/errorMessage.model';

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
export class InputModule {
  constructor (@Optional() @SkipSelf() parentModule: InputModule) {
    // if (parentModule) {
    //   throw new Error(
    //     'InputModule is already loaded. Import it in the AppModule only');
    // }
  }

  static forRoot(config?: ErrorMessageModel): ModuleWithProviders {
    return {
      ngModule: InputModule,
      providers: [
        {provide: ERROR_CONFIG, useValue: config }
      ]
    };
  }
}
