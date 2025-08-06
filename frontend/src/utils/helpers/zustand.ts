import { createJSONStorage, type StateStorage } from "zustand/middleware";

export const zustandStorages = {
  session: {
    getItem: (key: string) => {
      const value = window.sessionStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    },
    setItem: (key: string, value: any) => {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: (key: string) => {
      window.sessionStorage.removeItem(key);
    },
  },
};

export function serializeBigInt(storage: StateStorage) {
  return createJSONStorage(() => storage, {
    replacer: (_, value) => {
      if (typeof value === "bigint") {
        return { __type: "bigint", value: value.toString() };
      }
      return value;
    },
    reviver: (_, value) => {
      if (
        typeof value === "object" &&
        value !== null &&
        "__type" in value &&
        (value as any).__type === "bigint"
      ) {
        return BigInt((value as any).value);
      } else {
        return value;
      }
    },
  });
}
