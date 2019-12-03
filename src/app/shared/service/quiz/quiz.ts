/**
 * クイズ情報
 */
export class Quiz {

  /** ID */
  id: number;

  /** 問題 */
  question: string;

  /** 答え */
  answer: string;

  /** ヒント */
  hint?: string;

  /** 解説 */
  explanation?: string;
}
