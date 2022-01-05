import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { AuModalService } from './modal.service';

@Component({
  selector: 'au-modal',
  templateUrl: './au-modal.component.html',
  styleUrls: ['./au-modal.component.scss']
})
export class AuModalComponent implements OnInit {

  @Input()
  body: TemplateRef<any>;

  constructor(
    private modalService: AuModalService
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalService.close();
  }

  cancelClick(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
}
