import { Directive, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { ThemeService, ColorPatternEnum } from 'shared/service/theme';

/**
 * テーマカラーディレクティブ
 */
@Directive({
  selector: '[appThemeColor]'
})
export class ThemeColorDirective implements OnInit {

  @Input('appThemeColor') pattern: ColorPatternEnum;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    let classList: string[];

    if (this.el.nativeElement.classList.value.indexOf('btn') !== -1) {
      // ボタン
      classList = this.themeService.getBgColors(this.pattern);
    } else {
      // テキスト
      classList = this.themeService.getTextColors(this.pattern);
    }

    // 要素に適用する
    classList.forEach(cls => {
      this.renderer.addClass(this.el.nativeElement, cls);
    });
  }
}
