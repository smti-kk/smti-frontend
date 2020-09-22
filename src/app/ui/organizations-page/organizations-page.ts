import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '@service/organizations/OrganizationService';
import {OrganizationTableRow} from '@service/dto/OrganizationTableRow';

@Component({
  selector: 'app-organizations-page',
  templateUrl: './organizations-page.html',
  styleUrls: ['./organizations-page.scss']
})
export class OrganizationsPage implements OnInit {
  organizations: OrganizationTableRow[];
  isLoading: boolean;

  constructor(private readonly organizationService: OrganizationService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.organizationService.list().subscribe(organizations => {
      this.organizations = organizations;
      this.isLoading = false;
    });
  }
}
