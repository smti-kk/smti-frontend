import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {
  ExistingOperators,
  LocationFeatures,
  MobileGeneration,
  Quality,
  TrunkChannel,
} from '@core/models';
import {TcPivotsService} from '@core/services/tc-pivots.service';
import {ActivatedRoute} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {EnumService} from '@core/services';
import {forkJoin} from 'rxjs';
import {Signal} from '@core/models/signal';
import {mergeDeep} from '@core/utils/merge-deep';

@Component({
  selector: 'app-technical-capabilities',
  templateUrl: './technical-capabilities.component.html',
  styleUrls: ['./technical-capabilities.component.scss'],
})
export class TechnicalCapabilitiesComponent {
  locationFeaturesForm: FormGroup;
  locationFeatures: LocationFeatures;
  existingOperators: ExistingOperators;

  Quality = Quality;
  TrunkChannel = TrunkChannel;
  Signal = Signal;
  MobileGeneration = MobileGeneration;

  constructor(
    private fb: FormBuilder,
    private tcService: TcPivotsService,
    private route: ActivatedRoute,
    private enumService: EnumService,
    private spinner: NgxSpinnerService
  ) {
    this.loadTechnicalCapability(route.snapshot.params.id);
  }

  enableForm(): void {
    this.locationFeaturesForm.enable();
  }

  saveRequest() {
    // this.tcService
    // .save(this.locationFeaturesForm.value)
    // .subscribe((response) => console.log('Успешно сохранено', response));
    // .subscribe();
    this.tcService
      .save(mergeDeep(this.locationFeaturesForm.value, this.locationFeatures))
      .subscribe();
    console.log(mergeDeep(this.locationFeaturesForm.value, this.locationFeatures));
  }

  private loadTechnicalCapability(id: number): void {
    this.spinner.show();

    forkJoin(this.tcService.one(id), this.enumService.getExistingOperators()).subscribe(
      response => {
        this.locationFeaturesForm = this.buildForm(this.fb, response[0], response[1]);
        this.locationFeatures = response[0];
        this.existingOperators = response[1];
        this.spinner.hide();
      }
    );
  }

  private buildForm(
    fb: FormBuilder,
    locationFeatures: LocationFeatures,
    existingOperators: ExistingOperators
  ): FormGroup {
    const form = fb.group({
      _cellular: fb.array([]),
      _internet: fb.array([]),
      _television: fb.array([]),
      _ats: fb.array([]),
      _radio: fb.array([]),
      _post: fb.array([]),
      _infomat: locationFeatures.location.infomat > 0,
      _comment: null,
    });

    existingOperators.cellular.forEach(() => {
      getArrayGroup(form, '_cellular').push(
        fb.group({
          _operator: null,
          _quality: null,
          _type: null,
          _governmentProgram: null,
          _completed: null,
        })
      );
    });

    existingOperators.internet.forEach(() => {
      getArrayGroup(form, '_internet').push(
        fb.group({
          _operator: null,
          _quality: null,
          _channel: null,
          _governmentProgram: null,
          _completed: null,
        })
      );
    });

    existingOperators.radio.forEach(() => {
      getArrayGroup(form, '_radio').push(
        fb.group({
          _operator: null,
          _quality: null,
          _type: null,
          _governmentProgram: null,
          _completed: null,
        })
      );
    });

    existingOperators.ats.forEach(() => {
      getArrayGroup(form, '_ats').push(
        fb.group({
          _operator: null,
          _quantityPayphone: null,
          _governmentProgram: null,
          _completed: null,
        })
      );
    });

    existingOperators.television.forEach(() => {
      getArrayGroup(form, '_television').push(
        fb.group({
          _operator: null,
          _quality: null,
          _channel: null,
          _governmentProgram: null,
          _completed: null,
        })
      );
    });

    existingOperators.post.forEach(() => {
      getArrayGroup(form, '_post').push(
        fb.group({
          _operator: null,
          _type: null,
          _governmentProgram: null,
          _completed: null,
        })
      );
    });

    form.patchValue(locationFeatures);

    form.valueChanges.subscribe(value => console.log(value));

    form.disable();

    return form;
  }
}

const getArrayGroup = (form: FormGroup, name: string): FormArray => {
  return form.get(name) as FormArray;
};
