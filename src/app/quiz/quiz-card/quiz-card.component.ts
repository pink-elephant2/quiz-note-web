import { Component, OnInit, Input } from '@angular/core';
import { Quiz } from 'src/app/shared/service/quiz';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent implements OnInit {

  /** クイズ情報 */
  @Input() quiz: Quiz;

  constructor() { }

  ngOnInit() {
  }

}
