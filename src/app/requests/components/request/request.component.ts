import { Component, Input } from '@angular/core';
import { Request, RequestState, requestStateLabel } from '../../model/request';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent {

  @Input() request: Request;

  requestStateLabel = requestStateLabel;
  RequestState = RequestState;
}
