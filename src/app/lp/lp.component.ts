import { Component, OnInit } from '@angular/core';
import { TimerService } from 'shared/service/timer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lp',
  templateUrl: './lp.component.html',
  styleUrls: ['./lp.component.scss']
})
export class LpComponent implements OnInit {

  /** タイマー */
  timer: Subscription;

  constructor(
    private timerService: TimerService
  ) { }

  ngOnInit() {

    const options = {
      duration: 300,
      fullWidth: true,
      indicators: true
    };
    const elems = document.getElementById('carousel');
    const instances = window['M'].Carousel.init(elems, options, false, false);

    this.timerService.interval = 4000;  // 4秒間隔でカルーセルを動かす

    // カウントダウン
    this.timer = this.timerService.getTimer().subscribe(time => {
      // 操作していないとき
      if (!instances.pressed) {
        instances.next();
      }

      // 無限に動く
      // if (time === 10) {
      //   this.timer.unsubscribe();
      // }
    });
  }

}
