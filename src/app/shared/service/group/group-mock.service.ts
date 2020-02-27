import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { GroupService } from './group.service';
import { Group } from './group';
import { GroupForm } from 'src/app/group/group-form/group-form';
import { GroupMember } from './group-member';
import { GroupInviteForm } from 'src/app/group/group-menu/group-invite-form';
import { Pageable, Page } from 'shared/model';

/**
 * グループサービス
 * モック
 */
@Injectable()
export class GroupMockService extends GroupService {

  // // TODO 仮データ
  // this.groupData.content = [
  //   {
  //     id: 1,
  //     cd: 'aaa',
  //     name: 'グループ1',
  //     description: '説明'
  //   } as Group,
  //   {
  //     id: 2,
  //     cd: 'bbb',
  //     name: 'グループ2',
  //     description: '説明2'
  //   } as Group
  // ];


  /**
   * グループを取得する
   */
  public getGroup(loginId: string, groupCd: string): Observable<Group> {
    // TODO 実装
    return of();
  }

  /**
   * グループ一覧を取得する
   */
  public getGroupList(loginId: string, pageable?: Pageable): Observable<Page<Group>> {
    // TODO 実装
    return of({
      content: [],
      totalElements: 0,
      totalPages: 0,
      size: 20,
      number: pageable ? pageable.page : 0,
      numberOfElements: 0,
      first: !(pageable && pageable.page !== 0),
      last: !(pageable && pageable.page + 1 !== 0)
    } as Page<Group>);
  }

  /**
   * 未所属のおすすめグループ一覧を取得する
   */
  public getGroupRecommendList(loginId: string, pageable?: Pageable): Observable<Page<Group>> {
    // TODO 実装
    return of({
      content: [],
      totalElements: 0,
      totalPages: 0,
      size: 20,
      number: pageable ? pageable.page : 0,
      numberOfElements: 0,
      first: !(pageable && pageable.page !== 0),
      last: !(pageable && pageable.page + 1 !== 0)
    } as Page<Group>);
  }

  /**
   * グループを登録する
   */
  public postGroup(loginId: string, form: GroupForm): Observable<Group> {
    // TODO 実装
    return of();
  }

  /**
   * グループを更新する
   */
  public putGroup(loginId: string, groupCd: string, form: GroupForm): Observable<Group> {
    // TODO 実装
    return of();
  }

  /**
   * グループを削除する
   */
  public deleteGroup(loginId: string, groupCd: string): Observable<boolean> {
    return of(true);
  }

  /**
   * グループメンバーを取得する
   */
  public getGroupMember(loginId: string, groupCd: string, pageable?: Pageable): Observable<Page<GroupMember>> {
    // TODO 実装
    return of();
  }

  /**
   * グループメンバーを登録する
   */
  public postGroupMember(loginId: string, groupCd: string, form: GroupInviteForm): Observable<boolean> {
    return of(true);
  }

  /**
   * グループメンバーを削除する
   */
  public removeGroupMember(loginId: string, groupCd: string, memberLoginId: string): Observable<boolean> {
    return of(true);
  }

  /**
   * 管理者を変更する
   */
  public putGroupManager(loginId: string, groupCd: string, managerLoginId: string): Observable<boolean> {
    return of(true);
  }
}
