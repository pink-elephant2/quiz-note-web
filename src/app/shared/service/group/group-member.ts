import { Account } from '../account';

/**
 * グループメンバー情報
 */
export class GroupMember {

  // ----------------------------------
  // API返却値
  // ----------------------------------

  /** ID */
  id: number;

  /** アカウント */
  account: Account;

  /** 管理者アカウントかどうか */
  isManager: boolean;
}
