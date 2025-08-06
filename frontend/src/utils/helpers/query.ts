import type { UseQueryResult } from "@tanstack/react-query";

export function mergeQueries<T, U>(a: UseQueryResult<T>, b: UseQueryResult<U>) {
  let result: UseQueryResult<T> = {} as any;

  for (const key of Object.keys(a)) {
    if (!["data"].includes(key)) {
      // @ts-ignore
      result[key] = a[key] || b[key];
    } else {
      // @ts-ignore
      result[key] = a[key];
    }
  }

  return result;
}
