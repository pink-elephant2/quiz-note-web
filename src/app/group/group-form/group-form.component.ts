import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

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

  /** 入力フォーム */
  form: FormGroup;

  /** 作成失敗 */
  isInValid: boolean;
  /** APIエラー */
  isError: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loadingService: LoadingService,
    private groupService: GroupService
  ) {
    this.form = this.formBuilder.group(GroupForm.validators);
  }

  ngOnInit(): void {
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
    this.groupService.postGroup(this.authService.loginId, this.form.value).subscribe((group: Group) => {
      this.loadingService.setLoading(false);

      // TODO 次の画面へ
      console.log(group);
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
