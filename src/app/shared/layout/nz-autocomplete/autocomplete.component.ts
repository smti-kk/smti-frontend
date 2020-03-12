import {Component, Input, OnInit} from '@angular/core';
import {NzTreeNode, NzTreeNodeOptions} from 'ng-zorro-antd/core';

import {Location} from '@core/models';

@Component({
  selector: 'app-autocomplete',
  template: `
    <nz-tree-select
      style="width: 250px"
      nzShowSearch
      nzPlaceHolder="Выберите населенный пункт"
      [(ngModel)]="value"
      (ngModelChange)="onChange($event)"
      [nzNodes]="nodes"
    >
    </nz-tree-select>
  `,
})
export class AutocompleteComponent implements OnInit {
  @Input() values: Location[];

  value: string;

  nodes: Array<NzTreeNode | NzTreeNodeOptions>;

  ngOnInit(): void {
    this.nodes = this.values
      .map(v => {
        return {key: v.name, title: v.name, isLeaf: true};
      })
      .filter((i, x) => x < 100);
    // console.log(groupBy(this.values, (v) => v.name, (v) => v));
  }

  onChange($event: any): void {
    console.log($event.target.value);
  }
}
