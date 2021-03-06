import { Validators } from '@angular/forms';

/**
 * 画像編集
 * 入力フォーム
 */
export class GroupImageForm {
  /** 画像ファイル */
  upfile: string;

  static validators = {
    /** 画像ファイル */
    upfile: ['', Validators.compose([])],
  };

}
