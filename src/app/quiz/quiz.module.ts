import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuizComponent } from './quiz.component';
import { QuizCardComponent } from './quiz-card/quiz-card.component';
import { environment } from '../../environments/environment';
import { QuizService, QuizMockService } from '../shared/service/quiz';


@NgModule({
  declarations: [
    QuizComponent,
    QuizCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    QuizComponent
  ],
  providers: [
    environment.production ? QuizService : { provide: QuizService, useClass: QuizMockService }
  ]
})
export class QuizModule { }
