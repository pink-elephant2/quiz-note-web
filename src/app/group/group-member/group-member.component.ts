import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { GroupService, GroupMember } from 'shared/service/group';
import { AuthService } from 'shared/service/auth';
import { Account } from 'shared/service/account';
import { Pageable, Page } from 'shared/model';

/**
 * グループメンバー
 */
@Component({
  selector: 'app-group-member',
  templateUrl: './group-member.component.html',
  styleUrls: ['./group-member.component.scss']
})
export class GroupMemberComponent implements OnChanges {

  /** グループメンバー情報 */
  groupMemberData: Page<GroupMember>;

  /** グループコード */
  @Input() groupCd: string;

  /** 管理者アカウントか */
  @Input() isManager: boolean;

  /** メンバー数 */
  @Output() memberCount: EventEmitter<number> = new EventEmitter<number>();

  /** グループ情報をリフレッシュさせるためのコールバック */
  @Output() onRefresh: EventEmitter<void> = new EventEmitter<void>();

  /** 選択したアカウント */
  currentAccount: Account;

  constructor(
    private authService: AuthService,
    private groupService: GroupService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.groupCd) {
      // グループメンバーを取得する
      this.getGroupMember();
    }
  }

  /**
   * グループメンバーを取得する
   */
  getGroupMember(page?: number) {
    const pageable = {
      page: page || 0
    } as Pageable;

    // グループメンバーを取得する
    this.groupService.getGroupMember(this.authService.loginId, this.groupCd, pageable).subscribe(groupMember => {
      this.groupMemberData = groupMember;

      // 親にメンバー数を渡す
      setTimeout(() => {
        this.memberCount.emit(this.groupMemberData.totalElements);
      });

      window.scrollTo(0, 0);
    });
  }

  /**
   * メニューを開く
   */
  openMemu(groupMember: GroupMember) {
    // アカウントを選択する。リフレッシュするため詰めなおし
    this.currentAccount = undefined;
    setTimeout(() => {
      this.currentAccount = groupMember.account;
    });
    // モーダルはライブラリが開く
  }

  /**
   * メニューからのコールバック
   */
  refresh() {
    // 親をリフレッシュする
    this.onRefresh.emit();
  }
}
