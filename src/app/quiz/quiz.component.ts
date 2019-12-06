import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AuthService } from '../shared/service/auth';
import { Quiz, QuizService } from '../shared/service/quiz';
import { QuizForm } from './quiz-form';
import { LoadingService } from '../shared/service/loading';
import { Page, Pageable } from '../shared/model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  /** 入力フォーム */
  form: FormGroup;

  /** クイズ情報 */
  quizData: Page<Quiz>;

  /** ページネーション */
  pagination: number[] = [];

  /** バリデーション失敗 */
  isInValid: boolean;
  /** APIエラー */
  isError: boolean;

  /** 新規登録モード TODO あとでコンポーネント化 */
  isCreate: boolean;

  /** FABインスタンス */
  fabInstance: any;

  /** ツールチップインスタンス */
  tooltipInstance: any;

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
    window['M'].Chips.init(document.querySelectorAll('.chips'), {
      placeholder: 'タグを入力'
    });

    // FAB初期化
    this.fabInstance = window['M'].FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {});

    // ツールチップ初期化
    this.tooltipInstance = window['M'].Tooltip.init(document.querySelectorAll('.tooltipped'), {
      position: 'left'
    });

    // クイズ取得
    this.getQuizList();
  }

  /**
   * クイズを取得する
   */
  getQuizList(pageable?: Pageable) {
    if (pageable && this.quizData && (pageable.page < 0 || this.quizData.totalPages <= pageable.page)) {
      return;
    }

    // クイズ取得
    this.quizService.getQuizList(this.authService.loginId, pageable).subscribe(quizData => {
      this.quizData = quizData;

      // ページネーション設定
      const backSpan = Math.floor((this.quizData.totalPages - 1) / 2);
      const forthSpan = (this.quizData.totalPages - 1) - backSpan;
      let startIndex: number;
      let endIndex: number;
      const length = 5;

      if (this.quizData.number - backSpan < 1) {
        // 表示幅に従うと存在しないページ(0ページ以下)が生成されるので、1ページから始める
        startIndex = 1;
        endIndex = length < this.quizData.totalPages ? length : this.quizData.totalPages;
      } else if (this.quizData.number + forthSpan > this.quizData.totalPages) {
        // 表示幅に従うと存在しないページ(最終ページ以降)が生成されるので、表示領域を最終ページから逆算する
        startIndex = this.quizData.totalPages - (length - 1) > 1 ? this.quizData.totalPages - (length - 1) : 1;
        endIndex = this.quizData.totalPages;
      } else {
        // その間なので、中央にcurrentがくるように配置する。
        // ページのリストの端に当たっていないので、単純に中央にくるような両端を考えればよい。
        startIndex = this.quizData.number - backSpan;
        endIndex = this.quizData.number + forthSpan;
      }
      this.pagination = new Array(endIndex - startIndex + 1).fill(0).map((v, i) => i + startIndex);

      // 折りたたみリスト初期化
      window['M'].Collapsible.init(document.querySelectorAll('.collapsible'), {});
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
        // 先頭に追加
        this.quizData.content.unshift(quiz);
        if (this.quizData.size < this.quizData.content.length) {
          // 末尾を削除
          this.quizData.content.pop();
        }

        // フォームを閉じる
        this.isCreate = false;
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

  /**
   * クイズ登録フォームを表示する
   */
  openCreateForm(): void {
    this.isCreate = true;
    window.scrollTo(0, 0);
    this.tooltipInstance[1].close();
    this.fabInstance[0].close();
  }
}
