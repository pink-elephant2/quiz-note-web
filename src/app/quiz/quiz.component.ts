import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class QuizComponent implements OnInit, OnDestroy {

  /** クイズ情報 */
  quizData: Page<Quiz>;

  /** 選択中のクイズ情報 */
  currentQuiz: Quiz;

  /** FABインスタンス */
  fabInstance: any;

  /** ツールチップインスタンス */
  tooltipInstance: any;

  /** 登録モーダルインスタンス */
  formModalInstance: any;

  /** 録音モーダルインスタンス */
  audioModalInstance: any;

  /** 削除モーダルインスタンス */
  deleteModalInstance: any;

  /** FABを点滅させるか */
  isPulse = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService,
    private quizService: QuizService
  ) { }

  ngOnInit() {
    // クイズ取得
    this.getQuizList(0, () => {

      // FAB初期化
      this.fabInstance = window['M'].FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {});

      // ツールチップ初期化
      this.tooltipInstance = window['M'].Tooltip.init(document.querySelectorAll('.tooltipped'), {
        position: 'left'
      });

      // 登録モーダル
      this.formModalInstance = window['M'].Modal.init(document.getElementById('form-modal'), {
        startingTop: '20px'
      });
      // 録音モーダル
      this.audioModalInstance = window['M'].Modal.init(document.getElementById('audio-modal'), {
        startingTop: '20px'
      });
      // 削除モーダル
      this.deleteModalInstance = window['M'].Modal.init(document.getElementById('delete-modal'), {
        startingTop: '20px'
      });
    });
  }

  ngOnDestroy(): void {
    // 再生を止める
    speechSynthesis.cancel();
  }

  /**
   * クイズを取得する
   */
  getQuizList(page?: number, callback?: Function) {
    if (page !== undefined && this.quizData && (page < 0 || this.quizData.totalPages <= page)) {
      return;
    }
    const pageable = {
      page: page || 0
    } as Pageable;

    // クイズ取得
    this.quizService.getQuizList(this.authService.loginId, undefined, pageable).subscribe(quizData => {
      this.quizData = quizData;

      // 0件
      this.isPulse = this.quizData.totalElements === 0;

      // 折りたたみリスト初期化
      window['M'].Collapsible.init(document.querySelectorAll('.collapsible'), {});

      window.scrollTo(0, 0);

      setTimeout(() => {
        callback();
      });
    }, () => {
      this.router.navigate(['logout']);
    });
  }

  /**
   * クイズ登録フォームを表示する
   */
  openForm(quiz?: Quiz): void {
    this.formModalInstance.open();
    this.currentQuiz = quiz ? { ...quiz } : undefined; // コピー

    // 点滅解除
    this.isPulse = false;

    if (!quiz) {
      window.scrollTo(0, 0);
      this.tooltipInstance.forEach(tooltip => tooltip.close());
      this.fabInstance[0].close();
    }
  }

  /**
   * クイズ新規追加イベント
   * @param quiz 新規クイズ情報
   */
  create(quiz: Quiz): void {
    // 更新
    if (this.currentQuiz) {
      // 現在のページを再表示 TODO this.quizData.contentを更新
      this.getQuizList(this.quizData.number);
    } else {
      // 新規
      // 先頭に追加
      this.quizData.content.unshift(quiz);
      if (this.quizData.size < this.quizData.content.length) {
        // 末尾を削除
        this.quizData.content.pop();
      }
    }
    // フォームを閉じる
    this.formModalInstance.close();
  }

  /**
   * 録音モーダルを表示する
   */
  audioConfirm(quiz: Quiz): void {
    this.currentQuiz = { ...quiz }; // コピー
    this.audioModalInstance.open();
  }

  /**
   * クイズ削除確認モーダルを表示する
   */
  deleteConfirm(quiz: Quiz): void {
    this.currentQuiz = { ...quiz }; // コピー
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
        this.getQuizList(this.quizData.number);
      } else {
        window['M'].toast({ html: 'クイズの削除に失敗しました。' });
      }
    }, () => {
      this.loadingService.setLoading(false);
      this.deleteModalInstance.close();
      window['M'].toast({ html: 'クイズの削除に失敗しました。' });
    });
  }

  /**
   * 問読みを登録する
   */
  updateSound(audioData: Blob) {
    // 問読み登録
    this.loadingService.setLoading(true);
    this.quizService.postSound(this.authService.loginId, this.currentQuiz.cd, audioData).subscribe((quiz: Quiz) => {
      this.loadingService.setLoading(false);

      if (quiz) {
        // モーダルを閉じる
        this.audioModalInstance.close();

        window['M'].toast({ html: '問読みを登録しました。' });

        // 現在のページを再表示
        this.getQuizList(this.quizData.number);
      } else {
        window['M'].toast({ html: '問読みの登録に失敗しました。' });
      }
    }, () => {
      this.loadingService.setLoading(false);
      this.deleteModalInstance.close();
      window['M'].toast({ html: '問読みの登録に失敗しました。' });
    });
  }

  /**
   * 問読みを再生する
   */
  sound(quiz: Quiz): void {
    if (speechSynthesis.speaking) {
      // 再生を止める
      speechSynthesis.cancel();
    }
    const uttr = new SpeechSynthesisUtterance(quiz.question);
    // 再生 (発言キューに発言を追加)
    speechSynthesis.speak(uttr);

    setTimeout(() => {
      uttr.text = '正解は、' + quiz.answer;
      speechSynthesis.speak(uttr);
    }, 5000);
  }

  /**
   * 問読みを再生する (ALL)
   */
  soundAll(): void {
    this.tooltipInstance.forEach(tooltip => tooltip.close());
    this.fabInstance[0].close();

    this.quizData.content.forEach((quiz: Quiz) => {
      // 再生 (発言キューに発言を追加)
      const uttr = new SpeechSynthesisUtterance('問題：');
      speechSynthesis.speak(uttr);
      const uttr2 = new SpeechSynthesisUtterance(quiz.question);
      speechSynthesis.speak(uttr2);
      const uttr3 = new SpeechSynthesisUtterance('正解は、' + quiz.answer);
      speechSynthesis.speak(uttr3);
    });
  }

  /**
   * 付箋紙クリック
   */
  onFusenClick(quiz: Quiz, $event: Event): void {
    // 付箋紙をはがして正解を表示する
    $event.target['classList'] = 'fusen2 animated hinge';
    $event.target.addEventListener('animationend', () => {
      quiz.isAnswerOpen = true;
    });
  }
}
