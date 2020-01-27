import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { SignupComponent } from './signup.component';
import { AccountService, AccountMockService } from '../shared/service/account';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    environment.production ? AccountService : { provide: AccountService, useClass: AccountMockService }
  ]
})
export class SignupModule { }
