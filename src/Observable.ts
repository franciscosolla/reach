import { useEffect, useState } from "react";

export default class Observable<IValue> {
  private _value: IValue;

  constructor(initialValue: IValue) {
    this._value = initialValue;
  }

  private _subscribers: Set<(value: IValue) => void> = new Set();

  subscribe = (callback: (value: IValue) => void) => {
    this._subscribers.add(callback);
    callback(this._value);
    return () => this.unsubscribe(callback);
  };

  unsubscribe = (callback: (value: IValue) => void) => {
    this._subscribers.delete(callback);
  };

  get value() {
    return this._value;
  }

  setValue = (value: IValue) => {
    if (this._value !== value) {
      this._value = value;
      this._subscribers.forEach((callback) => callback(value));
    }
  };
}

export function useObservable<IValue>(
  observable: Observable<IValue>,
): [IValue, (value: IValue) => void] {
  const [value, setValue] = useState(observable.value);
  useEffect(() => observable.subscribe(setValue), [observable]);
  return [value, observable.setValue];
}
