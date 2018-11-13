import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule
} from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { SignUpComponent } from './sign-up/sign-up.component';
import { EffectsModule } from '@ngrx/effects';
import { EffectService } from './state/effect.service';
import { authReducer } from './state/auth.reducer';
import { DoneComponent } from './done/done.component';
import { CanActivateService } from './shared/can-activate.service';
import { SendRestoreLinkComponent } from './send-restore-link/send-restore-link.component';
import { VerifyComponent } from './verify/verify.component';
import { VerifyRestorePasswordComponent } from './verify-restore-password/verify-restore-password.component';
import { InputModule } from '../input/input.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: '/sign-up',
        pathMatch: 'full'
      },
      {
        path: 'sign-in',
        component: SignInComponent,
        canActivate: [CanActivateService]
      },// AuthService
      {
        path: 'verify',
        component: VerifyComponent,
       canActivate: [CanActivateService]
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
       canActivate: [CanActivateService]
      },
      {
        path: 'done',
        component: DoneComponent,
        canActivate: [CanActivateService]
      }
    ]),
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([
      EffectService
    ]),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    InputModule,
  ],
  exports: [
    SignInComponent
  ],
  declarations: [
    SignInComponent,
    VerifyEmailComponent,
    SignUpComponent,
    DoneComponent,
    SendRestoreLinkComponent,
    VerifyComponent,
    VerifyRestorePasswordComponent,
  ],
  entryComponents: [
    SendRestoreLinkComponent
  ]
})
export class AuthModule { }
