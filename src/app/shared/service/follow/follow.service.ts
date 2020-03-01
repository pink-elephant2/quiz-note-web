import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api.service';
import { Account } from '../account/account';
import { Page } from '../../model/page';
import { Pageable } from 'shared/model/pageable';

/**
 * フォローサービス
 */
@Injectable()
export class FollowService extends ApiService {

  /**
   * フォローを取得する
   */
  public getFollow(loginId: string, pageable?: Pageable): Observable<Page<Account>> {
    const url = `/api/v1/account/${loginId}/follow`;
    return this.get<Page<Account>>(url, pageable);
  }

  /**
   * フォローワーを取得する
   */
  public getFollower(loginId: string, pageable?: Pageable): Observable<Page<Account>> {
    const url = `/api/v1/account/${loginId}/follower`;
    return this.get<Page<Account>>(url, pageable);
  }

  /**
   * フォローする
   *
   * @param loginId 自分
   * @param followLoginId フォロー対象
   */
  public follow(loginId: string, followLoginId: string): Observable<boolean> {
    const url = `/api/v1/user/${loginId}/account/follow`;
    const params = {
      loginId: followLoginId
    };
    return this.post<boolean>(url, params);
  }

  /**
   * フォローを解除する
   *
   * @param loginId 自分
   * @param followLoginId フォロー対象
   */
  public unfollow(loginId: string, followLoginId: string): Observable<boolean> {
    const url = `/api/v1/user/${loginId}/account/unfollow`;
    const params = {
      loginId: followLoginId
    };
    return this.post<boolean>(url, params);
  }
}
