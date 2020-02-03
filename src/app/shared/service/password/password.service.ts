import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api.service';
import { PasswordReminderForm } from 'src/app/password/password-reminder/password-reminder-form';

/**
 * パスワードサービス
 */
@Injectable()
export class PasswordService extends ApiService {

  /**
   * リマインダーメールを送信する
   */
  public sendReminder(form: PasswordReminderForm): Observable<boolean> {
    return this.post<boolean>('/api/v1/password/reminder', form);
  }

  /**
   * パスワードを再設定する
   */
  public resetPassword(form: PasswordReminderForm): Observable<boolean> {
    return this.post<boolean>('/api/v1/password/reset', form);
  }
}
