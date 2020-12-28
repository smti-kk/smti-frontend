import {Directive, EventEmitter, HostBinding, HostListener, Input, OnChanges, OnInit, Output} from "@angular/core";

enum OrderingDirection {
  ASC,
  DSC,
  UNDEFINED,
}

@Directive({
  selector: '[appSortButton]'
})
export class SortDirective implements OnInit, OnChanges {
  @Output() onSortChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() sortBy:string;
  @Input() currentSort:string;

  ordering = {};
  sortDirection = OrderingDirection.UNDEFINED;
  sortName = this.sortBy;

  @HostBinding('class.is-active') isActive: boolean = false;
  @HostBinding('class.is-reverse') isReverse: boolean = false;

  constructor(){}

  ngOnInit() {
    this.isActive = this.sortBy === this.currentSort;
  }
  ngOnChanges(){
    this.isActive = this.sortBy === this.currentSort;
  }

  @HostListener('click')
  onClick(){
    this.setParams();

    this.onSortChange.emit({
      name: this.sortName,
      orderingDirection: this.sortDirection,
    });
  }

  setParams(){
    if(this.sortName === this.sortBy){
      if(this.isReverse){
        this.isReverse = false;
        this.sortDirection = OrderingDirection.UNDEFINED;
        this.sortName = '';
        return;
      }

      this.sortDirection = OrderingDirection.DSC;
      this.isReverse = true;
      return;
    }
    this.sortDirection = OrderingDirection.ASC;
    this.isReverse = false;
    this.sortName = this.sortBy;
  }
}
