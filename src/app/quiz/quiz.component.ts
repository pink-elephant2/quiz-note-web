import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/service/auth';
import { LoadingService } from '../shared/service/loading';
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

  /** 選択中のクイズ情報 */
  currentQuiz: Quiz;

  /** ページネーション */
  pagination: number[] = [];

  /** 新規登録モード */
  isCreate: boolean;

  /** FABインスタンス */
  fabInstance: any;

  /** ツールチップインスタンス */
  tooltipInstance: any;

  /** 削除モーダルインスタンス */
  deleteModalInstance: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService,
    private quizService: QuizService
  ) { }

  ngOnInit() {
    // FAB初期化
    this.fabInstance = window['M'].FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {});

    // ツールチップ初期化
    this.tooltipInstance = window['M'].Tooltip.init(document.querySelectorAll('.tooltipped'), {
      position: 'left'
    });

    // モーダル
    window['M'].Modal.init(document.querySelectorAll('.modal'), {
      startingTop: '20px'
    });
    // 削除モーダル
    this.deleteModalInstance = window['M'].Modal.init(document.getElementById('delete-modal'), {
      startingTop: '20px'
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

      window.scrollTo(0, 0);
    }, () => {
      this.router.navigate(['logout']);
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

  /**
   * クイズ削除確認モーダルを表示する
   */
  deleteConfirm(quiz: Quiz): void {
    this.currentQuiz = quiz;
    this.deleteModalInstance.open();
  }

  /**
   * クイズを削除する
   */
  delete(): void {
    if (!this.currentQuiz) {
      return;
    }
    // クイズ削除
    this.loadingService.setLoading(true);
    this.quizService.deleteQuiz(this.authService.loginId, this.currentQuiz.cd).subscribe((ret: boolean) => {
      this.loadingService.setLoading(false);
      if (ret) {
        // モーダルを閉じる
        this.deleteModalInstance.close();

        window['M'].toast({ html: 'クイズを削除しました。' });

        // 現在のページを再表示
        this.getQuizList(this.quizData.number)
      } else {
        window['M'].toast({ html: 'クイズの削除に失敗しました。' });
      }
    }, () => {
      this.loadingService.setLoading(false);
      this.deleteModalInstance.close();
      window['M'].toast({ html: 'クイズの削除に失敗しました。' });
    });
  }
}
