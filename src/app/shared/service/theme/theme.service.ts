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
      case ColorPatternEnum.Primary:
        classList = ['pink', 'accent-2']
        break;

      case ColorPatternEnum.Warning:
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
