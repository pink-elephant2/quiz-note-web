import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QuizService } from './quiz.service';
import { Quiz } from './quiz';

/**
 * クイズサービス
 * モック
 */
@Injectable()
export class QuizMockService extends QuizService {

  /**
   * クイズを取得する
   */
  public getQuiz(): Observable<Quiz> {
    return of();
  }
}
