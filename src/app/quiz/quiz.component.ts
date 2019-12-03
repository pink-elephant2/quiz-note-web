import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AuthService } from '../shared/service/auth';
import { Quiz, QuizService } from '../shared/service/quiz';
import { QuizForm } from './quiz-form';
import { LoadingService } from '../shared/service/loading';

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
    private quizService: QuizService,
    private loadingService: LoadingService
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

      var elems = document.querySelectorAll('.collapsible');
      var instances = window['M'].Collapsible.init(elems, options);
    });
  }

  /**
   * 登録ボタン
   * @param form 入力フォーム
   * @param isValid 有効か
   */
  onSubmit(form: QuizForm, isValid: boolean) {
    if (!isValid) {
      return;
    }
    this.isInValid = false;
    this.isError = false;

    this.loadingService.setLoading(true);

    // クイズを登録する
    this.quizService.postQuiz(this.authService.loginId, form).subscribe((quiz: Quiz) => {
      this.loadingService.setLoading(false);

      if (quiz) {
        this.quizList.unshift(quiz);
      }
    }, (error: HttpErrorResponse) => {
      this.loadingService.setLoading(false);
      console.error(error);

      switch (error.status) {
        case 403:
          this.isInValid = true;
          break;
        case 500:
        default:
          this.isError = true;
          break;
      }
    });
  }
}
