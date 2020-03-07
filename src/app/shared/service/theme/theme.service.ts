import { Injectable } from '@angular/core';
import { ColorPatternEnum } from './color-pattern.enum';

/**
 * テーマサービス
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  /** テーマリスト */
  public themeList = [
    {
      bg: {
        base: [],
        main: ['blue'],
        mainHeadline: ['blue', 'darken-1'],
        mainLink: ['blue', 'darken-4'],
        accent: ['blue', 'accent-2', 'waves-light']
      },
      text: {
        base: [],
        main: ['blue-text'],
        mainHeadline: ['blue-text', 'text-darken-1'],
        mainLink: ['blue-text', 'text-darken-4'],
        accent: ['blue-text', 'text-accent-2', 'waves-light']
      }
    },
    {
      bg: {
        base: [],
        main: ['orange'],
        mainHeadline: ['orange', 'darken-1'],
        mainLink: ['orange', 'darken-4'],
        accent: ['orange', 'accent-2', 'waves-light']
      },
      text: {
        base: [],
        main: ['orange-text'],
        mainHeadline: ['orange-text', 'text-darken-1'],
        mainLink: ['orange-text', 'text-darken-4'],
        accent: ['orange-text', 'text-accent-2', 'waves-light']
      }
    },
    {
      bg: {
        base: [],
        main: ['pink'],
        mainHeadline: ['pink', 'darken-1'],
        mainLink: ['pink', 'darken-4'],
        accent: ['pink', 'accent-2', 'waves-light']
      },
      text: {
        base: [],
        main: ['pink-text'],
        mainHeadline: ['pink-text', 'text-darken-1'],
        mainLink: ['pink-text', 'text-darken-4'],
        accent: ['pink-text', 'text-accent-2', 'waves-light']
      }
    },
    {
      bg: {
        base: [],
        main: ['purple'],
        mainHeadline: ['purple', 'darken-1'],
        mainLink: ['purple', 'darken-4'],
        accent: ['purple', 'accent-2', 'waves-light']
      },
      text: {
        base: [],
        main: ['purple-text'],
        mainHeadline: ['purple-text', 'text-darken-1'],
        mainLink: ['purple-text', 'text-darken-4'],
        accent: ['purple-text', 'text-accent-2', 'waves-light']
      }
    },
    {
      bg: {
        base: [],
        main: ['red'],
        mainHeadline: ['red', 'darken-1'],
        mainLink: ['red', 'darken-4'],
        accent: ['red', 'accent-2', 'waves-light']
      },
      text: {
        base: [],
        main: ['red-text'],
        mainHeadline: ['red-text', 'text-darken-1'],
        mainLink: ['red-text', 'text-darken-4'],
        accent: ['red-text', 'text-accent-2', 'waves-light']
      }
    },
    {
      bg: {
        base: [],
        main: ['green'],
        mainHeadline: ['green', 'darken-1'],
        mainLink: ['green', 'darken-4'],
        accent: ['green', 'accent-2', 'waves-light']
      },
      text: {
        base: [],
        main: ['green-text'],
        mainHeadline: ['green-text', 'text-darken-1'],
        mainLink: ['green-text', 'text-darken-4'],
        accent: ['green-text', 'text-accent-2', 'waves-light']
      }
    }
  ];

  /** 選択中のテーマ番号 */
  public myThemeNo: number = 0;

  constructor() { }

  /**
   * テーマを選択する
   */
  public setTheme(themeNo: number) {
    // TODO ローカルストレージ or DB保存
    this.myThemeNo = themeNo;

    // TODO 呼び出し元に検知させる
  }

  /**
   * 背景色を取得する
   */
  public getBgColors(pattern?: ColorPatternEnum): string[] {
    let classList: string[] = [];

    switch (pattern) {
      // ベースカラー
      case ColorPatternEnum.Base:
        classList = this.themeList[this.myThemeNo].bg.base;
        break;

      // メインカラー
      case ColorPatternEnum.Main:
        classList = this.themeList[this.myThemeNo].bg.main;
        break;

      // メインカラー 見出し
      case ColorPatternEnum.MainHeadline:
        classList = this.themeList[this.myThemeNo].bg.mainHeadline;
        break;

      // メインカラー リンク
      case ColorPatternEnum.MainLink:
        classList = this.themeList[this.myThemeNo].bg.mainLink;
        break;

      // アクセントカラー
      case ColorPatternEnum.Accent:
        classList = this.themeList[this.myThemeNo].bg.accent;
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
        classList = this.themeList[this.myThemeNo].text.base;
        break;

      // メインカラー
      case ColorPatternEnum.Main:
        classList = this.themeList[this.myThemeNo].text.main;
        break;

      // メインカラー 見出し
      case ColorPatternEnum.MainHeadline:
        classList = this.themeList[this.myThemeNo].text.mainHeadline;
        break;

      // メインカラー リンク
      case ColorPatternEnum.MainLink:
        classList = this.themeList[this.myThemeNo].text.mainLink;
        break;

      // アクセントカラー
      case ColorPatternEnum.Accent:
        classList = this.themeList[this.myThemeNo].text.accent;
        break;

      default:
        break;
    }
    return classList;
  }
}
