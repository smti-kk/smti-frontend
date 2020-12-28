import {Directive, ElementRef, EventEmitter, OnInit, Output} from "@angular/core";

@Directive({
    selector: '[appObserver]'
})
export class ObserverDirective implements OnInit {
    @Output() onEndIntersect: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private element: ElementRef
    ) {}

    ngOnInit() {
        const observer = new window.IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {return;}
          if (entry.boundingClientRect.top < 0) {
              this.onEndIntersect.emit();
          }
        }, {
          rootMargin: '-100% 0px 0px 0px',
          threshold: 0,
        });
        observer.observe(this.element.nativeElement)
    }
}
