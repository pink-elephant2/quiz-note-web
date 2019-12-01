import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QuizService } from './quiz.service';
import { Quiz } from './quiz';
import { Page, Pageable } from '../../model';

/**
 * クイズサービス
 * モック
 */
@Injectable()
export class QuizMockService extends QuizService {

  private static quizList: Quiz[] = [
    { question: '日本一高い山は富士山ですが、世界一高い山は何？', answer: 'エベレスト' },
    { question: '日本で一番高い山は富士山ですが、二番目に高い山は何？', answer: '北岳' }
  ];

  /**
   * クイズ一覧を取得する
   */
  public getQuizList(loginId?: string, pageable?: Pageable): Observable<Page<Quiz>> {
    let quizList = QuizMockService.quizList;
    if (loginId) {
      // TODO
      // quizList = quizList.filter(quiz => quiz.account.loginId === loginId);
    }
    if (pageable) {
      const start = (pageable.page || 0) * (pageable.size || 20);
      const end = start + (pageable.size || 20);
      quizList = quizList.slice(start, end);
    }
    return of({
      content: quizList
    } as Page<Quiz>);
  }
}
