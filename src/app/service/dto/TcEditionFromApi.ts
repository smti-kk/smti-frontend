import {TcEdition, TechnicalCapabilityEdition} from './TechnicalCapabilityEdition';
import {LocationDetail, LocationFeaturesSaveRequest, LocationParent} from '@api/dto/LocationDetail';
import {ShortTechnicalCapability, WriteableTechnicalCapability} from '@api/dto/ShortTechnicalCapability';
import {TechnicalCapabilityType} from '@api/dto/TechnicalCapabilityType';
import {OrganizationForTable} from "@api/dto/OrganizationForTable";

export class TcEditionFromApi extends TechnicalCapabilityEdition {
  constructor(location: LocationDetail) {
    super(
      location.id,
      location.type,
      location.name,
      location.population,
      location.locationParent,
      location.organizations,
      new TcEdition([], 'MOBILE'),
      new TcEdition([], 'INET'),
      new TcEdition([], 'TV'),
      new TcEdition([], 'ATS'),
      new TcEdition([], 'POST'),
      new TcEdition([], 'PAYPHONE'),
      new TcEdition([], 'RADIO'),
      new TcEdition([], 'INFOMAT'),
    );
    location.technicalCapabilities.forEach(tc => {
      switch (tc.type) {
        case 'ATS':
          this.telephone.tcs[tc.operatorId] = this.writableFeatureFromShort(tc);
          break;
        case 'INET':
          this.internet.tcs[tc.operatorId] = this.writableFeatureFromShort(tc);
          break;
        case 'MOBILE':
          this.cellular.tcs[tc.operatorId] = this.writableFeatureFromShort(tc);
          break;
        case 'TV':
          this.tv.tcs[tc.operatorId] = this.writableFeatureFromShort(tc);
          break;
        case 'RADIO':
          this.radio.tcs[tc.operatorId] = this.writableFeatureFromShort(tc);
          break;
        case 'POST':
          this.post.tcs[tc.operatorId] = this.writableFeatureFromShort(tc);
          break;
        case 'PAYPHONE':
          this.payphone.tcs[tc.operatorId] = this.writableFeatureFromShort(tc);
          break;
        case 'INFOMAT':
          this.infomat.tcs[tc.operatorId] = this.writableFeatureFromShort(tc);
          break;
      }
    });
  }

  writableFeatureFromShort(short: ShortTechnicalCapability): WriteableTechnicalCapability {
    return {
      quality: short.quality,
      type: short.type,
      governmentDevelopmentProgram: short.governmentDevelopmentProgram ? short.governmentDevelopmentProgram.id : null,
      operatorId: short.operatorId,
      locationId: short.locationId,
      trunkChannel: short.trunkChannel ? short.trunkChannel.id : null,
      typeMobile: short.typeMobile ? short.typeMobile.id : null,
      id: short.id,
      govYearComplete: short.govYearComplete,
      tvOrRadioTypes: short.tvOrRadioTypes,
      typePost: short.typePost ? short.typePost.id : null,
      state: short.state,
      payphones: short.payphones
    };
  }

  toLocationFeaturesSaveRequest(): LocationFeaturesSaveRequest {
    const tcsApi: WriteableTechnicalCapability[] = [
      ...this.mapEditionToWriteableTechnicalCapability(this.cellular, 'MOBILE'),
      ...this.mapEditionToWriteableTechnicalCapability(this.telephone, 'ATS'),
      ...this.mapEditionToWriteableTechnicalCapability(this.radio, 'RADIO'),
      ...this.mapEditionToWriteableTechnicalCapability(this.tv, 'TV'),
      ...this.mapEditionToWriteableTechnicalCapability(this.payphone, 'PAYPHONE'),
      ...this.mapEditionToWriteableTechnicalCapability(this.infomat, 'INFOMAT'),
      ...this.mapEditionToWriteableTechnicalCapability(this.internet, 'INET'),
      ...this.mapEditionToWriteableTechnicalCapability(this.post, 'POST'),
    ];
    return {
      features: tcsApi,
      comment: ''
    };
  }

  mapEditionToWriteableTechnicalCapability(edition: TcEdition, type: TechnicalCapabilityType): WriteableTechnicalCapability[] {
    return Object.keys(edition.tcs).map((operatorId: any) => {
      return {
        id: edition.tcs[operatorId].id,
        operatorId,
        trunkChannel: edition.tcs[operatorId].trunkChannel,
        typeMobile: edition.tcs[operatorId].typeMobile,
        governmentDevelopmentProgram: edition.tcs[operatorId].governmentDevelopmentProgram,
        type,
        quality: edition.tcs[operatorId].quality,
        locationId: edition.tcs[operatorId].locationId,
        govYearComplete: edition.tcs[operatorId].govYearComplete,
        tvOrRadioTypes: edition.tcs[operatorId].tvOrRadioTypes,
        typePost: edition.tcs[operatorId].typePost,
        state: edition.tcs[operatorId].state,
        payphones: edition.tcs[operatorId].payphones,
      };
    });
  }
}
