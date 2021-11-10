import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[customSubmit]',
})

// Submit only on pressing 'Enter' or when triggering onChange event
export class CustomSubmitDirective {
  @Input() control!: FormControl;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.control?.valueChanges
      .subscribe((value) => {
        if (value === null && this.el.nativeElement.value) {
          this.el.nativeElement.value = '';
        }
      });
  }

  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (e.key == 'Enter') {
      this.control.setValue((e.target as HTMLInputElement).value);
    }
  }
  @HostListener('change', ['$event'])
  onChange(e: Event) {
    this.control.setValue((e.target as HTMLInputElement).value);
  }
}
