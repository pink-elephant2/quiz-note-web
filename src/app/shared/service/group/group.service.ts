import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api.service';
import { Pageable, Page } from 'shared/model';
import { Group } from './group';
import { GroupForm } from 'src/app/group/group-form/group-form';
import { GroupMember } from './group-member';
import { GroupInviteForm } from 'src/app/group/group-menu/group-invite-form';
import { GroupImageForm } from 'src/app/group/group-form/group-image-form';

/**
 * グループサービス
 */
@Injectable()
export class GroupService extends ApiService {

  /**
   * グループを取得する
   */
  public getGroup(loginId: string, groupCd: string): Observable<Group> {
    return this.get<Group>(`/api/v1/user/${loginId}/group/${groupCd}`);
  }

  /**
   * グループ一覧を取得する
   */
  public getGroupList(loginId: string, pageable?: Pageable): Observable<Page<Group>> {
    return this.get<Group[]>(`/api/v1/user/${loginId}/group`, pageable);
  }

  /**
   * 未所属のおすすめグループ一覧を取得する
   */
  public getGroupRecommendList(loginId: string, pageable?: Pageable): Observable<Page<Group>> {
    // TODO 実装
    return this.get<Group[]>(`/api/v1/user/${loginId}/group/recommend`, pageable);
  }

  /**
   * グループを登録する
   */
  public postGroup(loginId: string, form: GroupForm): Observable<Group> {
    const url = `/api/v1/user/${loginId}/group`;
    return this.post<Group>(url, form);
  }

  /**
   * グループを更新する
   */
  public putGroup(loginId: string, groupCd: string, form: GroupForm): Observable<Group> {
    const url = `/api/v1/user/${loginId}/group`;
    const params = { ...form };
    params['cd'] = groupCd;
    return super.put<Group>(url, params);
  }

  /**
   * 画像を更新する
   */
  public putImage(loginId: string, groupCd: string, form: GroupImageForm, file: File): Observable<boolean> {
    const url = `/api/v1/user/${loginId}/group/${groupCd}/image`;
    const data = new FormData();
    data.append('upfile', file, form.upfile);
    return this.post<boolean>(url, data);
  }

  /**
   * グループを削除する
   */
  public deleteGroup(loginId: string, groupCd: string): Observable<boolean> {
    const url = `/api/v1/user/${loginId}/group/${groupCd}`;
    return this.delete<boolean>(url);
  }

  /**
   * グループメンバーを取得する
   */
  public getGroupMember(loginId: string, groupCd: string, pageable?: Pageable): Observable<Page<GroupMember>> {
    return this.get<GroupMember[]>(`/api/v1/user/${loginId}/group/${groupCd}/member`, pageable);
  }

  /**
   * グループメンバーを登録する
   */
  public postGroupMember(loginId: string, groupCd: string, form: GroupInviteForm): Observable<boolean> {
    const url = `/api/v1/user/${loginId}/group/${groupCd}/member`;
    const params = { ...form };
    params['cd'] = groupCd;
    return this.post<boolean>(url, params);
  }

  /**
   * グループメンバーを削除する
   */
  public removeGroupMember(loginId: string, groupCd: string, memberLoginId: string): Observable<boolean> {
    const url = `/api/v1/user/${loginId}/group/${groupCd}/member?memberLoginId=${memberLoginId}`;
    return this.delete<boolean>(url);
  }

  /**
   * 管理者を変更する
   */
  public putGroupManager(loginId: string, groupCd: string, managerLoginId: string): Observable<boolean> {
    const url = `/api/v1/user/${loginId}/group/${groupCd}/manager/${managerLoginId}`;
    return this.put<boolean>(url);
  }
}
