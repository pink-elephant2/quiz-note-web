import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Group, GroupService } from 'shared/service/group';
import { LoadingService } from 'shared/service/loading';
import { AuthService } from 'shared/service/auth';

/**
 * グループメニュー
 */
@Component({
  selector: 'app-group-menu',
  templateUrl: './group-menu.component.html',
  styleUrls: ['./group-menu.component.scss']
})
export class GroupMenuComponent implements OnInit {

  @Input() group: Group;

  /** モーダル */
  private modalInstance: any;
  private modalConfirmLeaveInstance: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService,
    private groupService: GroupService
  ) { }

  ngOnInit(): void {
    // モーダル
    this.modalInstance = window['M'].Modal.init(document.getElementById('menu-modal'), {
      endingTop: '30%'
    });
    // 退会確認モーダル
    this.modalConfirmLeaveInstance = window['M'].Modal.init(document.getElementById('confirm-leave-modal'), {
      endingTop: '15%'
    });
  }

  /**
   * 退会する (確認モーダルを開く)
   */
  leaveConfirm() {
    // モーダルを閉じる
    this.modalInstance.close();

    // 確認モーダルを開く
    this.modalConfirmLeaveInstance.open();
  }

  /**
   * 退会する
   */
  leave(): void {
    // グループメンバー（自分）を削除する
    this.loadingService.setLoading(true);
    this.groupService.removeGroupMember(this.authService.loginId, this.group.cd, this.authService.loginId).subscribe(ret => {
      this.loadingService.setLoading(false);

      // モーダルを閉じる
      this.modalConfirmLeaveInstance.close();
      this.router.navigate(['/group']);

      // TODO メッセージ
    });
  }
}
