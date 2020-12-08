import {Component, OnInit} from '@angular/core';
import {FeaturesComparingService} from '@service/features-comparing/FeaturesComparingService';
import {FeaturesComparing} from '@service/dto/FeaturesComparing';
import {FCTechnicalCapability} from '@api/dto/ShortTechnicalCapability';
import {MatDialog} from '@angular/material/dialog';
import {MoveToArchiveDialog} from './move-to-archive-dialog/MoveToArchiveDialog';
import {CurrentYearService} from '@service/util/CurrentYearService';
import {TechnicalCapabilityType} from '@api/dto/TechnicalCapabilityType';
import {MatButtonToggleChange} from '@angular/material/button-toggle';
import {LocationFilters} from '../locations-page/location-filters/LocationFilters';

@Component({
  selector: 'features-page',
  templateUrl: './features-page.html',
  styleUrls: ['./features-page.scss']
})
export class FeaturesPage implements OnInit {
  readonly currentYear: number;
  features: FeaturesComparing[];
  type: TechnicalCapabilityType = 'INET';
  page = 0;
  size = 20;
  filters: LocationFilters;
  totalElements: number;

  constructor(private readonly featuresService: FeaturesComparingService,
              private readonly currentYearService: CurrentYearService,
              public dialog: MatDialog) {
    this.currentYear = currentYearService.currentYear();
    this.reloadFeatures(this.type);
  }

  ngOnInit(): void {
  }

  showDialog(tc: FCTechnicalCapability, locationId: number): void {
    const dialogRef = this.dialog.open(MoveToArchiveDialog, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.featuresService.makeItActive(locationId, tc.id).subscribe(() => {
          this.featuresService.featuresComparing(this.page, this.size, this.type).subscribe(features => {
            this.features = features.content;
            this.totalElements = features.totalElements;
          });
        });
      }
    });
  }

  reloadFeatures(type: TechnicalCapabilityType): void {
    this.page = 0;
    this.size = 20;
    this.featuresService.featuresComparingFiltered(this.page, this.size, type, this.filters).subscribe(features => {
      this.features = features.content;
      this.totalElements = features.totalElements;
    });
  }

  onChangeType($event: MatButtonToggleChange): void {
    this.type = $event.value;
    this.reloadFeatures(this.type);
  }

  onScrollDown(): void {
    this.page = this.page + 1;
    this.featuresService.featuresComparingFiltered(this.page, this.size, this.type, this.filters).subscribe(features => {
      this.features = [...this.features, ...features.content];
    });
  }

  filter(filters: LocationFilters): void {
    console.log(filters)
    this.page = 0;
    this.size = 20;
    this.filters = filters;
    this.featuresService.featuresComparingFiltered(this.page, this.size, this.type, filters).subscribe(features => {
      this.features = features.content;
      this.totalElements = features.totalElements;
    });
  }

  exportExcel(): void {
    this.featuresService.featuresComparingExportExcel(this.type, this.filters).subscribe(() => {
    });
  }
}
