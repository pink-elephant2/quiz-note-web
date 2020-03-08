import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { Group, GroupService } from 'shared/service/group';
import { GroupInviteForm } from './group-invite-form';
import { LoadingService } from 'shared/service/loading';
import { AuthService } from 'shared/service/auth';
import { Account, AccountService } from 'shared/service/account';

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

  /** グループ情報をリフレッシュさせるためのコールバック */
  @Output() onRefresh: EventEmitter<void> = new EventEmitter<void>();

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

  /** ブラックリストに入れるか */
  isBlocked: boolean = false;

  /** モーダル */
  private modalInstance: any;
  private modalConfirmInviteInstance: any;
  private modalConfirmLeaveInstance: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService,
    private groupService: GroupService,
    private accountService: AccountService
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
   * 参加する
   */
  join() {
    const form = {
      memberLoginId: this.authService.loginId
    } as GroupInviteForm;

    // グループに所属する
    this.loadingService.setLoading(true);
    this.groupService.postGroupMember(this.authService.loginId, this.group.cd, form).subscribe((ret: boolean) => {
      this.loadingService.setLoading(false);

      // 招待完了
      if (ret) {
        // モーダルを閉じる
        this.modalInstance.close();

        window['M'].toast({ html: '参加しました。' });

        // 親をリフレッシュする
        this.onRefresh.emit();
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
   * 招待する（確認モーダルを開く）
   */
  inviteConfirm() {
    // モーダルを閉じる
    this.modalInstance.close();

    // 確認モーダルを開く
    this.modalConfirmInviteInstance.open();
  }

  /**
   * アカウント存在チェック
   */
  checkInviteAccount() {
    if (this.form.valid && this.form.value.memberLoginId) {
      this.inviteAccount = undefined;
      this.isInValid = false;
      this.isInvited = false;

      // アカウントを取得する
      this.accountService.getAccount(this.form.value.memberLoginId).subscribe(account => {
        this.inviteAccount = account;
      }, (error: Response) => {
        if (error.status === 404) {
          this.isInValid = true;
          this.form.setErrors({ required: true });
        }
      });
    }
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

        // 親をリフレッシュする
        this.onRefresh.emit();
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
    this.groupService.removeGroupMember(this.authService.loginId, this.group.cd, this.authService.loginId, this.isBlocked).subscribe(ret => {
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
