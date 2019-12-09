/**
 * クイズ情報
 */
export class Quiz {

  /** ID */
  id: number;

  /** CD */
  cd: string;

  /** 問題 */
  question: string;

  /** 答え */
  answer: string;

  /** ヒント */
  hint?: string;

  /** 解説 */
  explanation?: string;
}
