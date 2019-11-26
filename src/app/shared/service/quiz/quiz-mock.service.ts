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

  private quizList: Quiz[] = [
    { question: '日本一高い山は富士山ですが、世界一高い山は何？', answer: 'エベレスト' },
    { question: '日本で一番高い山は富士山ですが、二番目に高い山は何？', answer: '北岳' }
  ];

  /**
   * クイズを取得する
   */
  public getQuiz(): Observable<Quiz[]> {
    return of(this.quizList);
  }
}
