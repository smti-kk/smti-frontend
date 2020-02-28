import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ExistingOperators, LocationFeatures} from '@core/models';
import {TcPivotsService} from '@core/services/tc-pivots.service';
import {ActivatedRoute} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {EnumService} from '@core/services';
import {forkJoin} from 'rxjs';
import {Signal} from '@core/models/signal';

@Component({
  selector: 'app-technical-capabilities',
  templateUrl: './technical-capabilities.component.html',
  styleUrls: ['./technical-capabilities.component.scss'],
})
export class TechnicalCapabilitiesComponent {
  locationFeaturesForm: FormGroup;
  locationFeatures: LocationFeatures;
  existingOperators: ExistingOperators;
  tcId: number;

  Signal = Signal;
  acceptModalVisible: boolean;

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
    this.tcService.save(new LocationFeatures(this.locationFeaturesForm.value)).subscribe(
      (lf: any) => {
        this.tcId = lf.id;
        this.showAcceptModel();
      },
      error => {
        // todo: implement me
      }
    );
  }

  cancelEdit() {
    this.locationFeaturesForm.reset();
    this.locationFeaturesForm.patchValue(this.locationFeatures);
    this.locationFeaturesForm.disable();
  }

  accept() {
    this.tcService.accept(this.tcId).subscribe(
      () => {
        this.reloadPage();
      },
      error => {
        // todo: implement me
      }
    );
  }

  reject() {
    this.tcService.reject(this.tcId).subscribe(
      () => {
        this.reloadPage();
      },
      error => {
        // todo: implement me
      }
    );
  }

  private showAcceptModel() {
    this.acceptModalVisible = true;
  }

  public hideAcceptModel() {
    this.acceptModalVisible = false;
  }

  private loadTechnicalCapability(id: number): void {
    this.spinner.show();

    forkJoin(this.tcService.one(id), this.enumService.getExistingOperators()).subscribe(
      response => {
        this.existingOperators = response[1].sortByLocationFeatures(response[0]); // todo kludge
        this.locationFeatures = response[0];

        this.locationFeaturesForm = this.buildForm(
          this.fb,
          this.locationFeatures,
          this.existingOperators
        );
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
      _location: locationFeatures.location.id,
      _cellular: fb.array([]),
      _internet: fb.array([]),
      _television: fb.array([]),
      _ats: fb.array([]),
      _radio: fb.array([]),
      _post: fb.array([]),
      _infomat: locationFeatures.location.infomat > 0,
      _comment: null,
      _id: null,
    });

    existingOperators.cellular.forEach(() => {
      const group = this.createGroup(
        {
          _operator: null,
          _quality: null,
          _type: null,
          _governmentProgram: null,
          _completed: null,
          _id: null,
        },
        ['_quality', '_type', '_governmentProgram', '_completed']
      );

      getArrayGroup(form, '_cellular').push(group);
    });

    existingOperators.internet.forEach(() => {
      const group = this.createGroup(
        {
          _operator: null,
          _quality: null,
          _channel: null,
          _governmentProgram: null,
          _completed: null,
          _id: null,
        },
        ['_quality', '_channel', '_governmentProgram', '_completed']
      );

      getArrayGroup(form, '_internet').push(group);
    });

    existingOperators.radio.forEach(() => {
      const group = this.createGroup(
        {
          _operator: null,
          _quality: null,
          _type: null,
          _governmentProgram: null,
          _completed: null,
          _id: null,
        },
        ['_type', '_quality', '_completed']
      );

      getArrayGroup(form, '_radio').push(group);
    });

    existingOperators.ats.forEach(() => {
      const group = this.createGroup(
        {
          _operator: null,
          _quantityPayphone: null,
          _governmentProgram: null,
          _completed: null,
          _id: null,
          _quality: null,
        },
        ['_quality', '_completed']
      );

      getArrayGroup(form, '_ats').push(group);
    });

    existingOperators.television.forEach(() => {
      const group = this.createGroup(
        {
          _operator: null,
          _quality: null,
          _type: null,
          _governmentProgram: null,
          _completed: null,
          _id: null,
        },
        ['_type', '_quality', '_completed']
      );

      getArrayGroup(form, '_television').push(group);
    });

    existingOperators.post.forEach(() => {
      getArrayGroup(form, '_post').push(
        fb.group({
          _operator: null,
          _type: null,
          _governmentProgram: null,
          _completed: null,
          _id: null,
        })
      );
    });

    form.patchValue(locationFeatures);
    form.disable();
    form.valueChanges.subscribe(v => {
      console.log(v);
    });
    return form;
  }

  // noinspection JSMethodCanBeStatic
  private reloadPage() {
    window.location.reload();
  }

  private createGroup(allFields: any, editableFields: string[]): FormGroup {
    const group = this.fb.group(allFields);

    group.valueChanges.subscribe(v => {
      if (v && !v._operator && group.parent.enabled) {
        group.reset({}, {emitEvent: false});

        editableFields.forEach(f => {
          if (!group.get(f)) {
            console.log(group, f);
          }
          group.get(f).disable({emitEvent: false});
        });
      } else if (v && v._operator && group.parent.enabled) {
        editableFields.forEach(f => {
          if (!group.get(f)) {
            console.log(group, f);
          }
          group.get(f).enable({emitEvent: false});
        });
      }
    });

    return group;
  }
}

const getArrayGroup = (form: FormGroup, name: string): FormArray => {
  return form.get(name) as FormArray;
};
