import { Directive, HostListener, Renderer2, ElementRef, Input, HostBinding, OnInit } from '@angular/core';

/**
 * グループ画像ディレクティブ
 */
@Directive({
  selector: 'img[appGroupImage]'
})
export class GroupImageDirective implements OnInit {

  @HostBinding('attr.src') @Input() src: string;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {
  }

  ngOnInit(): void {
    if (this.src === undefined || this.src === null) {
      // デフォルト画像セット TODO グループ画像
      this.src = '/assets/images/account.png';
    }
  }

  @HostListener('error') onError() {
    // デフォルト画像セット
    this.renderer.setAttribute(this.el.nativeElement, 'src', '/assets/images/account.png');
  }
}
