import {AfterContentInit, Component, ContentChildren, QueryList} from '@angular/core';
import {AccordionGroupComponent} from './accordion-group.component';

@Component({
  selector: 'accordion',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements AfterContentInit {
  @ContentChildren(AccordionGroupComponent)
  groups: QueryList<AccordionGroupComponent>;

  ngAfterContentInit() {
    this.groups.toArray().forEach(t => {
      t.toggle.subscribe(() => {
        this.openGroup(t);
      });
    });
  }

  openGroup(group: AccordionGroupComponent) {
    if (group.opened === false) {
      this.groups.toArray().forEach(t => (t.opened = false));
      group.opened = true;
    } else {
      group.opened = false;
    }
  }
}
