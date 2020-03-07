import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { SettingComponent } from './setting.component';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingProfileComponent } from './setting-profile/setting-profile.component';
import { SettingDisplayComponent } from './setting-display/setting-display.component';
import { AccountImageModule } from '../shared/directive/account-image';
import { AccountService, AccountMockService } from '../shared/service/account';
import { ThemeColorModule } from 'shared/directive/theme-color';

@NgModule({
  imports: [
    CommonModule,
    SettingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AccountImageModule,
    ThemeColorModule
  ],
  declarations: [
    SettingComponent,
    SettingProfileComponent,
    SettingDisplayComponent
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
