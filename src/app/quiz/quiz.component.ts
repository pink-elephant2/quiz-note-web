import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AuthService } from '../shared/service/auth';
import { Quiz, QuizService } from '../shared/service/quiz';
import { QuizForm } from './quiz-form';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  /** 入力フォーム */
  form: FormGroup;

  /** クイズ情報 */
  quizList: Quiz[] = [];

  /** バリデーション失敗 */
  isInValid: boolean;
  /** APIエラー */
  isError: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private quizService: QuizService
  ) {
    this.form = this.formBuilder.group(QuizForm.validators);
  }

  ngOnInit() {
    // タグ初期化
    const options = {
      placeholder: 'タグを入力'
    };
    const elems = document.querySelectorAll('.chips');
    const instances = window['M'].Chips.init(elems, options);

    // クイズ取得
    this.quizService.getQuizList(this.authService.loginId).subscribe(quizList => {
      this.quizList = quizList.content;
    })
  }

}
