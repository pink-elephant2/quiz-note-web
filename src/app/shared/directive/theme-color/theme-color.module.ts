import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeColorDirective } from './theme-color.directive';



@NgModule({
  declarations: [ThemeColorDirective],
  imports: [
    CommonModule
  ],
  exports: [
    ThemeColorDirective
  ]
})
export class ThemeColorModule { }
