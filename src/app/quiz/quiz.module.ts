import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './quiz.component';
import { QuizCardComponent } from './quiz-card/quiz-card.component';
import { environment } from '../../environments/environment';



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
  ],
  providers: [
    environment.service.quiz
  ]
})
export class QuizModule { }
