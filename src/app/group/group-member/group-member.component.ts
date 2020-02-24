import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { GroupService, GroupMember } from 'shared/service/group';
import { AuthService } from 'shared/service/auth';
import { Pageable, Page } from 'shared/model';

/**
 * グループメンバー
 */
@Component({
  selector: 'app-group-member',
  templateUrl: './group-member.component.html',
  styleUrls: ['./group-member.component.scss']
})
export class GroupMemberComponent implements OnChanges {

  /** グループメンバー情報 */
  groupMemberData: Page<GroupMember>;

  /** グループコード */
  @Input() groupCd: string;

  /** メンバー数 */
  @Output() memberCount: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private authService: AuthService,
    private groupService: GroupService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.groupCd) {
      // TODO ページャー実装
      const page = 0;
      const pageable = {
        page: page || 0
      } as Pageable;

      // グループメンバーを取得する
      this.groupService.getGroupMember(this.authService.loginId, this.groupCd, pageable).subscribe(groupMember => {
        this.groupMemberData = groupMember;

        // 親にメンバー数を渡す
        setTimeout(() => {
          this.memberCount.emit(this.groupMemberData.totalElements);
        });
      });
    }
  }

}
