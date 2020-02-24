import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { GroupForm } from './group-form';
import { AuthService } from 'shared/service/auth';
import { LoadingService } from 'shared/service/loading';
import { GroupService, Group } from 'shared/service/group';

/**
 * グループ作成画面
 */
@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {

  /** グループCD */
  groupCd: string;

  /** 入力フォーム */
  form: FormGroup;

  /** 作成失敗 */
  isInValid: boolean;
  /** APIエラー */
  isError: boolean;

  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loadingService: LoadingService,
    private groupService: GroupService
  ) {
    this.form = this.formBuilder.group(GroupForm.validators);
  }

  ngOnInit(): void {
    // テキストボックス事前入力
    window['M'].updateTextFields();

    // 文字数カウント
    window['$']('#groupForm').find('input, textarea').characterCounter();

    // グループCDを渡された場合、編集モード
    this.sub = this.route.params.subscribe((params: { cd: string }) => {
      this.groupCd = params.cd;

      // グループ取得
      this.loadingService.setLoading(true);
      this.groupService.getGroup(this.authService.loginId, this.groupCd).subscribe(group => {
        this.loadingService.setLoading(false);

        // 管理者アカウントのみ編集可能
        if (group.account.loginId !== this.authService.loginId) {
          this.router.navigate(['/group']);
          return;
        }

        // フォームにセット
        this.form.controls.name.setValue(group.name);
        this.form.controls.description.setValue(group.description);

      }, (error: Response) => {
        this.loadingService.setLoading(false);
        this.isError = true;
      });
    });
  }

  /**
   * 登録ボタン
   * @param form 入力フォーム
   * @param isValid 有効か
   */
  onSubmit(form: GroupForm, isValid: boolean) {
    if (!isValid) {
      return;
    }
    this.isInValid = false;
    this.isError = false;

    // グループ作成
    this.loadingService.setLoading(true);
    const sub = (this.groupCd)
      ? this.groupService.putGroup(this.authService.loginId, this.groupCd, this.form.value)
      : this.groupService.postGroup(this.authService.loginId, this.form.value);
    sub.subscribe((group: Group) => {
      this.loadingService.setLoading(false);

      // 次の画面へ
      this.router.navigate(['/group', group.cd]);
    }, (error: Response) => {
      this.loadingService.setLoading(false);

      switch (error.status) {
        case 401:
        case 403:
          this.isInValid = true;
          break;
        case 500:
        default:
          this.isError = true;
          break;
      }
    });
  }

}
