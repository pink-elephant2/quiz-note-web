import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/**
 * グループメンバー
 */
@Component({
  selector: 'app-group-member',
  templateUrl: './group-member.component.html',
  styleUrls: ['./group-member.component.scss']
})
export class GroupMemberComponent implements OnInit {

  /** グループコード */
  @Input() groupCd: string;

  /** メンバー数 */
  @Output() memberCount: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

}
