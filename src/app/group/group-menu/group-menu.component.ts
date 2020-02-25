import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { Group, GroupService } from 'shared/service/group';
import { GroupInviteForm } from './group-invite-form';
import { LoadingService } from 'shared/service/loading';
import { AuthService } from 'shared/service/auth';
import { Account } from 'shared/service/account';

/**
 * グループメニュー
 */
@Component({
  selector: 'app-group-menu',
  templateUrl: './group-menu.component.html',
  styleUrls: ['./group-menu.component.scss']
})
export class GroupMenuComponent implements OnInit {

  /** グループ情報 */
  @Input() group: Group;

  /** 入力フォーム */
  form: FormGroup;

  /** バリデーション失敗 */
  isInValid: boolean;
  /** APIエラー */
  isError: boolean;
  /** 招待済み */
  isInvited: boolean;

  /** 招待するアカウント */
  inviteAccount: Account;

  /** モーダル */
  private modalInstance: any;
  private modalConfirmInviteInstance: any;
  private modalConfirmLeaveInstance: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService,
    private groupService: GroupService
  ) {
    this.form = this.formBuilder.group(GroupInviteForm.validators);
  }

  ngOnInit(): void {
    // 文字数カウント
    window['$']('#groupInviteForm').find('input').characterCounter();

    // モーダル
    this.modalInstance = window['M'].Modal.init(document.getElementById('menu-modal'), {
      endingTop: '30%'
    });
    // 招待確認モーダル
    this.modalConfirmInviteInstance = window['M'].Modal.init(document.getElementById('confirm-invite-modal'), {
      endingTop: '15%'
    });
    // 退会確認モーダル
    this.modalConfirmLeaveInstance = window['M'].Modal.init(document.getElementById('confirm-leave-modal'), {
      endingTop: '15%'
    });
  }

  /**
   * 招待する（確認モーダルを開く）
   */
  inviteConfirm() {
    // モーダルを閉じる
    this.modalInstance.close();

    // 確認モーダルを開く
    this.modalConfirmInviteInstance.open();
  }

  /**
   * 招待する
   * @param form 入力フォーム
   * @param isValid 有効か
   */
  invite(form: GroupInviteForm, isValid: boolean) {
    if (!isValid) {
      return;
    }
    this.isInValid = false;
    this.isError = false;
    this.isInvited = false;

    // メンバーを招待する
    this.loadingService.setLoading(true);
    this.groupService.postGroupMember(this.authService.loginId, this.group.cd, form).subscribe((ret: boolean) => {
      this.loadingService.setLoading(false);

      // 招待完了
      if (ret) {
        // モーダルを閉じる
        this.modalConfirmInviteInstance.close();

        window['M'].toast({ html: '招待しました。' });
      } else {
        // 招待済み
        this.isInvited = true;
      }
    }, (error: Response) => {
      this.loadingService.setLoading(false);

      switch (error.status) {
        case 401:
        case 403:
        case 404:
          this.isInValid = true;
          break;
        case 500:
        default:
          this.isError = true;
          break;
      }
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

      if (ret) {
        // モーダルを閉じる
        this.modalConfirmLeaveInstance.close();
        this.router.navigate(['/group']);

        window['M'].toast({ html: '退会しました。' });
      }
    });
  }
}
