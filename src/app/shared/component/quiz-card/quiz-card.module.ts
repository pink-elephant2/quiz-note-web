import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { QuizCardComponent } from './quiz-card.component';
import { AccountImageModule } from '../../directive/account-image';
import { ThemeColorModule } from 'shared/directive/theme-color';

@NgModule({
  declarations: [QuizCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    AccountImageModule,
    ThemeColorModule
  ],
  exports: [
    QuizCardComponent
  ]
})
export class QuizCardModule { }
