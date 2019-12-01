import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LogoutComponent } from './logout.component';
import { AuthService, AuthMockService } from '../shared/service/auth';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  declarations: [LogoutComponent],
  exports: [LogoutComponent],
  providers: [
    environment.production ? AuthService : { provide: AuthService, useClass: AuthMockService }
  ]
})
export class LogoutModule { }
