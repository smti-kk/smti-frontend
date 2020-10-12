import {OperatorIcon} from './OperatorIcon';
import {PostType} from '@api/dto/PostType';
import {ShortTechnicalCapability} from '@api/dto/ShortTechnicalCapability';

export class PostIcon extends OperatorIcon {
  readonly postType: PostType;

  constructor(id: number,
              state: boolean,
              iconUrl: string,
              name: string,
              govYearComplete: number,
              postType: PostType,
              tc: ShortTechnicalCapability) {
    super(id, state, iconUrl, name, govYearComplete, tc);
    this.postType = postType;
  }
}
