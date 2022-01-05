import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuModalService } from './modal.service';

@Directive({
  selector: '[auModalOpenOnClick]'
})
export class AuModalOpenOnClickDirective implements OnInit, OnDestroy {

  elements: HTMLBaseElement[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private modalService: AuModalService
  ) { }

  ngOnInit(): void {
    this.modalService.close$.subscribe(() => this.viewContainer.clear());
  }

  ngOnDestroy(): void {
    this.elements.forEach(el => el.removeEventListener('click', this.clickHandler));
  }

  @Input()
  set auModalOpenOnClick(els) {

    if (els.length) {
      this.elements = els;
    } else {
      this.elements = [els];
    }

    this.elements.forEach(el => {
      el.addEventListener('click', this.clickHandler);
    })

  }

  clickHandler = (() => {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
  }).bind(this);
}
