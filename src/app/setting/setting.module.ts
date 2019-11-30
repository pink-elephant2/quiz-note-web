import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { SettingComponent } from './setting.component';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingProfileComponent } from './setting-profile/setting-profile.component';
import { AccountImageModule } from '../shared/directive/account-image';
import { AccountService, AccountMockService } from '../shared/service/account';

@NgModule({
  imports: [
    CommonModule,
    SettingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AccountImageModule
  ],
  declarations: [
    SettingComponent,
    SettingProfileComponent
  ],
  exports: [
    SettingComponent,
    SettingProfileComponent
  ],
  providers: [
    environment.production ? AccountService : { provide: AccountService, useClass: AccountMockService }
  ]
})
export class SettingModule { }
