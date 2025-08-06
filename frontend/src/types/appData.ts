import type { StoreQuery, StoreQueryKeys } from "@/types/store";
import type { Address, Chain } from "viem";

export type Section = "token" | "preSale" | "buyer";

export type AppDataItemOptions = {
  id: string;
  title: string;
  section: Section;
  format: (value: any) => any;
  formatToText: (value: any, chain: Chain, tokenSymbol: string) => any;
};

export type AppDataHandledItemOptions = {
  id: string;
  title: string;
  formatted: any;
  value: any;
};

export type AppDataSection = {
  id: Section;
  title: string;
  data: AppDataHandledItemOptions[];
};

export type AppDataSkeletonSectionOptions = {
  id: number;
  titleWidth: number;
  data: AppDataSkeletonItemOptions[];
};

export type AppDataSkeletonItemOptions = {
  id: number;
  titleWidth: number;
  valueWidth: number;
};

export type AppDataStoreNFTDataItem = {
  uri: string;
  name: string;
  description: string;
};

export type AppDataStoreNFTData = {
  balance: number;
  totalNFTs: string[];
  NFTsMinted: number;
  items: AppDataStoreNFTDataItem[];
};

export type DtoType = string | Address | number | bigint;

export type AppDataStore = {
  tokenInfo: StoreQuery<DtoType[], AppDataSection[]>;
  addressInfo: StoreQuery<DtoType[], AppDataSection[]>;
  nftInfo: StoreQuery<DtoType | undefined, AppDataStoreNFTData>;

  setTokenInfo: (key: StoreQueryKeys, data: DtoType[] | AppDataSection[]) => void;
  setAddressInfo: (key: StoreQueryKeys, data: DtoType[] | AppDataSection[]) => void;
  setNftInfo: (key: StoreQueryKeys, data: DtoType | AppDataStoreNFTData) => void;
};
