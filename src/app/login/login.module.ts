import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { environment } from 'src/environments/environment';
import { AuthService, AuthMockService } from '../shared/service/auth';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    environment.production ? AuthService : { provide: AuthService, useClass: AuthMockService }
  ]
})
export class LoginModule { }
