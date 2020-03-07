import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { environment } from 'src/environments/environment';
import { AuthService, AuthMockService } from '../shared/service/auth';
import { ThemeColorModule } from 'shared/directive/theme-color';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ThemeColorModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    environment.production ? AuthService : { provide: AuthService, useClass: AuthMockService }
  ]
})
export class LoginModule { }
