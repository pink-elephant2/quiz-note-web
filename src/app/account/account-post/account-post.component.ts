import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { QuizService, Quiz } from '../../shared/service/quiz';
import { AuthService } from 'shared/service/auth';
import { Page, Pageable } from 'shared/model';

@Component({
  selector: 'app-account-post',
  templateUrl: './account-post.component.html',
  styleUrls: ['./account-post.component.scss']
})
export class AccountPostComponent implements OnChanges {

  @Input() loginId: string;

  /** 投稿数 */
  @Output() postCount: EventEmitter<number> = new EventEmitter<number>();

  quizData: Page<Quiz>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private quizService: QuizService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    // ログインIDを渡されない場合(ブロックなど)
    if (!this.loginId) {
      this.postCount.emit(0);
      return;
    }
    // クイズを取得する TODO 未ログインの場合
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
      page: page || 0
    } as Pageable;

    // クイズ取得
    this.quizService.getQuizList(this.authService.loginId, this.loginId, pageable).subscribe(quizData => {
      this.quizData = quizData;

      // 親に投稿数を渡す
      setTimeout(() => {
        this.postCount.emit(this.quizData.totalElements);
      });

      window.scrollTo(0, 0);
    }, () => {
      this.router.navigate(['logout']);
    });
  }
}
