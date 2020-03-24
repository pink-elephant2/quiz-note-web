import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from 'src/environments/environment';
import { HeaderComponent } from './header.component';
import { AppRoutingModule } from '../../../app-routing.module';
import { AuthService, AuthMockService } from '../../service/auth';
import { AccountService, AccountMockService } from '../../service/account';
import { AccountImageModule } from 'shared/directive/account-image';
import { ThemeColorModule } from 'shared/directive/theme-color';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    AccountImageModule,
    ThemeColorModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  providers: [
    environment.production ? AuthService : { provide: AuthService, useClass: AuthMockService },
    environment.production ? AccountService : { provide: AccountService, useClass: AccountMockService }
  ]
})
export class HeaderModule { }
