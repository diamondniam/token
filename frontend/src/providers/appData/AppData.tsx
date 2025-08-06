import { createContext, useContext, useEffect, useRef } from "react";

import { useAccount, useAccountEffect } from "wagmi";
import { useAllowedChain, useReadContract } from "@/utils/hooks";
import { useQuery } from "@tanstack/react-query";

import { useAppData as useAppDataStore, useErrors } from "@/stores";

import { createClient, http } from "viem";
import { readContract } from "viem/actions";
import {
  addressInfoMap,
  stringifiedEqual,
  getFallbackChain,
  getSymbol,
  handleTokenInfo,
  tokenInfoMap,
  mergeQueries,
} from "@/utils/helpers";

import type {
  AppDataSection,
  AppDataStoreNFTData,
  AppDataStoreNFTDataItem,
  Chain,
  ChainStringId,
  DtoType,
} from "@/types";
import type { AppDataContext, AppDataProviderProps } from "@/providers/appData/types";

import $nfts from "@/assets/data/pages/nfts.json";

const Context = createContext<AppDataContext | null>(null);

export default function AppDataProvider({ children }: AppDataProviderProps) {
  const { address, chain: wagmiChain } = useAccount();
  const { data: chain } = useAllowedChain({ chain: wagmiChain });
  const {
    tokenInfo: tokenInfoStore,
    setTokenInfo: setTokenInfoStore,
    addressInfo: addressInfoStore,
    setAddressInfo: setAddressInfoStore,
    nftInfo: nftInfoStore,
    setNftInfo: setNftInfoStore,
  } = useAppDataStore();
  const { setIsSomethingWrong } = useErrors();
  const isInitialized = useRef(false);
  const initialAddress = useRef<string | null>(null);

  const readTokenInfo = useReadContract<DtoType[]>({
    contractName: "token",
    fn: "getOverview",
    query: {
      initialData: tokenInfoStore.data,
    },
  });

  const readAddressInfo = useReadContract<DtoType[]>({
    chain,
    contractName: "token",
    fn: "getAddressInfo",
    args: [address!],
    query: {
      enabled: !!address && !!chain,
      initialData: addressInfoStore.data,
    },
  });

  const readNftBalance = useReadContract<DtoType>({
    chain,
    contractName: "nft",
    fn: "balanceOf",
    args: [address!],
    query: {
      enabled: !!address && !!chain,
      initialData: nftInfoStore.data,
    },
  });

  const tokenInfo = useQuery<AppDataSection[]>({
    queryKey: ["tokenInfo", chain?.id],
    queryFn: async () => {
      try {
        const symbol = getSymbol(readTokenInfo.data!);
        const _chain = chain || getFallbackChain()!;

        const handledTokenInfo = handleTokenInfo(readTokenInfo.data!, tokenInfoMap, _chain, symbol);

        setTokenInfoStore("handled", handledTokenInfo);
        return handledTokenInfo;
      } catch (err) {
        setIsSomethingWrong("Failed to fetch token info");
        throw err;
      }
    },
    initialData: tokenInfoStore.handled,
    enabled: false,
  });

  const addressInfo = useQuery<AppDataSection[]>({
    queryKey: ["addressInfo", chain?.id],
    queryFn: async () => {
      try {
        const symbol = getSymbol(readTokenInfo.data!);
        const handledAddressInfo = handleTokenInfo(
          readAddressInfo.data!,
          addressInfoMap,
          chain!,
          symbol,
        );

        setAddressInfoStore("handled", handledAddressInfo);
        return handledAddressInfo;
      } catch (err) {
        setIsSomethingWrong("Failed to fetch address info");
        throw err;
      }
    },
    initialData: addressInfoStore.handled,
    enabled: false,
  });

  const nftInfo = useQuery<AppDataStoreNFTData>({
    queryKey: ["nftInfo", chain?.id],
    queryFn: async () => {
      try {
        const _chain = chain || getFallbackChain()!;
        const NFTsMinted = await fetchNFTsMinted({ chain: _chain });
        const totalNFTs = await fetchTotalNFTs({ chain: _chain });

        if (chain) {
          const items = await fetchNftItems({ data: readNftBalance.data, chain: chain! });

          setNftInfoStore("handled", {
            balance: readNftBalance.data as number,
            NFTsMinted,
            totalNFTs,
            items,
          });

          return {
            balance: readNftBalance.data as number,
            NFTsMinted,
            totalNFTs,
            items,
          };
        } else {
          return {
            balance: 0,
            NFTsMinted,
            totalNFTs,
            items: [],
          };
        }
      } catch (err) {
        setIsSomethingWrong("Failed to fetch NFT info");
        throw err;
      }
    },
    initialData: nftInfoStore.handled,
    enabled: false,
  });

  useEffect(() => {
    if (readTokenInfo.data) {
      const isChanged = !stringifiedEqual(readTokenInfo.data, tokenInfoStore.data);

      if (isChanged || !tokenInfo.data.length) {
        tokenInfo.refetch();
        setTokenInfoStore("data", readTokenInfo.data);
      }
    }
  }, [readTokenInfo.data]);

  useEffect(() => {
    if (readAddressInfo.data?.length && tokenInfo.data.length && chain && address) {
      const isChanged = !stringifiedEqual(readAddressInfo.data, addressInfoStore.data);

      if (isChanged || !addressInfo.data.length) {
        addressInfo.refetch();
        setAddressInfoStore("data", readAddressInfo.data);
      }
    }
  }, [readAddressInfo.data, tokenInfo.data, chain, address]);

  useEffect(() => {
    if (readNftBalance.data !== undefined) {
      const isChanged = !stringifiedEqual(readNftBalance.data, nftInfoStore.data);

      if (isChanged || nftInfo.data === undefined) {
        nftInfo.refetch();
        setNftInfoStore("data", readNftBalance.data);
      }
    }
  }, [readNftBalance.data, chain, address]);

  useEffect(() => {
    if (chain) {
      if (readNftBalance.isError) {
        setIsSomethingWrong("Failed to fetch NFT info");
      } else if (readAddressInfo.isError) {
        setIsSomethingWrong("Failed to fetch address info");
      } else if (readTokenInfo.isError) {
        setIsSomethingWrong("Failed to fetch token info");
      }
    }
  }, [readNftBalance.isError, readAddressInfo.isError, readTokenInfo.isError]);

  useEffect(() => {
    if (!isInitialized.current && address) {
      initialAddress.current = address || "QWEQEQW";
      isInitialized.current = true;
    }

    if (address !== initialAddress.current) {
      setAddressInfoStore("handled", []);
      setNftInfoStore("handled", { ...nftInfoStore.handled, balance: 0, items: [] });
      setNftInfoStore("data", 0);
    }
  }, [address]);

  useEffect(() => {
    if (!chain) {
      setAddressInfoStore("data", []);
      setAddressInfoStore("handled", []);
      setNftInfoStore("handled", { ...nftInfoStore.handled, balance: 0, items: [] });
      setNftInfoStore("data", 0);
    }
  }, [chain]);

  const fetchNftItems = async ({
    data,
    chain,
  }: {
    data: any;
    chain: Chain;
  }): Promise<AppDataStoreNFTDataItem[]> => {
    return new Promise(async (resolve, reject) => {
      const items: AppDataStoreNFTDataItem[] = [];

      const client = createClient({
        chain: chain,
        transport: http(chain.rpcUrls.default.http[0]),
      });
      const contractAddress = $.contracts[chain.stringId as ChainStringId].nft.address;
      const contractAbi = $.contracts[chain.stringId as ChainStringId].nft.abi;

      for (let i = 0; i < Number(data); i++) {
        try {
          const tokenId = await readContract(client, {
            address: contractAddress,
            abi: contractAbi,
            functionName: "tokenOfOwnerByIndex",
            args: [address, i],
          });

          const uri = await readContract(client, {
            address: contractAddress,
            abi: contractAbi,
            functionName: "tokenURI",
            args: [tokenId],
          });

          const item = $nfts.items.find((nft) => nft.uri === uri);

          if (item) {
            items.push(item);
          } else {
            console.error("No matching NFT found");
            reject("Failed to fetch NFT info");
          }
        } catch (err) {
          console.error(err);
          reject("Failed to fetch NFT info");
        }
      }

      resolve(items);
    });
  };

  const fetchNFTsMinted = async ({ chain }: { chain: Chain }): Promise<number> => {
    return new Promise(async (resolve, reject) => {
      const client = createClient({
        chain: chain,
        transport: http(chain.rpcUrls.default.http[0]),
      });
      const contractAddress = $.contracts[chain.stringId as ChainStringId].nft.address;
      const contractAbi = $.contracts[chain.stringId as ChainStringId].nft.abi;

      try {
        const minted = await readContract(client, {
          address: contractAddress,
          abi: contractAbi,
          functionName: "totalSupply",
          args: [],
        });

        resolve(Number(minted));
      } catch (err) {
        console.error(err);
        reject("Failed to fetch NFT info");
      }
    });
  };

  const fetchTotalNFTs = async ({ chain }: { chain: Chain }): Promise<string[]> => {
    return new Promise(async (resolve, reject) => {
      const client = createClient({
        chain: chain,
        transport: http(chain.rpcUrls.default.http[0]),
      });
      const contractAddress = $.contracts[chain.stringId as ChainStringId].nft.address;
      const contractAbi = $.contracts[chain.stringId as ChainStringId].nft.abi;

      try {
        const total = await readContract(client, {
          address: contractAddress,
          abi: contractAbi,
          functionName: "getAvailableNFTs",
          args: [],
        });

        resolve(total as string[]);
      } catch (err) {
        console.error(err);
        reject("Failed to fetch NFT info");
      }
    });
  };

  return (
    <Context.Provider
      value={{
        tokenInfo: { ...mergeQueries(tokenInfo, readTokenInfo), refetch: readTokenInfo.refetch },
        addressInfo: {
          ...mergeQueries(addressInfo, readAddressInfo),
          refetch: readAddressInfo.refetch,
        },
        nftInfo: { ...mergeQueries(nftInfo, readNftBalance), refetch: readNftBalance.refetch },
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useAppData() {
  const context = useContext(Context);

  if (!context) {
    // if (import.meta.env.VITE_ENV === "dev") {
    //   console.error("useAppData must be used within a AppDataProvider");
    // } else {
    throw new Error("useAppData must be used within a AppDataProvider");
    // }
  }

  return context;
}
