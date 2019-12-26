import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import {AccordionHeaderComponent} from '@shared/layout/accordion/accordion-header.component';

@Component({
  selector: 'group',
  template: `
    <div class="mypanel">
      <span (click)="toggle.emit()"><ng-content select="accordion-header"></ng-content></span>
      <div class="body" [ngClass]="{hidden: !opened}">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['accordion.component.scss'],
})
export class AccordionGroupComponent implements AfterContentInit {
  @Input() opened = false;

  @Input() title: string;

  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();

  @ContentChildren(AccordionHeaderComponent)
  headers: QueryList<AccordionHeaderComponent>;

  ngAfterContentInit() {
    this.toggle.subscribe(() => {
      this.headers.toArray().forEach(header => {
        header.isOpen = !this.opened;
      });
    });
  }
}
