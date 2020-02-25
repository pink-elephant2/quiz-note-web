import { Validators } from '@angular/forms';

/**
 * グループメンバー招待
 * 入力フォーム
 */
export class GroupInviteForm {

  /** ログインID */
  memberLoginId: string;

  static validators = {
    /** ログインID */
    memberLoginId: ['', Validators.compose([Validators.required, Validators.maxLength(30)])]
  };

}
