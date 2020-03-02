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
   * クイズを取得する
   */
  public getQuiz(loginId: string, quizCd: string): Observable<Quiz> {
    const url = `/api/v1/user/${loginId}/quiz/${quizCd}`;
    return this.get<boolean>(url);
  }

  /**
   * クイズ一覧を取得する
   *
   * @param loginId 自分のログインID
   * @param targetLoginId 取得したい人のログインID
   */
  public getQuizList(loginId: string, targetLoginId: string, pageable?: Pageable): Observable<Page<Quiz>> {
    const params = { ...pageable };
    if (targetLoginId) {
      params['loginId'] = targetLoginId;
    }
    return this.get<Quiz[]>(`/api/v1/user/${loginId}/quiz`, params);
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

  /**
   * 問読みを登録/更新する
   */
  public postSound(loginId: string, quizCd: string, blob: Blob): Observable<Quiz> {
    const url = `/api/v1/user/${loginId}/quiz/${quizCd}/sound`;
    const data = new FormData();
    data.append('upfile', blob);
    return this.post<Quiz>(url, data);
  }

  /**
   * グループのクイズ一覧を取得する
   *
   * @param loginId 自分のログインID
   * @param groupCd グループCD
   */
  public getGroupQuizList(loginId: string, groupCd: string, pageable?: Pageable): Observable<Page<Quiz>> {
    const params = { ...pageable };
    params['groupCd'] = groupCd;
    return this.get<Quiz[]>(`/api/v1/user/${loginId}/quiz`, params);
  }

}
