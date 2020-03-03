import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { QuizForm } from './quiz-form';
import { Quiz, QuizService } from 'src/app/shared/service/quiz';
import { AuthService } from 'src/app/shared/service/auth';
import { LoadingService } from 'src/app/shared/service/loading';

/**
 * クイズフォーム
 */
@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent implements OnInit, OnChanges {

  /** 入力フォーム */
  form: FormGroup;

  /** クイズ情報 */
  @Input() quiz: Quiz;

  @Output() onSubmit: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  /** Chipsインスタンス */
  chipsInstance: any;

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
  }

  ngOnChanges(changes: SimpleChanges): void {
    // タグ初期化
    this.chipsInstance = window['M'].Chips.init(document.getElementById('chips'), {
      placeholder: 'タグを入力',
      limit: 10
    });

    if (this.quiz) {
      this.form.patchValue(this.quiz);

      (this.quiz.tags || []).forEach(tagName => {
        this.chipsInstance.addChip({
          tag: tagName
        });
      });
    } else {
      this.form.reset();
    }
    // テキストボックス事前入力
    window['M'].updateTextFields();
    // 文字数カウント
    window['$']('#quizForm').find('input, textarea').not('.custom-class').characterCounter();
  }

  /**
   * 登録ボタン
   * @param form 入力フォーム
   * @param isValid 有効か
   */
  submit(form: QuizForm, isValid: boolean) {
    if (!isValid) {
      return;
    }
    this.isInValid = false;
    this.isError = false;

    this.loadingService.setLoading(true);

    // タグ設定
    form.tags = this.chipsInstance.chipsData.map((tag) => tag.tag);

    // クイズを登録する
    const sub = (this.quiz && this.quiz.cd)
      ? this.quizService.putQuiz(this.authService.loginId, this.quiz.cd, form)
      : this.quizService.postQuiz(this.authService.loginId, form);
    sub.subscribe((quiz: Quiz) => {
      this.loadingService.setLoading(false);

      if (quiz) {
        this.onSubmit.emit(quiz);
        this.form.reset();
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
