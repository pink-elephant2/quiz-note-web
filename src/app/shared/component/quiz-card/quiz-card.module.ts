import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { QuizCardComponent } from './quiz-card.component';
import { AccountImageModule } from '../../directive/account-image';

@NgModule({
  declarations: [QuizCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    AccountImageModule
  ],
  exports: [
    QuizCardComponent
  ]
})
export class QuizCardModule { }
