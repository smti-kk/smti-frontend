import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  NzAutocompleteModule,
  NzCheckboxModule,
  NzFormModule,
  NzIconModule,
  NzInputModule, NzRadioModule,
  NzSelectModule,
  NzTreeSelectModule,
} from 'ng-zorro-antd';

import {FilterBtnComponent} from '@shared/layout/value-accessors/filter-btn/filter-btn.component';
import {CellularFeatureComponent} from '@shared/components/providers-row/cellular/cellular-feature.component';
import {OperatorIconComponent} from '@shared/components/providers-row/operator-icon.component';
import {InternetFeatureComponent} from '@shared/components/providers-row/internet/internet-feature.component';
import {RadioFeatureComponent} from '@shared/components/providers-row/radio/radio-feature.component';
import {TelevisionFeatureComponent} from '@shared/components/providers-row/television/television-feature.component';
import {SimpleCheckbox} from '@shared/layout/simple-checkbox/simple-checkbox.component';
import {StaticTextControl} from '@shared/layout/static-control-text/static-text-control.component';
import {AccordionGroupComponent} from '@shared/layout/accordion/accordion-group.component';
import {AccordionComponent} from '@shared/layout/accordion/accordion.component';
import {AccordionHeaderComponent} from '@shared/layout/accordion/accordion-header.component';
import {QualityComponent} from '@shared/layout/value-accessors/quality.component';
import {TrunkChannelComponent} from '@shared/layout/value-accessors/trunk-channel.component';

import {GovernmentProgramComponent} from './layout/value-accessors/government-program.component';
import {MobileGenerationComponent} from './layout/value-accessors/mobile-generation.component';
import {PayphoneFeatureComponent} from './components/providers-row/payphone/payphone-feature.component';
import {AtsFeatureComponent} from './components/providers-row/ats/ats-feature.component';
import {SimpleSelectComponent} from './layout/simple-select/simple-select.component';
import {GroupSelectComponent} from './layout/group-select/group-select.component';
import {FormOrganizationComponent} from './components/form-organization/form-organization.component';
import {FormAccessPointComponent} from './components/form-access-point/form-access-point.component';
import {FomMonitoringWizardComponent} from './components/fom-monitoring-wizard/fom-monitoring-wizard.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FilterPipe} from "../../directives/filter.pipe";
import {PermissionsDirective} from './../../directives/permissions.directive';
import {CustomSubmitDirective} from './../../directives/custom-submit.directive';

@NgModule({
  declarations: [
    FilterBtnComponent,
    CellularFeatureComponent,
    InternetFeatureComponent,
    OperatorIconComponent,
    AtsFeatureComponent,
    PayphoneFeatureComponent,
    RadioFeatureComponent,
    TelevisionFeatureComponent,
    SimpleCheckbox,
    StaticTextControl,
    AccordionGroupComponent,
    AccordionComponent,
    AccordionHeaderComponent,
    MobileGenerationComponent,
    GovernmentProgramComponent,
    QualityComponent,
    TrunkChannelComponent,
    SimpleSelectComponent,
    GroupSelectComponent,
    FormOrganizationComponent,
    FormAccessPointComponent,
    FomMonitoringWizardComponent,
    FilterPipe,
    PermissionsDirective,
    CustomSubmitDirective,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NzAutocompleteModule,
    NzInputModule,
    NzIconModule,
    NzTreeSelectModule,
    FormsModule,
    NzSelectModule,
    NzFormModule,
    NzCheckboxModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatCheckboxModule,
    NzRadioModule,
  ],
  providers: [],
  exports: [
    SimpleCheckbox,
    StaticTextControl,
    FilterBtnComponent,
    AccordionComponent,
    AtsFeatureComponent,
    RadioFeatureComponent,
    OperatorIconComponent,
    AccordionGroupComponent,
    PayphoneFeatureComponent,
    CellularFeatureComponent,
    InternetFeatureComponent,
    TelevisionFeatureComponent,
    AccordionHeaderComponent,
    MobileGenerationComponent,
    GovernmentProgramComponent,
    QualityComponent,
    TrunkChannelComponent,
    SimpleSelectComponent,
    GroupSelectComponent,
    FormOrganizationComponent,
    FilterPipe,
    PermissionsDirective,
    CustomSubmitDirective
  ],
})
export class SharedModule {}
