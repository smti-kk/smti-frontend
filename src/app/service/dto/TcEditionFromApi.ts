import {TcEdition, TechnicalCapabilityEdition} from './TechnicalCapabilityEdition';
import {LocationDetail, WriteableLocation} from '@api/dto/LocationDetail';
import {WriteableTechnicalCapability} from '@api/dto/ShortTechnicalCapability';

export class TcEditionFromApi extends TechnicalCapabilityEdition {
  constructor(location: LocationDetail) {
    super(
      location.id,
      location.type,
      location.name,
      location.population,
      location.locationParent,
      location.organizations,
      new TcEdition([], 1),
      new TcEdition([], 1),
      new TcEdition([], 1),
      new TcEdition([], 1),
      new TcEdition([], 1),
      new TcEdition([], 1),
      new TcEdition([], 1),
      new TcEdition([], 1),
    );
    location.technicalCapabilities.forEach(tc => {
      switch (tc.type) {
        case 'ATS':
          this.telephone.tcs[tc.operatorId] = {
            govProgramId: tc.governmentDevelopmentProgram ? tc.governmentDevelopmentProgram.id : null,
            typeId: null,
            id: tc.id,
            locationId: tc.locationId
          };
          break;
        case 'INET':
          this.internet.tcs[tc.operatorId] = {
            govProgramId: tc.governmentDevelopmentProgram ? tc.governmentDevelopmentProgram.id : null,
            typeId: tc.trunkChannel ? tc.trunkChannel.id : null,
            id: tc.id,
            locationId: tc.locationId
          };
          break;
        case 'MOBILE':
          this.cellular.tcs[tc.operatorId] = {
            govProgramId: tc.governmentDevelopmentProgram ? tc.governmentDevelopmentProgram.id : null,
            typeId: tc.typeMobile ? tc.typeMobile.id : null,
            id: tc.id,
            locationId: tc.locationId
          };
          break;
        case 'TV':
          this.tv.tcs[tc.operatorId] = {
            govProgramId: tc.governmentDevelopmentProgram ? tc.governmentDevelopmentProgram.id : null,
            typeId: tc.typeMobile ? tc.typeMobile.id : null,
            id: tc.id,
            locationId: tc.locationId
          };
          break;
        case 'RADIO':
          this.radio.tcs[tc.operatorId] = {
            govProgramId: tc.governmentDevelopmentProgram ? tc.governmentDevelopmentProgram.id : null,
            typeId: tc.typeMobile ? tc.typeMobile.id : null,
            id: tc.id,
            locationId: tc.locationId
          };
          break;
        case 'POST':
          this.post.tcs[tc.operatorId] = {
            govProgramId: tc.governmentDevelopmentProgram ? tc.governmentDevelopmentProgram.id : null,
            typeId: tc.typeMobile ? tc.typeMobile.id : null,
            id: tc.id,
            locationId: tc.locationId
          };
          break;
      }
    });
  }

  toWriteableLocation(): WriteableLocation {
    const tcsApi: WriteableTechnicalCapability[] = [];
    Object.keys(this.cellular.tcs).forEach((operatorId: any) => {
      tcsApi.push({
        id: this.cellular.tcs[operatorId].id,
        operatorId,
        trunkChannel: null,
        typeMobile: this.cellular.tcs[operatorId].typeId,
        governmentDevelopmentProgram: this.cellular.tcs[operatorId].govProgramId,
        type: 'MOBILE',
        locationId: this.cellular.tcs[operatorId].locationId
      });
    });
    return {
      technicalCapabilities: tcsApi,
      id: this.id,
      locationParent: this.locationParent,
      type: this.type,
      name: this.name,
      organizations: this.organizations,
      population: this.population,
    };
  }
}
