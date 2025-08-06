import type { AppDataSection, AppDataStoreNFTData, DtoType } from "@/types";
import type { UseQueryResult } from "@tanstack/react-query";

export type AppDataContext = {
  tokenInfo: Omit<UseQueryResult<AppDataSection[]>, "refetch"> &
    Pick<UseQueryResult<DtoType[]>, "refetch">;
  addressInfo: Omit<UseQueryResult<AppDataSection[]>, "refetch"> &
    Pick<UseQueryResult<DtoType[]>, "refetch">;
  nftInfo: Omit<UseQueryResult<AppDataStoreNFTData>, "refetch"> &
    Pick<UseQueryResult<DtoType>, "refetch">;
};
export type AppDataProviderProps = {
  children: React.ReactNode;
};
