export class LazyArray<T> {
  array: T[];
  private readonly countPerIteration = 10;
  private readonly timers = {};

  async setItems(items: T[]): Promise<void> {
    this.array = [];
    if (this.countPerIteration < items.length) {
      items.slice(
        0,
        this.countPerIteration
      );
    }
    Object.keys(this.timers).forEach((t: any) => {
      clearInterval(t);
    });
    await this.appendItems(items);
  }

  async appendItems(items: T[]): Promise<void> {
    let iteration = 0;
    while (this.countPerIteration * iteration + this.countPerIteration < items.length) {
      const arrayBlock = await new Promise<T[]>(resolve => {
        const timeout: any = setTimeout(() => {
          iteration++;
          resolve(items.slice(
            this.countPerIteration * (iteration - 1),
            this.countPerIteration * (iteration - 1) + this.countPerIteration
          ));
          delete this.timers[timeout];
        }, 50);
        this.timers[timeout] = timeout;
      });
      this.array = [...this.array, ...arrayBlock];
    }
    this.array = [...this.array, ...items.slice(this.countPerIteration * iteration, items.length)];
  }

  getArray(): T[] {
    return this.array;
  }
}
