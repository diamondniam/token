export interface StoreQuery<T, U> {
  data: T;
  handled: U;
}

export type StoreQueryKeys = keyof StoreQuery<any, any>;
