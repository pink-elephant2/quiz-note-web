import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Quiz } from './quiz';
import { Page, Pageable } from '../../model';

/**
 * クイズサービス
 */
@Injectable()
export class QuizService extends ApiService {

  /**
   * クイズ一覧を取得する
   */
  public getQuizList(loginId?: string, pageable?: Pageable): Observable<Page<Quiz>> {
    const params = loginId ? {
      'loginId': loginId
    } : {};
    return this.get<Quiz[]>('/api/v1/quiz', Object.assign(params, pageable));
  }
}
