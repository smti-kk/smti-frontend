import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ExistingOperators, LocationFeatures, MobileGeneration, Quality, SignalType, TrunkChannel } from '@core/models';
import { TcPivotsService } from '@core/services/tc-pivots.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EnumService } from '@core/services';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-technical-capabilities',
  templateUrl: './technical-capabilities.component.html',
  styleUrls: ['./technical-capabilities.component.scss']
})
export class TechnicalCapabilitiesComponent {

  locationFeaturesForm: FormGroup;
  locationFeatures: LocationFeatures;
  existingOperators: ExistingOperators;

  Quality = Quality;
  TrunkChannel = TrunkChannel;
  SignalType = SignalType;
  MobileGeneration = MobileGeneration;

  constructor(private fb: FormBuilder,
              private tcService: TcPivotsService,
              private route: ActivatedRoute,
              private enumService: EnumService,
              private spinner: NgxSpinnerService) {
    this.loadTechnicalCapability(route.snapshot.params.id);
  }


  private loadTechnicalCapability(id: number) {
    this.spinner.show();

    forkJoin(
      this.tcService.one(id),
      this.enumService.getExistingOperators()
    ).subscribe(response => {
      this.locationFeaturesForm = this.buildForm(this.fb, response[0], response[1]);
      this.locationFeatures = response[0];
      this.existingOperators = response[1];
      this.spinner.hide();
    });
  }

  private buildForm(fb: FormBuilder, locationFeatures: LocationFeatures, existingOperators: ExistingOperators): FormGroup {
    const form = fb.group({
      _cellular: fb.array([]),
      _internet: fb.array([]),
      _television: fb.array([]),
      _ats: fb.array([]),
      _radio: fb.array([]),
      _mail: fb.array([]),
      _infomat: locationFeatures.location.infomat > 0
    });

    existingOperators.cellular.forEach(() => {
      getArrayGroup(form, '_cellular').push(
        fb.group({
          _operator: null,
          _quality: null,
          _type: null
        })
      );
    });

    existingOperators.internet.forEach(() => {
      getArrayGroup(form, '_internet').push(
        fb.group({
          _operator: null,
          _quality: null,
          _channel: null
        })
      );
    });

    existingOperators.radio.forEach(() => {
      getArrayGroup(form, '_radio').push(
        fb.group({
          _operator: null,
          _quality: null,
          _channel: null
        })
      );
    });

    existingOperators.ats.forEach(() => {
      getArrayGroup(form, '_ats').push(
        fb.group({
          _operator: null,
          _quality: null,
          _channel: null
        })
      );
    });

    existingOperators.television.forEach(() => {
      getArrayGroup(form, '_television').push(
        fb.group({
          _operator: null,
          _quality: null,
          _channel: null
        })
      );
    });

    form.patchValue(locationFeatures);

    form.valueChanges.subscribe(value => console.log(value));
    //
    //
    // existingOperators.cellular.forEach(c => {
    //   getArrayGroup(form, 'cellular').push(
    //     fb.group({
    //       provider: false,
    //       quality: c.quality,
    //       mobileGeneration: c.mobileGeneration ? c.mobileGeneration.name : null,
    //     })
    //   );
    // });
    //
    // tc.information.internet.forEach(c => {
    //   getArrayGroup(form, 'internet').push(
    //     fb.group({
    //       provider: c.provider.isActive,
    //       quality: c.quality,
    //       channel: c.channel ? c.channel.id : null
    //     })
    //   );
    // });
    //
    // tc.information.tv.forEach(c => {
    //   getArrayGroup(form, 'tv').push(
    //     fb.group({
    //       provider: c.provider.isActive,
    //       type: c.type ? c.type[0].type : null
    //     })
    //   );
    // });
    //
    // tc.information.telephone.forEach(c => {
    //   getArrayGroup(form, 'telephone').push(
    //     fb.group({
    //       provider: c.provider.isActive
    //     })
    //   );
    // });
    //
    // tc.information.payphone.forEach(c => {
    //   getArrayGroup(form, 'payphone').push(
    //     fb.group({
    //       provider: c.provider.isActive,
    //       count: c.count
    //     })
    //   );
    // });
    //
    // tc.information.radio.forEach(c => {
    //   getArrayGroup(form, 'radio').push(
    //     fb.group({
    //       provider: c.provider.isActive,
    //       type: c.type
    //     })
    //   );
    // });
    //
    // tc.information.mail.forEach(c => {
    //   getArrayGroup(form, 'mail').push(
    //     fb.group({
    //       provider: c.provider.isActive
    //     })
    //   );
    // });

    return form;
  }
}

const getArrayGroup = (form: FormGroup, name: string): FormArray => {
  return form.get(name) as FormArray;
};
