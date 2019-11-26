import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Quiz } from './quiz';

/**
 * クイズサービス
 */
@Injectable()
export class QuizService extends ApiService {

  /**
   * クイズを取得する
   */
  public getQuiz(): Observable<Quiz[]> {
    return this.get<Quiz[]>('/api/v1/quiz');
  }
}
