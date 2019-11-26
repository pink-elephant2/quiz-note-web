import { Component, OnInit } from '@angular/core';
import { Quiz, QuizService } from '../shared/service/quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  /** クイズ情報 */
  private quizList: Quiz[] = [];

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    // タグ初期化
    const options = {
      placeholder: 'タグを入力'
    };
    const elems = document.querySelectorAll('.chips');
    const instances = window['M'].Chips.init(elems, options);

    // クイズ取得
    this.quizList = [
      { question: '日本一高い山は富士山ですが、世界一高い山は何？', answer: 'エベレスト' },
      { question: '日本で一番高い山は富士山ですが、二番目に高い山は何？', answer: '北岳' }
    ];
  }

}
