import { Component, OnInit, Input } from '@angular/core';

import { Account } from 'shared/service/account';
import { GroupService, Group } from 'shared/service/group';
import { AuthService } from 'shared/service/auth';
import { LoadingService } from 'shared/service/loading';

/**
 * グループメンバーメニュー
 */
@Component({
  selector: 'app-group-member-menu',
  templateUrl: './group-member-menu.component.html',
  styleUrls: ['./group-member-menu.component.scss']
})
export class GroupMemberMenuComponent implements OnInit {

  /** グループコード */
  @Input() groupCd: string;

  /** アカウント情報 */
  @Input() account: Account;

  /** モーダル */
  private modalInstance: any;
  private modalConfirmLeaveInstance: any;

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
    private groupService: GroupService
  ) { }

  ngOnInit(): void {
    // モーダル
    this.modalInstance = window['M'].Modal.init(document.getElementById('member-menu-modal'), {
      endingTop: '30%'
    });
    // 退会確認モーダル
    this.modalConfirmLeaveInstance = window['M'].Modal.init(document.getElementById('member-confirm-leave-modal'), {
      endingTop: '15%'
    });
  }

  /**
   * 管理者にする（確認モーダルを開く）
   */
  changeManagerConfirm() {
    // TODO 実装
    console.log('changeManagerConfirm');
  }

  /**
   * 退会させる (確認モーダルを開く)
   */
  leaveConfirm() {
    // モーダルを閉じる
    this.modalInstance.close();

    // 確認モーダルを開く
    this.modalConfirmLeaveInstance.open();
  }

  /**
   * 退会させる
   */
  leave(): void {
    // グループメンバーを削除する
    this.loadingService.setLoading(true);
    this.groupService.removeGroupMember(this.authService.loginId, this.groupCd, this.account.loginId).subscribe(ret => {
      this.loadingService.setLoading(false);

      if (ret) {
        // モーダルを閉じる
        this.modalConfirmLeaveInstance.close();
        // this.router.navigate(['/group']);

        window['M'].toast({ html: '退会させました。' });
      }
    });
  }
}
