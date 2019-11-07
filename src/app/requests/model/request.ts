export enum RequestState {
  ACCEPTED,
  CONSIDERED
}

export const requestStateLabel = (requestState: RequestState): string => {
  switch (requestState) {
    case RequestState.ACCEPTED:
      return 'на рассмотрении';
    case RequestState.CONSIDERED:
      return 'заявка принята';
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
