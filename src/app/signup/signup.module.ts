import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { SignupComponent } from './signup.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { AccountService, AccountMockService } from '../shared/service/account';
import { AppRoutingModule } from '../app-routing.module';
import { ThemeColorModule } from 'shared/directive/theme-color';

@NgModule({
  declarations: [
    SignupComponent,
    SignupFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ThemeColorModule
  ],
  exports: [
    // LPで使う用
    SignupFormComponent
  ],
  providers: [
    environment.production ? AccountService : { provide: AccountService, useClass: AccountMockService }
  ]
})
export class SignupModule { }
