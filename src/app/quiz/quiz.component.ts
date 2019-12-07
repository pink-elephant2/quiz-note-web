import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/service/auth';
import { Quiz, QuizService } from '../shared/service/quiz';
import { Page, Pageable } from '../shared/model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  /** クイズ情報 */
  quizData: Page<Quiz>;

  /** ページネーション */
  pagination: number[] = [];

  /** 新規登録モード */
  isCreate: boolean;

  /** FABインスタンス */
  fabInstance: any;

  /** ツールチップインスタンス */
  tooltipInstance: any;

  constructor(
    private authService: AuthService,
    private quizService: QuizService
  ) { }

  ngOnInit() {
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
  getQuizList(page?: number) {
    if (page !== undefined && this.quizData && (page < 0 || this.quizData.totalPages <= page)) {
      return;
    }
    const pageable = {
      'page': page || 0
    } as Pageable;

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
   * クイズ登録フォームを表示する
   */
  openCreateForm(): void {
    this.isCreate = true;
    window.scrollTo(0, 0);
    this.tooltipInstance[1].close();
    this.fabInstance[0].close();
  }

  /**
   * クイズ新規追加イベント
   * @param quiz
   */
  create(quiz: Quiz): void {
    // 先頭に追加
    this.quizData.content.unshift(quiz);
    if (this.quizData.size < this.quizData.content.length) {
      // 末尾を削除
      this.quizData.content.pop();
    }
    // フォームを閉じる
    this.isCreate = false;
  }
}
