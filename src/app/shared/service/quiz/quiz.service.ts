import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Quiz } from './quiz';
import { Page, Pageable } from '../../model';
import { QuizForm } from 'src/app/quiz/quiz-form/quiz-form';

/**
 * クイズサービス
 */
@Injectable()
export class QuizService extends ApiService {

  /**
   * クイズ一覧を取得する
   */
  public getQuizList(loginId: string, pageable?: Pageable): Observable<Page<Quiz>> {
    return this.get<Quiz[]>(`/api/v1/user/${loginId}/quiz`, pageable);
  }

  /**
   * クイズを登録する
   */
  public postQuiz(loginId: string, form: QuizForm): Observable<Quiz> {
    const url = `/api/v1/user/${loginId}/quiz`;
    return this.post<Quiz>(url, form);
  }

  /**
   * クイズを更新する
   */
  public putQuiz(loginId: string, quizCd: string, form: QuizForm): Observable<Quiz> {
    const url = `/api/v1/user/${loginId}/quiz`;
    const params = { ...form };
    params['cd'] = quizCd;
    return super.put<Quiz>(url, params);
  }

  /**
   * クイズを削除する
   */
  public deleteQuiz(loginId: string, quizCd: string): Observable<boolean> {
    const url = `/api/v1/user/${loginId}/quiz/${quizCd}`;
    return this.delete<boolean>(url);
  }
}
