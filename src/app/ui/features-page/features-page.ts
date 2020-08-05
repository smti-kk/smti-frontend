import {Component, OnInit} from '@angular/core';
import {FeaturesComparingService} from '@service/features-comparing/FeaturesComparingService';
import {FeaturesComparing} from '@service/dto/FeaturesComparing';
import {FCTechnicalCapability} from '@api/dto/ShortTechnicalCapability';
import {MatDialog} from '@angular/material/dialog';
import {MoveToArchiveDialog} from './move-to-archive-dialog/MoveToArchiveDialog';
import {CurrentYearService} from '@service/util/CurrentYearService';

@Component({
  selector: 'features-page',
  templateUrl: './features-page.html',
  styleUrls: ['./features-page.scss']
})
export class FeaturesPage implements OnInit {
  features: FeaturesComparing[];
  readonly currentYear: number;

  constructor(private readonly featuresService: FeaturesComparingService,
              private readonly currentYearService: CurrentYearService,
              public dialog: MatDialog) {
    this.currentYear = currentYearService.currentYear();
    this.featuresService.featuresComparing().subscribe(features => {
      this.features = features;
    });
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
          this.featuresService.featuresComparing().subscribe(features => {
            this.features = features;
          });
        });
      }
    });
  }
}
