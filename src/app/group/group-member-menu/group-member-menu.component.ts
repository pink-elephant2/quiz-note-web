import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

  /** グループ情報をリフレッシュさせるためのコールバック */
  @Output() onRefresh: EventEmitter<void> = new EventEmitter<void>();

  /** モーダル */
  private modalInstance: any;
  private modalConfirmManagerInstance: any;
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
    // 管理者確認モーダル
    this.modalConfirmManagerInstance = window['M'].Modal.init(document.getElementById('member-confirm-manager-modal'), {
      endingTop: '15%'
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
    // モーダルを閉じる
    this.modalInstance.close();

    // 確認モーダルを開く
    this.modalConfirmManagerInstance.open();
  }

  /**
   * 管理者にする（確認モーダルを開く）
   */
  changeManager() {
    // 管理者を変更する
    this.loadingService.setLoading(true);
    this.groupService.putGroupManager(this.authService.loginId, this.groupCd, this.account.loginId).subscribe(ret => {
      this.loadingService.setLoading(false);

      if (ret) {
        // モーダルを閉じる
        this.modalConfirmManagerInstance.close();

        window['M'].toast({ html: '管理者を変更しました。' });

        // 親をリフレッシュする
        this.onRefresh.emit();
      }
    });
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

        // 親をリフレッシュする
        this.onRefresh.emit();
      }
    });
  }
}
