import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api.service';
import { Pageable, Page } from 'shared/model';
import { Group } from './group';

/**
 * グループサービス
 */
@Injectable()
export class GroupService extends ApiService {

  /**
   * グループ一覧を取得する
   */
  public getGroupList(loginId: string, pageable?: Pageable): Observable<Page<Group>> {
    return this.get<Group[]>(`/api/v1/user/${loginId}/group`, pageable);
  }

  /**
   * グループを登録する
   */
  // public postGroup(loginId: string, form: GroupForm): Observable<Group> {
  //   const url = `/api/v1/user/${loginId}/group`;
  //   return this.post<Group>(url, form);
  // }

  /**
   * グループを更新する
   */
  // public putGroup(loginId: string, groupCd: string, form: GroupForm): Observable<Group> {
  //   const url = `/api/v1/user/${loginId}/group`;
  //   const params = { ...form };
  //   params['cd'] = groupCd;
  //   return super.put<Group>(url, params);
  // }

  /**
   * グループを削除する
   */
  public deleteGroup(loginId: string, groupCd: string): Observable<boolean> {
    const url = `/api/v1/user/${loginId}/group/${groupCd}`;
    return this.delete<boolean>(url);
  }

}
