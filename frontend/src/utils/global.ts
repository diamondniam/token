import { animations, contracts, paths, router } from "@/utils/helpers";
import { theme } from "@/utils/styles";

export const $state = {
  theme,
  router,
  contracts,
  paths,
  animations,
};

export type $Type = typeof $state;

export const $proxy = new Proxy(
  {},
  {
    get(_, key: string) {
      const value = ($state as any)[key];
      if (value === undefined) throw new Error(`$.${key} is not defined`);
      return value;
    },
  },
);

(globalThis as any).$ = $proxy;
