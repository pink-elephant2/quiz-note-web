import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { PasswordService } from './password.service';
import { PasswordReminderForm } from 'src/app/password/password-reminder/password-reminder-form';

/**
 * パスワードサービス
 * モック
 */
@Injectable()
export class PasswordMockService extends PasswordService {

  /**
   * リマインダーメールを送信する
   */
  public sendReminder(form: PasswordReminderForm): Observable<boolean> {
    return of(true);
  }

}
