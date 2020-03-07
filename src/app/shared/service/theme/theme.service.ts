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
        classList = []
        break;

      // メインカラー 見出し
      case ColorPatternEnum.MainHeadline:
        break;

      // メインカラー リンク
      case ColorPatternEnum.MainLink:
        break;

      // アクセントカラー
      case ColorPatternEnum.Accent:
        classList = ['pink', 'accent-2', 'waves-light']
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
    let classList: string[] = [];

    switch (pattern) {
      // ベースカラー
      case ColorPatternEnum.Base:
        classList = ['waves-pink']
        break;

      // メインカラー
      case ColorPatternEnum.Main:
        break;

      // メインカラー 見出し
      case ColorPatternEnum.MainHeadline:
        classList = ['red-text', 'darken-1'];
        break;

      // メインカラー リンク
      case ColorPatternEnum.MainLink:
        classList = [];
        break;

      // アクセントカラー
      case ColorPatternEnum.Accent:
        classList = ['pink-text', 'text-accent-2', 'waves-pink']
        break;

      default:
        break;
    }
    return classList;
  }
}
