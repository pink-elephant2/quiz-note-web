import { Directive, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { ThemeService, ColorPatternEnum } from 'shared/service/theme';

/**
 * テーマカラーディレクティブ
 * 背景色
 */
@Directive({
  selector: '[appThemeColorBg]'
})
export class ThemeColorBgDirective implements OnInit {

  @Input('appThemeColorBg') pattern: ColorPatternEnum;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    let classList: string[] = this.themeService.getBgColors(this.pattern);

    // 要素に適用する
    classList.forEach(cls => {
      this.renderer.addClass(this.el.nativeElement, cls);
    });
  }
}
