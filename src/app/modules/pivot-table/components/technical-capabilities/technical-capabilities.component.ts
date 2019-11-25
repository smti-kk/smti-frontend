import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TcPivotsService } from '../../service/tc-pivots.service';
import { ActivatedRoute } from '@angular/router';
import { LocationCapabilities, Quality, TrunkChannelType } from '@shared/models/location-capabilities';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignalType } from '@shared/models/enums';

@Component({
  selector: 'app-technical-capabilities',
  templateUrl: './technical-capabilities.component.html',
  styleUrls: ['./technical-capabilities.component.scss']
})
export class TechnicalCapabilitiesComponent implements OnInit {

  tcForm: FormGroup;
  tc: LocationCapabilities;

  Quality = Quality;
  TrunkChannelType = TrunkChannelType;
  SignalType = SignalType;

  constructor(private fb: FormBuilder,
              private tcService: TcPivotsService,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService) {
    this.loadTechnicalCapability(route.snapshot.params.id);
  }

  ngOnInit() {
  }

  private loadTechnicalCapability(id: number) {
    this.spinner.show();
    this.tcService.one(id).subscribe(tc => {
      this.tc = tc;
      console.log(tc);
      this.tcForm = this.buildForm(this.fb, tc);
      this.spinner.hide();
    });
  }

  private buildForm(fb: FormBuilder, tc: LocationCapabilities): FormGroup {
    const form = fb.group({
      cellular: fb.array([]),
      internet: fb.array([]),
      tv: fb.array([]),
      telephone: fb.array([]),
      payphone: fb.array([]),
      radio: fb.array([]),
      mail: fb.array([]),
      informat: tc.information.informat
    });

    form.valueChanges.subscribe(value => console.log(value));

    tc.information.cellular.forEach(c => {
      getArrayGroup(form, 'cellular').push(
        fb.group({
          provider: c.provider.isActive,
          quality: c.quality,
          mobileGeneration: c.mobileGeneration,
        })
      );
    });

    tc.information.internet.forEach(c => {
      getArrayGroup(form, 'internet').push(
        fb.group({
          provider: c.provider.isActive,
          quality: c.quality,
          channel: c.channel ? c.channel.id : null
        })
      );
    });

    tc.information.tv.forEach(c => {
      getArrayGroup(form, 'tv').push(
        fb.group({
          provider: c.provider.isActive,
          type: c.type ? c.type[0] : null
        })
      );
    });

    tc.information.telephone.forEach(c => {
      getArrayGroup(form, 'telephone').push(
        fb.group({
          provider: c.provider.isActive
        })
      );
    });

    tc.information.payphone.forEach(c => {
      getArrayGroup(form, 'payphone').push(
        fb.group({
          provider: c.provider.isActive,
          count: c.count
        })
      );
    });

    tc.information.radio.forEach(c => {
      getArrayGroup(form, 'radio').push(
        fb.group({
          provider: c.provider.isActive,
          type: c.type
        })
      );
    });

    tc.information.mail.forEach(c => {
      getArrayGroup(form, 'mail').push(
        fb.group({
          provider: c.provider.isActive
        })
      );
    });

    return form;
  }
}

const getArrayGroup = (form: FormGroup, name: string): FormArray => {
  return form.get(name) as FormArray;
};
