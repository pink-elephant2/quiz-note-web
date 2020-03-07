import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'shared/service/theme';

/**
 * 表示設定
 */
@Component({
  selector: 'app-setting-display',
  templateUrl: './setting-display.component.html',
  styleUrls: ['./setting-display.component.scss']
})
export class SettingDisplayComponent implements OnInit {

  /** テーマリスト */
  themeList = [];

  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.themeList = this.themeService.themeList;
  }

  /**
   * テーマを選択
   */
  setTheme(themeNo: number) {
    this.themeService.setTheme(themeNo);
  }
}
