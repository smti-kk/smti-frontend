import {OperatorIcon} from './OperatorIcon';
import {PostType} from '@api/dto/PostType';

export class PostIcon extends OperatorIcon {
  readonly postType: PostType;

  constructor(id: number,
              state: boolean,
              iconUrl: string,
              name: string,
              govYearComplete: number,
              postType: PostType) {
    super(id, state, iconUrl, name, govYearComplete);
    this.postType = postType;
  }
}
