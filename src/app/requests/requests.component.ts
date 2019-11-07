import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnDestroy {
  title = 'front';

  constructor() {
  }

  ngOnDestroy(): void {
  }


}
