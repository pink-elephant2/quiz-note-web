import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';

import { AuthService } from 'shared/service/auth';
import { LoadingService } from 'shared/service/loading';
import { QuizService, Quiz } from 'shared/service/quiz';

/**
 * クイズ詳細
 */
@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.scss']
})
export class QuizDetailComponent implements OnInit {

  /** クイズ情報 */
  quiz: Quiz;

  /** 存在しない */
  isNotFound = false;

  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private loadingService: LoadingService,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params: { cd: string }) => {
      // クイズを取得する
      this.getQuiz(params.cd);
    });
  }

  /**
   * クイズを取得する
   */
  getQuiz(quizCd: string): void {
    // クイズを取得する
    this.loadingService.setLoading(true);
    this.quizService.getQuiz(this.authService.loginId, quizCd).pipe(catchError((error: Response) => {
      this.loadingService.setLoading(false);

      // 存在しない場合
      if (error.status === 404) {
        this.isNotFound = true;
      }
      throw error;
    })).subscribe(quiz => {
      this.loadingService.setLoading(false);
      this.quiz = quiz;

      if (!this.quiz) {
        this.isNotFound = true;
      }
    }, () => {
      this.loadingService.setLoading(false);
      this.isNotFound = true;
    });
  }
}
