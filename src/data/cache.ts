interface ICache<DataType> {
  data: DataType;
  updatedAt: number;
}

export class Cache<DataType> {
  private cache = new Map<string, ICache<DataType>>();

  constructor() {}

  forEach(callback: (cache: ICache<DataType>, key: string) => void) {
    this.cache.forEach(callback);
  }

  add(key: string, data: DataType) {
    const value: ICache<DataType> = {
      data,
      updatedAt: Date.now(),
    };

    this.cache.set(key, value);
  }

  remove(key: string) {
    this.cache.delete(key);
  }
}