export class LazyArray<T> {
  array: T[];
  private readonly countPerIteration = 15;
  private readonly timers = {};

  async setItems(items: T[]): Promise<void> {
    Object.keys(this.timers).forEach((t: any) => {
      clearInterval(t);
    });
    this.array = [];
    this.appendBlock(items, 0);
    await this.appendItems(items, 1);
  }

  async appendItems(items: T[], iteration?: number): Promise<void> {
    let defaultIteration = iteration ? iteration : 0;
    while (this.appendBlock(items, defaultIteration)) {
      await new Promise(resolve => {
        const timeout: any = setTimeout(() => {
          resolve();
          delete this.timers[timeout];
        }, 50);
        this.timers[timeout] = timeout;
      });
      defaultIteration++;
    }
    // while (this.countPerIteration * iteration + this.countPerIteration < items.length) {
    //   const arrayBlock = await new Promise<T[]>(resolve => {
    //     const timeout: any = setTimeout(() => {
    //       iteration++;
    //       resolve(items.slice(
    //         this.countPerIteration * (iteration - 1),
    //         this.countPerIteration * (iteration - 1) + this.countPerIteration
    //       ));
    //       delete this.timers[timeout];
    //     }, 50);
    //     this.timers[timeout] = timeout;
    //   });
    //   this.array = [...this.array, ...arrayBlock];
    // }
    // this.array = [...this.array, ...items.slice(this.countPerIteration * iteration, items.length)];
  }

  appendBlock(items: T[], iteration: number): boolean {
    if (this.countPerIteration * iteration + this.countPerIteration < items.length) {
      this.array = [...this.array, ...items.slice(
        this.countPerIteration * (iteration - 1),
        this.countPerIteration * (iteration - 1) + this.countPerIteration
      )];
      return true;
    } else {
      this.array = [...this.array, ...items.slice(this.countPerIteration * iteration, items.length)];
      return false;
    }
  }

  getArray(): T[] {
    return this.array;
  }
}
