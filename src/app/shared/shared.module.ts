import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzAutocompleteModule, NzIconModule, NzInputModule, NzSelectModule, NzTreeSelectModule} from 'ng-zorro-antd';

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
import {AutocompleteComponent} from '@shared/layout/nz-autocomplete/autocomplete.component';
import {GroupedAutocompleteComponent} from '@shared/layout/nz-autocomplete/grouped-autocomplete.component';

import {GovernmentProgramComponent} from './layout/value-accessors/government-program.component';
import {MobileGenerationComponent} from './layout/value-accessors/mobile-generation.component';
import {PayphoneFeatureComponent} from './components/providers-row/payphone/payphone-feature.component';
import {AtsFeatureComponent} from './components/providers-row/ats/ats-feature.component';
import { SimpleSelectComponent } from './layout/simple-select/simple-select.component';
import { GroupSelectComponent } from './layout/group-select/group-select.component';

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
    AutocompleteComponent,
    GroupedAutocompleteComponent,
    SimpleSelectComponent,
    GroupSelectComponent,
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
        AutocompleteComponent,
        GroupedAutocompleteComponent,
        SimpleSelectComponent,
        GroupSelectComponent,
    ],
})
export class SharedModule {}
