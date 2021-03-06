import { Validators } from '@angular/forms';

/**
 * クイズ
 * 入力フォーム
 */
export class QuizForm {

  /** 問題 */
  question: string;
  /** 正解 */
  answer: string;
  /** ヒント */
  hint: string;
  /** 解説 */
  explanation: string;
  /** タグ */
  tags: string[];

  static validators = {
    /** 問題 */
    question: ['', Validators.compose([Validators.required, Validators.maxLength(200)])],
    /** 正解 */
    answer: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
    /** ヒント */
    hint: ['', Validators.compose([Validators.maxLength(50)])],
    /** 解説 */
    explanation: ['', Validators.compose([Validators.maxLength(100)])]
    /** タグ */
    // tags: ['', Validators.compose([])]
  };

}
