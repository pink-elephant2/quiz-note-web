import { Validators } from '@angular/forms';

/**
 * グループ
 * 入力フォーム
 */
export class GroupForm {

  /** グループ名 */
  name: string;
  /** 紹介文 */
  description: string;

  static validators = {
    /** グループ名 */
    name: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
    /** 紹介文 */
    description: ['', Validators.compose([Validators.required, Validators.maxLength(120)])]
  };

}
