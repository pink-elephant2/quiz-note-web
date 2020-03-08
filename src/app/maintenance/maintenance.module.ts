import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceComponent } from './maintenance.component';
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { TwitterModule } from 'shared/component/twitter';
import { ThemeColorModule } from 'shared/directive/theme-color';

@NgModule({
  declarations: [MaintenanceComponent],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    TwitterModule,
    ThemeColorModule
  ]
})
export class MaintenanceModule { }
