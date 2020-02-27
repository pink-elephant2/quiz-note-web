import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { QuizService, Quiz } from '../../shared/service/quiz';
import { AuthService } from 'shared/service/auth';

@Component({
  selector: 'app-account-post',
  templateUrl: './account-post.component.html',
  styleUrls: ['./account-post.component.scss']
})
export class AccountPostComponent implements OnChanges {

  @Input() loginId: string;

  /** 投稿数 */
  @Output() postCount: EventEmitter<number> = new EventEmitter<number>();

  quizList: Quiz[];

  constructor(
    private authService: AuthService,
    private quizService: QuizService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    // ログインIDを渡されない場合(ブロックなど)
    if (!this.loginId) {
      this.quizList = [];
      this.postCount.emit(0);
      return;
    }
    // クイズを取得する TODO 未ログインの場合
    this.quizService.getQuizList(this.authService.loginId, this.loginId).subscribe(quizPage => {
      this.quizList = quizPage.content;

      // 親に投稿数を渡す
      setTimeout(() => {
        this.postCount.emit(this.quizList.length);
      });
    });
  }

  /**
   * カードクリックイベント
   * @param i クイズリストインデックス
   */
  onClickCard(i: number): void {
    // 正解を表示する
    this.quizList[i].isAnswerOpen = true;
  }
}
