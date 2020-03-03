import { Account } from '../account';

/**
 * グループ情報
 */
export class Group {

  // ----------------------------------
  // API返却値
  // ----------------------------------

  /** ID */
  id: number;

  /** CD */
  cd: string;

  /** グループ名 */
  name: string;

  /** 管理者アカウント */
  account: Account;

  /** 公式フラグ */
  official: boolean;

  /** 自己紹介 */
  description: string;

  /** 画像URL */
  imgUrl: string;

  /** ログイン状態の場合、ブロックされているかどうか */
  isBlocked: boolean;

  /** ログイン状態の場合、メンバーかどうか */
  isMember: boolean;
}
