import {Component, Input, OnInit} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export interface AutocompleteOptionGroups {
  title: string;
  children?: AutocompleteOptionGroups[];
}

@Component({
  selector: 'app-grouped-autocomplete-component',
  template: `
    <div class="example-input">
      <nz-input-group nzSize="large" [nzSuffix]="suffixIcon">
        <input
          style="width: 100%"
          nz-input
          [placeholder]="placeholder"
          [(ngModel)]="inputValue"
          (ngModelChange)="onChange($event)"
          [nzAutocomplete]="auto"
        />
      </nz-input-group>
      <ng-template #suffixIcon>
        <i nz-icon nzType="search"></i>
      </ng-template>
      <nz-autocomplete #auto>
        <nz-auto-optgroup *ngFor="let group of activeOptionGroups" [nzLabel]="groupTitle">
          <ng-template #groupTitle>
            <span>{{ group.title }} </span>
          </ng-template>
          <nz-auto-option
            *ngFor="let option of group.children"
            [nzLabel]="option.title"
            [nzValue]="option.title"
          >
            {{ option.title }}
          </nz-auto-option>
        </nz-auto-optgroup>
      </nz-autocomplete>
    </div>
  `,
  styles: [
    `
      .certain-search-item-count {
        position: absolute;
        color: #999;
        right: 16px;
      }

      .more-link {
        float: right;
      }
    `,
  ],
})
export class GroupedAutocompleteComponent implements OnInit, ControlValueAccessor {
  inputValue: string;

  @Input()
  optionGroups: AutocompleteOptionGroups[];

  @Input()
  placeholder: string;

  activeOptionGroups: AutocompleteOptionGroups[];

  ngOnInit(): void {
    this.activeOptionGroups = this.optionGroups.map(og => {
      return {
        title: og.title,
        children: [...og.children],
      };
    });
  }

  onChange(value: string): void {
    this.activeOptionGroups = this.optionGroups.map((og, index) => {
      this.activeOptionGroups[index] = {
        title: og.title,
        children: [...og.children],
      };

      this.activeOptionGroups[index].children = og.children.filter(o =>
        o.title.toLowerCase().includes(value.toLowerCase())
      );

      return this.activeOptionGroups[index];
    }).filter(og => og.children.length > 0);
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {

  }
}
