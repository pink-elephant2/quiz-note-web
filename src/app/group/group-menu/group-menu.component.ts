import { Component, OnInit, Input } from '@angular/core';
import { Group } from 'shared/service/group';

/**
 * グループメニュー
 */
@Component({
  selector: 'app-group-menu',
  templateUrl: './group-menu.component.html',
  styleUrls: ['./group-menu.component.scss']
})
export class GroupMenuComponent implements OnInit {

  @Input() group: Group;

  constructor() { }

  ngOnInit(): void {
  }

}
