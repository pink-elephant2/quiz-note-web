import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';

import { AuthService } from 'shared/service/auth';
import { LoadingService } from 'shared/service/loading';
import { GroupService, Group } from 'shared/service/group';

/**
 * グループ詳細
 */
@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit, OnDestroy {

  /** グループ */
  group: Group;

  /** 問題数 */
  postCount = 0;

  /** メンバー数 */
  memberCount = 0;

  /** 管理者アカウントか */
  isManager = false;

  /** グループが存在しない */
  isNotFound = false;

  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private authService: AuthService,
    private groupService: GroupService
  ) { }

  ngOnInit(): void {
    // モーダル
    window['$']('.modal').modal();

    this.sub = this.route.params.subscribe((params: { cd: string }) => {

      // グループを取得する
      this.loadingService.setLoading(true);
      this.groupService.getGroup(this.authService.loginId, params.cd).pipe(catchError((error: Response) => {
        this.loadingService.setLoading(false);

        // グループが存在しない場合
        if (error.status === 404) {
          this.isNotFound = true;
        }
        throw error;
      })).subscribe(group => {

        this.loadingService.setLoading(false);
        this.group = group;

        // 管理者アカウントか
        this.isManager = this.group.account.loginId === this.authService.loginId;

        // タブ初期化
        const instance = window['M'].Tabs.init(document.querySelectorAll('.tabs'), {});
      }, () => {
        this.loadingService.setLoading(false);
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /**
   * グループから抜ける
   */
  leave(): void {
    // TODO 実装
    console.log('leave click');
  }
}
