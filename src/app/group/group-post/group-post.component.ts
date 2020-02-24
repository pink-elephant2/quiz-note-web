import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/**
 * グループ問題集
 */
@Component({
  selector: 'app-group-post',
  templateUrl: './group-post.component.html',
  styleUrls: ['./group-post.component.scss']
})
export class GroupPostComponent implements OnInit {

  /** グループコード */
  @Input() groupCd: string;

  /** 問題数 */
  @Output() postCount: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

}
