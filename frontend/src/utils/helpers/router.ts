import { Home, About, PreSale, Stake, NFTs } from "@/pages";

export type RouteOptions = {
  id: string;
  name: string;
  path: string;
  element: any;
};

export const routes = {
  main: [
    {
      id: "home",
      path: "/",
      name: "Home",
      element: Home,
    },
    { id: "about", name: "About", path: "/about", element: About },
    // { id: "swap", name: "Swap", path: "/swap", element: Home },
    // { id: "gallery", name: "Gallery", path: "/gallery", element: Home },
    // { id: 'erc20Balance', name: 'ERC20Balance', path: "/erc20balance", element: ERC20Balance, },
    // { id: 'ramper', name: 'Ramper', path: "/onramp", element: Ramper, },
    // {
    //   id: "transactions",
    //   name: "Transactions",
    //   path: "/transactions",
    //   element: Home,
    // },
    { id: "preSale", name: "Pre-Sale", path: "/pre-sale", element: PreSale },
    // { id: "mint", name: "Mint", path: "/mint", element: Home },
    { id: "stake", name: "Stake", path: "/stake", element: Stake },
    { id: "nfts", name: "NFTs", path: "/nfts", element: NFTs },
    // { id: "whitepaper", name: "Whitepaper", path: "/whitepaper", element: Home },
    // {
    //   id: "nonAuthenticated",
    //   name: "Non Authenticated",
    //   path: "/nonauthenticated",
    //   element: Home,
    // },
  ],
} as const;

export function getNeccessaryRoutes(necessaryLinks: string[]) {
  return routes.main.filter((route) => necessaryLinks.includes(route.id));
}

export function getRoute(id: string, type: keyof typeof routes = "main") {
  return routes[type].find((route) => route.id === id);
}

export const router = {
  routes,
  getNeccessaryRoutes,
  getRoute,
};
