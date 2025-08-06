export type HeaderProviderType = {
  children: React.ReactNode;
};

export type HeaderNavbarButtonType = {
  id: string;
  name: string;
  href: string;
  isUpcoming?: boolean;
  isClosed?: boolean;
};

export type HeaderContextType = {
  navbarButtons: HeaderNavbarButtonType[];
  navbarMoreMenu: {
    name: string;
    links: HeaderNavbarButtonType[];
  };
  sideDrawerButtons: HeaderNavbarButtonType[];
};

export type HeaderSideDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};
