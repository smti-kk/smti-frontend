import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { LocationFilters } from 'src/app/ui/locations-page/location-filters/LocationFilters';
import { FormEditLocationComponent } from 'src/app/ui/old/locations-book/components/form-edit-location/form-edit-location.component';
import { LocationsGeoModalComponent } from 'src/app/ui/old/locations-book/components/locations-geo-modal/locations-geo-modal.component';
import { LocationTypeDescription } from 'src/app/ui/old/locations-book/enums/locations-book.enum';
import { LocationsContent } from 'src/app/ui/old/locations-book/interfaces/locations-book.interface';
import { LocationsBookService } from './../../services/locations-book.service';
import { MatPaginatorEvent } from './../../../core/models/base-interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './locality-book.component.html',
  styleUrls: ['./locality-book.component.scss'],
})
export class LocalityBookPageComponent implements OnInit {
  columnsToDisplay: string[] = [
    'orderNum',
    'localityName',
    'localityType',
    'municipalityArea',
    'population',
    'fiasNum',
    'okato',
    'oktmo',
    'geo',
    'select',
  ];
  dataSource: MatTableDataSource<LocationsContent>;
  items: any;

  page = 0;
  size = 30;
  length: number;
  filters: LocationFilters | any = {};
  locationsDescription = LocationTypeDescription;

  constructor(
    private locationBookService: LocationsBookService,
    private readonly modalService: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<LocationsContent>(this.items);
  }
  ngOnInit(): void {
    this.locationBookService.getLocationsList({page: this.page, size: this.size}).subscribe((value) => {
      this.length = value.totalElements;
      this.dataSource.data = value.content;
    });
  }

  edit(row: LocationsContent): void {
    const { id } = row;
    const dialogRef = this.modalService.open(FormEditLocationComponent, {
      panelClass: 'location-form-edit',
      width: '500px',
      data: {
        row: {
          name: row.name,
          type: row.type,
          population: row.population,
          parent: row.locationParent.id,
        },
        headerContent: 'Редактирование населенного пункта',
      },
    });

    dialogRef.afterClosed().subscribe((formData) => {
      if (formData) {
        this.locationBookService.editLocation(id, formData).subscribe({
          next: () => {
            const index = this.dataSource.data.findIndex(
              (location) => location.id === id
            );
            const rowData = { ...this.dataSource.data[index] };
            this.dataSource.data[index] = { ...rowData, ...formData };
            this.dataSource.data = [...this.dataSource.data];
          },
          error: (err) => {
            if (Array.isArray(err.error)) {
              this.snackBar.open(err.error[0], 'Закрыть');
            }
          },
        });
      }
    });
  }

  displayCoord(data: [[number, number]]): void {
    const dialogRef = this.modalService.open(LocationsGeoModalComponent, {
      width: '520px',
      data,
    });
  }

  onPageChange(e: MatPaginatorEvent) {
    this.locationBookService
      .getLocationsList({
        page: e.pageIndex,
        size: this.size,
        filters: this.filters,
      })
      .subscribe((value) => {
        this.dataSource.data = value.content;
      });
  }
  d;
  setFilter(filters: any): void {
    this.filters = filters;
    this.page = 0;
    this.locationBookService
      .getLocationsList({
        page: this.page,
        size: this.size,
        filters: this.filters,
      })
      .subscribe((data) => {
        this.dataSource.data = data.content;
        this.length = data.totalElements;
      });
  }

  convertCoords(data: LocationsContent): [[number, number]] {
    if (data.geoData.administrativeCenter) {
      return [
        [
          data.geoData.administrativeCenter.lat,
          data.geoData.administrativeCenter.lng,
        ],
      ];
    }

    if (data?.geoData?.geometry?.coordinates[0][0]) {
      return data?.geoData?.geometry?.coordinates[0][0];
    }
  }
}
