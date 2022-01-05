import { AfterContentInit, Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { AuTabComponent } from 'app/au-tab/au-tab.component';

@Component({
  selector: 'au-tab-panel',
  templateUrl: './au-tab-panel.component.html',
  styleUrls: ['../tab-panel.component.scss']
})
export class AuTabPanelComponent implements AfterContentInit {

  @ContentChildren(AuTabComponent)
  tabs: QueryList<AuTabComponent>;

  constructor() { }

  ngAfterContentInit(): void {
   console.log(this.tabs)   ;
  }

}
