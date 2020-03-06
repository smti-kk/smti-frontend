export enum RequestState {
  ACCEPTED,
  CONSIDERED,
}

export const requestStateLabel = (requestState: RequestState): string => {
  switch (requestState) {
    case RequestState.ACCEPTED:
      return 'заявка принята';
    case RequestState.CONSIDERED:
      return 'на рассмотрении';
    default:
      throw Error(`unknown RequestState ${requestState}`);
  }
};

export class Request {
  id: string;

  date: string;

  changes: {
    object: string;
    action: string;
  }[];

  state: RequestState;
}
