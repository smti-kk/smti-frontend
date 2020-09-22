export class Paginator<T> {
  private readonly array: T[];

  constructor(array: T[]) {
    this.array = array;
  }

  page(page: number, size: number): T[] {
    if (page > this.array.length) {
      return [];
    }
    if (size * page + size > this.array.length) {
      return this.array.slice(page * size, this.array.length);
    }
    return this.array.slice(page * size, page * size + size);
  }

  totalElements(): number {
    return this.array.length;
  }

  allElements(): T[] {
    return this.array;
  }
}
