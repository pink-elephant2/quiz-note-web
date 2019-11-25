import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './quiz.component';
import { QuizCardComponent } from './quiz-card/quiz-card.component';



@NgModule({
  declarations: [
    QuizComponent,
    QuizCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    QuizComponent
  ]
})
export class QuizModule { }
