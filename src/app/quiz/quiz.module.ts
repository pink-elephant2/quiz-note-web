import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { QuizComponent } from './quiz.component';
import { QuizCardComponent } from './quiz-card/quiz-card.component';
import { environment } from '../../environments/environment';
import { QuizService, QuizMockService } from '../shared/service/quiz';
import { QuizFormComponent } from './quiz-form/quiz-form.component';
import { QuizAudioComponent } from './quiz-audio/quiz-audio.component';
import { TimerService } from 'shared/service/timer';
import { PaginationModule } from 'shared/component/pagination';
import { QuizDetailComponent } from './quiz-detail/quiz-detail.component';


@NgModule({
  declarations: [
    QuizComponent,
    QuizCardComponent,
    QuizFormComponent,
    QuizAudioComponent,
    QuizDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PaginationModule
  ],
  exports: [
    QuizComponent
  ],
  providers: [
    environment.production ? QuizService : { provide: QuizService, useClass: QuizMockService },
    TimerService
  ]
})
export class QuizModule { }
