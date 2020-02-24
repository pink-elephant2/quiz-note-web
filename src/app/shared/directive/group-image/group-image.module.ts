import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupImageDirective } from './group-image.directive';

@NgModule({
  declarations: [
    GroupImageDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GroupImageDirective
  ]
})
export class GroupImageModule { }
