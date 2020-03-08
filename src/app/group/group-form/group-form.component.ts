import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Compressor from 'compressorjs';

import { GroupForm } from './group-form';
import { GroupImageForm } from './group-image-form';
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

  /** グループ情報 */
  group: Group;

  /** プレビュー画像パス */
  blobUrl: string;

  /** 入力フォーム */
  form: FormGroup;
  imageForm: FormGroup;

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
    this.imageForm = this.formBuilder.group(GroupImageForm.validators);
  }

  ngOnInit(): void {
    // テキストボックス事前入力
    window['M'].updateTextFields();

    // 文字数カウント
    window['$']('#groupForm').find('input, textarea').characterCounter();

    // グループCDを渡された場合、編集モード
    this.sub = this.route.params.subscribe((params: { cd: string }) => {
      if (!params.cd) {
        return;
      }
      this.groupCd = params.cd;

      // グループ取得
      this.loadingService.setLoading(true);
      this.groupService.getGroup(this.authService.loginId, this.groupCd).subscribe(group => {
        this.loadingService.setLoading(false);
        this.group = group;

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
   * 画像プレビュー
   */
  onchange(files: FileList): void {
    if (files.length <= 0) {
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.blobUrl = reader.result.toString();

      // 画像圧縮
      new Compressor(files[0], {
        quality: 0.8,
        maxWidth: 250,
        success: (result) => {
          // 画像更新
          this.loadingService.setLoading(true);
          const file = new File([result], files[0].name, { type: files[0].type });
          this.groupService.putImage(this.authService.loginId, this.groupCd, this.imageForm.value, file).subscribe(ret => {
            this.loadingService.setLoading(false);
            if (ret) {
              window['M'].toast({ html: '画像を更新しました。' });
            } else {
              this.isInValid = true;
            }
          }, (error: Response) => {
            this.loadingService.setLoading(false);

            switch (error.status) {
              case 403:
                this.isInValid = true;
                break;
              case 500:
              default:
                this.isError = true;
                break;
            }
          });
        },
        error(err) {
          this.loadingService.setLoading(false);
          throw err;
        }
      });
    }, false);
    reader.readAsDataURL(files[0]);
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

      if (this.groupCd) {
        window['M'].toast({ html: 'グループを更新しました' });
      } else {
        window['M'].toast({ html: 'グループを作成しました' });
      }

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
