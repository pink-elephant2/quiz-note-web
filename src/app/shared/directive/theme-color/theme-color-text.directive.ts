import { Directive, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { ThemeService, ColorPatternEnum } from 'shared/service/theme';

/**
 * テーマカラーディレクティブ
 * テキスト色
 */
@Directive({
  selector: '[appThemeColorText]'
})
export class ThemeColorTextDirective implements OnInit {

  @Input('appThemeColorText') pattern: ColorPatternEnum;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    let classList: string[] = this.themeService.getTextColors(this.pattern);

    // 要素に適用する
    classList.forEach(cls => {
      this.renderer.addClass(this.el.nativeElement, cls);
    });
  }
}
