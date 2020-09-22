export abstract class CurrentYearService {
  abstract currentYear(): number;
}

export class CurrentYearServiceImpl implements CurrentYearService {
  private year: number = new Date().getFullYear();

  currentYear(): number {
    return this.year;
  }
}
