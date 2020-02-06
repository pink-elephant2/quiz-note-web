import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';

/**
 * タイマーサービス
 */
@Injectable()
export class TimerService {

  /** 持ち時間 */
  private _timeLimit = 10;  // 10秒

  /** 経過秒数(ミリ秒) */
  private _interval = 1000;  // 1秒

  constructor() { }

  /**
   * 持ち時間を取得する
   */
  get timeLimit(): number {
    return this._timeLimit;
  }

  /**
   * 持ち時間を設定する
   */
  set timeLimit(num: number) {
    this._timeLimit = num;
  }

  /**
   * 経過秒数(ミリ秒)を設定する
   */
  set interval(interval: number) {
    this._interval = interval;
  }

  public getTimer(): Observable<number> {
    // 1秒間隔で経過秒数を返す
    return interval(this._interval);
  }

  /**
   * 初期値に戻す
   */
  public reset(): void {
    this._timeLimit = 10;
  }
}
