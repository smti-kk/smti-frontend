import {Component, Renderer2} from '@angular/core';

@Component({
  selector: 'app-organizations-data',
  templateUrl: './organizations-data.component.html',
  styleUrls: ['./organizations-data.component.scss'],
})
export class OrganizationsDataComponent {
  constructor(private readonly renderer: Renderer2) {}

  openAccordion($event, clazz): void {
    if ($event.target.classList.contains('c-accordion-title')) {
      this.toggleClass($event.target.nextElementSibling, clazz);
      this.toggleClass($event.target.lastElementChild, clazz);
    } else {
      this.toggleClass($event.target.parentNode.lastElementChild, clazz);
      this.toggleClass($event.target.parentNode.nextElementSibling, clazz);
    }
  }

  private toggleClass(item: Element, clazz: string): void {
    const hasClass = item.classList.contains(clazz);

    if (hasClass) {
      this.renderer.removeClass(item, clazz);
    } else {
      this.renderer.addClass(item, clazz);
    }
  }
}
