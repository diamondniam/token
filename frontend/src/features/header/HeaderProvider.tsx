import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { HeaderContextType, HeaderProviderType } from "@/features/header/types/header";
import { usePreSale } from "@/pages";

import { getNeccessaryRoutes } from "@/utils/helpers";

const Context = createContext<HeaderContextType | null>(null);

const Provider = ({ children }: HeaderProviderType) => {
  const { isClosed: isPreSaleClosed } = usePreSale();

  const isInitialized = useRef(false);
  const [necessaryLinks, setNecessaryLinks] = useState<string[]>([
    "about",
    "home",
    "preSale",
    "stake",
  ]);

  const navbarButtons = useMemo(() => {
    return getNeccessaryRoutes(necessaryLinks).map((link) => ({
      id: link.id,
      name: link.name,
      href: link.path,
      isUpcoming: link.id === "stake" ? !isPreSaleClosed : false,
      isClosed: link.id === "preSale" ? isPreSaleClosed : false,
    }));
  }, [necessaryLinks, isPreSaleClosed]);

  const navbarMoreMenu = {
    name: "More",
    links: getNeccessaryRoutes(["about"]).map((link) => ({
      id: link.id,
      name: link.name,
      href: link.path,
    })),
  };

  const sideDrawerButtons = navbarButtons;

  useEffect(() => {
    if (isPreSaleClosed) {
      setNecessaryLinks(["about", "home", "stake", "nfts"]);
    } else {
      setNecessaryLinks(["about", "home", "preSale", "stake"]);
    }
  }, [isPreSaleClosed]);

  const init = () => {
    if (!isInitialized.current) {
      if (isPreSaleClosed) {
        setNecessaryLinks(["about", "home", "stake", "nfts"]);
      }

      isInitialized.current = true;
    }
  };

  init();

  return (
    <Context.Provider value={{ navbarButtons, navbarMoreMenu, sideDrawerButtons }}>
      {children}
    </Context.Provider>
  );
};

const useHeader = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }

  return context;
};

export default Provider;

export { useHeader };
