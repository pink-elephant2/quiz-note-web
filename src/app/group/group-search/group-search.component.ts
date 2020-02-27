import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'shared/service/auth';
import { LoadingService } from 'shared/service/loading';
import { GroupService, Group } from 'shared/service/group';
import { Pageable, Page } from 'shared/model';

/**
 * グループを探す
 */
@Component({
  selector: 'app-group-search',
  templateUrl: './group-search.component.html',
  styleUrls: ['./group-search.component.scss']
})
export class GroupSearchComponent implements OnInit {

  /** グループ情報 */
  groupData: Page<Group>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService,
    private groupService: GroupService
  ) { }

  ngOnInit(): void {
    // おすすめグループ一覧を取得する
    this.getGroupRecommendList();
  }

  /**
   * おすすめグループ一覧を取得する
   * @param page ページ番号
   */
  getGroupRecommendList(page?: number) {
    // TODO ページャー
    const pageable = {
      page: page || 0
    } as Pageable;

    // おすすめグループ取得
    this.loadingService.setLoading(true);
    this.groupService.getGroupRecommendList(this.authService.loginId, pageable).subscribe(groupData => {
      this.loadingService.setLoading(false);
      this.groupData = groupData;
    }, (error: Response) => {
      this.loadingService.setLoading(false);

      switch (error.status) {
        // グループが存在しない場合
        case 404:
          this.groupData = {
            totalElements: 0
          } as Page<Group>;
          break;
        default:
          this.router.navigate(['/logout']);
          break;
      }
    });
  }
}
