import { Injectable } from '@angular/core';
import { ColorPatternEnum } from './color-pattern.enum';

/**
 * テーマサービス
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  /**
   * 背景色を取得する
   */
  public getBgColors(pattern?: ColorPatternEnum): string[] {
    let classList: string[] = [];

    switch (pattern) {
      // ベースカラー
      case ColorPatternEnum.Base:
        break;

      // メインカラー
      case ColorPatternEnum.Main:
        break;

      // メインカラー 見出し
      case ColorPatternEnum.MainHeadline:
        break;

      // メインカラー リンク
      case ColorPatternEnum.MainLink:
        break;

      // アクセントカラー
      case ColorPatternEnum.Accent:
        classList = ['pink', 'accent-2']
        break;

      default:
        break;
    }
    return classList;
  }

  /**
   * テキスト色を取得する
   */
  public getTextColors(pattern?: ColorPatternEnum): string[] {
    return [];
  }
}
