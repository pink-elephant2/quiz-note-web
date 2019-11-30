import { Component, OnInit } from '@angular/core';
import { Quiz, QuizService } from '../shared/service/quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  /** クイズ情報 */
  quizList: Quiz[] = [];

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    // タグ初期化
    const options = {
      placeholder: 'タグを入力'
    };
    const elems = document.querySelectorAll('.chips');
    const instances = window['M'].Chips.init(elems, options);

    // クイズ取得
    this.quizService.getQuiz().subscribe(quizList => {
      this.quizList = quizList;
    })
  }

}
