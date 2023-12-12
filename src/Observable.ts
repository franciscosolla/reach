import { useEffect, useState } from "react";

/**
 * Observable class to handle state and its subscribers.
 * @template IValue - The type of the value this observable holds.
 */
export default class Observable<IValue> {
  private _value: IValue;

  /**
   * Creates an Observable instance with an initial value.
   * @param {IValue} initialValue - The initial value of the observable.
   */
  constructor(initialValue: IValue) {
    this._value = initialValue;
  }

  private _subscribers: Set<(value: IValue) => void> = new Set();

  /**
   * Subscribes a callback to this observable.
   * The callback will be invoked with the current value immediately, and again whenever the value changes.
   * @param {(value: IValue) => void} callback - Function to call when the value changes.
   * @returns {() => void} A function to unsubscribe the callback.
   */
  subscribe = (callback: (value: IValue) => void) => {
    this._subscribers.add(callback);
    callback(this._value);
    return () => this.unsubscribe(callback);
  };

  /**
   * Unsubscribes a callback from this observable.
   * @param {(value: IValue) => void} callback - The callback function to unsubscribe.
   */
  unsubscribe = (callback: (value: IValue) => void) => {
    this._subscribers.delete(callback);
  };

  /**
   * Getter for the current value of the observable.
   * @returns {IValue} The current value.
   */
  get value() {
    return this._value;
  }

  /**
   * Sets a new value for the observable and notifies subscribers.
   * @param {IValue} value - The new value to set.
   */
  setValue = (value: IValue) => {
    if (this._value !== value) {
      this._value = value;
      this._subscribers.forEach((callback) => callback(value));
    }
  };
}

/**
 * Custom hook to use an Observable in React components.
 * Returns the current value of the observable and a setter function.
 * @template IValue - The type of the value the observable holds.
 * @param {Observable<IValue>} observable - The observable to subscribe to.
 * @returns {[IValue, (value: IValue) => void]} The current value and a setter function.
 */
export function useObservable<IValue>(
  observable: Observable<IValue>,
): [IValue, (value: IValue) => void] {
  const [value, setValue] = useState(observable.value);

  useEffect(() => {
    const unsubscribe = observable.subscribe(setValue);
    return unsubscribe;
  }, [observable]);

  return [value, observable.setValue];
}
