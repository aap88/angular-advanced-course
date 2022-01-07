import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[au-mask]'
})
export class AuMaskDirective {

  @Input('au-mask')
  mask = '';

  input: HTMLInputElement;

  constructor(el: ElementRef) {

    this.input = el.nativeElement;
    
   }

}
