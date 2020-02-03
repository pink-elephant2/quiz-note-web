import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from 'env/environment';
import { PasswordRoutingModule } from './password-routing.module';
import { PasswordComponent } from './password.component';
import { PasswordReminderComponent } from './password-reminder/password-reminder.component';
import { PasswordService, PasswordMockService } from 'shared/service/password';
import { PasswordReminderCbkComponent } from './password-reminder-cbk/password-reminder-cbk.component';


@NgModule({
  declarations: [
    PasswordComponent,
    PasswordReminderComponent,
    PasswordReminderCbkComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordRoutingModule
  ],
  exports: [
    PasswordComponent
  ],
  providers: [
    environment.production ? PasswordService : { provide: PasswordService, useClass: PasswordMockService },
  ]
})
export class PasswordModule { }
