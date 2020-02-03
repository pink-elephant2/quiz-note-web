import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { PasswordService } from 'shared/service/password';
import { PasswordReminderCbkForm } from './password-reminder-cbk-form';
import { LoadingService } from 'shared/service/loading';
import { GaService } from 'shared/service/ga';

/**
 * パスワードリマインダー
 * メールからのコールバック
 */
@Component({
  selector: 'app-password-reminder-cbk',
  templateUrl: './password-reminder-cbk.component.html',
  styleUrls: ['./password-reminder-cbk.component.scss']
})
export class PasswordReminderCbkComponent implements OnInit {

  /** 入力フォーム */
  form: FormGroup;

  /** バリデーション失敗 */
  isInValid: boolean;
  /** APIエラー */
  isError: boolean;
  /** 送信完了 */
  isCompleted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private passwordService: PasswordService,
    private gaService: GaService
  ) {
    this.form = this.formBuilder.group(PasswordReminderCbkForm.validators);
  }

  ngOnInit() {
  }

}
