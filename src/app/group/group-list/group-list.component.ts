import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'shared/service/auth';
import { LoadingService } from 'shared/service/loading';
import { GroupService, Group } from 'shared/service/group';
import { Pageable, Page } from 'shared/model';

/**
 * グループ一覧
 */
@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  /** グループ情報 */
  groupData: Page<Group>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService,
    private groupService: GroupService
  ) { }

  ngOnInit(): void {
    // グループ取得
    this.getGroupList();
  }

  /**
   * グループを取得する
   * @param page ページ番号
   */
  getGroupList(page?: number) {
    const pageable = {
      page: page || 0
    } as Pageable;

    // グループ取得
    this.loadingService.setLoading(true);
    this.groupService.getGroupList(this.authService.loginId, pageable).subscribe(groupData => {
      this.loadingService.setLoading(false);
      this.groupData = groupData;

      console.log(groupData);

      // TODO 仮データ
      this.groupData.content = [
        {
          name: 'グループ1',
          description: '説明'
        } as Group,
        {
          name: 'グループ2',
          description: '説明2'
        } as Group
      ];
    }, () => {
      this.loadingService.setLoading(false);
      this.router.navigate(['logout']);
    });
  }
}
