import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { APP_TITLE } from './shared/const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((params: any) => {
      window.scrollTo(0, 0);

      // タイトル設定
      const titles: Array<string> = this.getRouterData(this.router.routerState, this.router.routerState.root, 'title');
      const title = ((titles.length > 0) ? titles.pop() + ' - ' : '') + APP_TITLE;
      this.titleService.setTitle(title);
    });
  }

  /**
   * Router設定値を取得する。
   * @param state 状態
   * @param parent 親
   */
  private getRouterData(state, parent, key: string): Array<string> {
    const data: Array<string> = [];
    if (parent && parent.snapshot.data && parent.snapshot.data[key]) {
      data.push(parent.snapshot.data[key]);
    }
    if (state && parent) {
      // 再帰
      data.push(... this.getRouterData(state, state.firstChild(parent), key));
    }
    return data;
  }
}
