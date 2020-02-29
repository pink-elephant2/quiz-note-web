import { Component, Input } from '@angular/core';
import { Quiz } from '../../service/quiz';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent {

  /** クイズ情報 */
  @Input() quiz: Quiz;

  constructor() { }
}
