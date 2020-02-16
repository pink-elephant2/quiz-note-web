import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { GroupService } from './group.service';
import { Group } from './group';
import { GroupForm } from 'src/app/group/group-form/group-form';
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
   * グループ一覧を取得する
   */
  public getGroupList(loginId: string, pageable?: Pageable): Observable<Page<Group>> {
    // TODO 実装
    return of();
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

}
