import {Component, OnInit} from '@angular/core';
import {UsersService} from '@service/account/UsersService';
import {UserFromApi} from '@api/dto/UserFromApi';
import {DLocationBase} from '@api/dto/DLocationBase';
import {DLocationsService} from '@service/locations/DLocationsService';
import {DOrganizationBase} from '@api/dto/DOrganizationBase';
import {DOrganizationsService} from '@service/organizations/DOrganizationsService';

@Component({
  selector: 'app-users',
  templateUrl: './users-page.html',
  styleUrls: ['./users-page.scss']
})
export class UsersPage implements OnInit {
  editCache: Map<number, { edit: boolean; data: UserFromApi }>;
  items: UserFromApi[] = [];
  locations: DLocationBase[] = [];
  organizations: DOrganizationBase[] = [];
  roles: {[key: string]: string};
  private readonly usersService: UsersService;
  private readonly dLocationService: DLocationsService;
  private readonly dOrganizationService: DOrganizationsService;

  constructor(
    usersService: UsersService,
    dLocationService: DLocationsService,
    dOrganizationService: DOrganizationsService) {
    this.roles = {};
    this.roles.ADMIN = 'Администратор';
    this.roles.GUEST = 'Посетитель';
    this.roles.MUNICIPALITY = 'Муниципалитет';
    this.roles.ORGANIZATION = 'Оператор - Организации';
    this.roles.OPERATOR = 'Оператор - Локации';
    this.usersService = usersService;
    this.dLocationService = dLocationService;
    this.dOrganizationService = dOrganizationService;
  }

  startEdit(id: number): void {
    this.editCache.get(id).edit = true;
  }

  cancelEdit(id: number): void {
    const index = this.items.findIndex(item => item.id === id);
    this.editCache.set(id, {
      edit: false,
      data: {...this.items[index]}
    });
  }

  saveEdit(id: number): void {
    this.usersService.update(this.editCache.get(id).data).subscribe(value => {
      this.editCache.set(id, {
        edit: false,
        data: value
      });
      const index = this.items.findIndex(item => item.id === id);
      Object.assign(this.items[index], this.editCache.get(id).data);
    });
  }

  ngOnInit(): void {
    this.editCache = new Map<number, { edit: boolean, data: UserFromApi }>();
    this.usersService.list().subscribe(value => {
      this.items = value;
      this.updateEditCache();
    });
    this.dLocationService.all().subscribe(value => {
      this.locations = value;
    });
    this.dOrganizationService.all().subscribe(value => {
      this.organizations = value;
    });
  }

  updateEditCache(): void {
    this.items.forEach(item => {
      this.editCache.set(item.id, {
        edit: false,
        data: {...item}
      });
    });
  }

  locationsCompareFn = (a: DLocationBase, b: DLocationBase) => {
    return a.id === b.id;
  }

  organizationsCompareFn = (a: DOrganizationBase, b: DOrganizationBase) => {
    return a.id === b.id;
  }

  canEditLocations(roles: string[]): boolean {
    return roles.includes('MUNICIPALITY');
  }

  canEditOrganizations(roles: string[]): boolean {
    return roles.includes('ORGANIZATION');
  }

  changeRoles(item: UserFromApi) {
    if (!this.editCache.get(item.id).data.roles.includes('MUNICIPALITY')) {
      item.locations = [];
      this.editCache.get(item.id).data.locations = [];
    }
    if (!this.editCache.get(item.id).data.roles.includes('ORGANIZATION')) {
      item.organizations = [];
      this.editCache.get(item.id).data.organizations = [];
    }
  }
}
