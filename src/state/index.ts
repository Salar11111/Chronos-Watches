type Listener<T> = (state: T) => void;

class Store<T extends Record<string, unknown>> {
  private state: T;
  private listeners: Set<Listener<T>> = new Set();

  constructor(initial: T) {
    this.state = { ...initial };
  }

  get<K extends keyof T>(key: K): T[K] {
    return this.state[key];
  }

  set<K extends keyof T>(key: K, value: T[K]): void {
    this.state[key] = value;
    this.notify();
  }

  subscribe(listener: Listener<T>): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((fn) => fn(this.state));
  }
}

export const appStore = new Store({
  isLoaded: false,
  isNavOpen: false,
  sliderIndex: 0,
  activeSection: 'hero',
});

export type AppState = typeof appStore extends Store<infer S> ? S : never;
