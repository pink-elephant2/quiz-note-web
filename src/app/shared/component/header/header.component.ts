import { Component, OnInit, AfterViewInit } from '@angular/core';

import { APP_TITLE } from '../../const';
import { AuthService } from '../../service/auth';
import { AccountService, Account } from '../../service/account';

/**
 * ヘッダー
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  /** タイトル */
  title = APP_TITLE;

  /** ログイン状態 */
  authenticated = false;

  /** アカウント */
  account: Account;

  /** リンクを表示するか */
  isLink = true;

  constructor(
    private authService: AuthService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    if (location.pathname === '/maintenance') {
      this.isLink = false;
      return;
    }
    // ログイン検知
    this.authService.isAuthenticated.subscribe(ret => {
      this.authenticated = Boolean(ret);

      // ログイン後
      if (this.authenticated) {
        // アカウント取得
        this.accountService.getAccount(this.authService.loginId).subscribe(account => {
          this.account = account;
        });
      } else {
        this.account = undefined;
      }
    });
  }

  ngAfterViewInit(): void {
    // サイドメニュー初期化
    window['$']('.sidenav').sidenav();

    // ドロップダウン初期化
    const option = {
      constrainWidth: false
    };
    window['M'].Dropdown.init(document.querySelectorAll('.dropdown-trigger'), option);
  }
}
