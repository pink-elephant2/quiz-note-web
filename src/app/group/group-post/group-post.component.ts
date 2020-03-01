import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { AuthService } from 'shared/service/auth';
import { QuizService, Quiz } from 'shared/service/quiz';
import { Pageable, Page } from 'shared/model';

/**
 * グループ問題集
 */
@Component({
  selector: 'app-group-post',
  templateUrl: './group-post.component.html',
  styleUrls: ['./group-post.component.scss']
})
export class GroupPostComponent implements OnChanges {

  /** グループコード */
  @Input() groupCd: string;

  /** 問題数 */
  @Output() postCount: EventEmitter<number> = new EventEmitter<number>();

  /** クイズ情報 */
  quizData: Page<Quiz>;

  constructor(
    private authService: AuthService,
    private quizService: QuizService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    // クイズを取得する
    this.getGroupQuizList();
  }

  /**
   * クイズを取得する
   */
  getGroupQuizList(page?: number) {
    // TODO ページャー
    const pageable = {
      page: page || 0
    } as Pageable;
    this.quizService.getGroupQuizList(this.authService.loginId, this.groupCd, pageable).subscribe(quizData => {
      this.quizData = quizData;

      // 親にメンバー数を渡す
      setTimeout(() => {
        this.postCount.emit(this.quizData.totalElements);
      });

      window.scrollTo(0, 0);
    });
  }
}
