import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QuizService } from './quiz.service';
import { Quiz } from './quiz';
import { Page, Pageable } from '../../model';
import { QuizForm } from 'src/app/quiz/quiz-form/quiz-form';

/**
 * クイズサービス
 * モック
 */
@Injectable()
export class QuizMockService extends QuizService {

  private static quizList: Quiz[] = [
    {
      id: 1,
      question: '日本一高い山は富士山ですが、世界一高い山は何？',
      answer: 'エベレスト'
    },
    {
      id: 2,
      question: '日本で一番高い山は富士山ですが、二番目に高い山は何？',
      answer: '北岳'
    }
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
      content: quizList,
      totalElements: QuizMockService.quizList.length,
      totalPages: Math.ceil(QuizMockService.quizList.length / 20),
      size: 20,
      number: pageable ? pageable.page : 0,
      numberOfElements: quizList.length,
      first: !(pageable && pageable.page !== 0),
      last: !(pageable && pageable.page + 1 !== Math.ceil(QuizMockService.quizList.length / 20))
    } as Page<Quiz>);
  }

  /**
   * クイズを登録する
   */
  public postQuiz(loginId: string, form: QuizForm): Observable<Quiz> {
    return of(Object.assign(new Quiz(), form));
  }
}
