import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Quiz } from 'src/app/shared/service/quiz';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent implements OnInit, AfterViewInit {

  /** クイズ情報 */
  @Input() quiz: Quiz;

  /** モーダル */
  private modalInstance: any;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (this.quiz) {
      // モーダル
      this.modalInstance = window['M'].Modal.init(document.getElementById('modal' + this.quiz.id), {
        startingTop: '20px'
      });
    }
  }

}
