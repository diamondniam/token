import { useErrors, useAppData as useAppDataStore } from "@/stores";
import type { ChainStringId, AppDataStoreNFTDataItem, Chain } from "@/types";
import {
  addressInfoMap,
  getFallbackChain,
  getSymbol,
  handleTokenInfo,
  tokenInfoMap,
} from "@/utils/helpers";
import { useAllowedChain } from "@/utils/hooks";
import { useReadContract } from "@/utils/hooks/useContract";
import { useEffect } from "react";
import { createClient, http } from "viem";
import { readContract } from "viem/actions";
import { useAccount } from "wagmi";

import $d from "@/assets/data/pages/nfts.json";

export function useAppData() {
  const { address, chain: wagmiChain } = useAccount();
  const { data: chain } = useAllowedChain({ chain: wagmiChain });
  const { setTokenInfo, setAddressInfo, nftInfo, setNftInfo } = useAppDataStore();
  const { setIsSomethingWrong } = useErrors();

  const tokenInfo = useReadContract({
    contractName: "token",
    fn: "getOverview",
  });

  const addressInfo = useReadContract({
    chain,
    contractName: "token",
    fn: "getAddressInfo",
    args: [address!],
    enabled: !!address && !!chain,
  });

  const nftBalance = useReadContract({
    chain,
    contractName: "nft",
    fn: "balanceOf",
    args: [address!],
    enabled: !!address && !!chain,
  });

  // useEffect(() => {
  //   if (!nftBalance) return;

  //   const current = JSON.parse(JSON.stringify(nftInfo.query));
  //   const upcoming = JSON.parse(JSON.stringify(nftBalance));
  //   delete upcoming.data;
  //   delete upcoming.queryKey;

  //   if (JSON.stringify(current) !== JSON.stringify(upcoming)) {
  //     console.log(upcoming);
  //     setNftInfo("query", upcoming);
  //   }
  // }, [nftBalance]);

  // useEffect(() => {
  //   setTokenInfo("query", tokenInfo);
  // },[addressInfo])

  // useEffect(() => {
  //   setAddressInfo("query", addressInfo);
  // },[addressInfo])

  useEffect(() => {
    if (tokenInfo.data) {
      const symbol = getSymbol(tokenInfo.data as any[]);
      const _chain = chain || getFallbackChain()!;

      const handledTokenInfo = handleTokenInfo(
        tokenInfo.data as any[],
        tokenInfoMap,
        _chain,
        symbol,
      );
      setTokenInfo("data", handledTokenInfo);

      if (addressInfo) {
        const handledAddressInfo = handleTokenInfo(
          addressInfo.data as any[],
          addressInfoMap,
          _chain,
          symbol,
        );
        setAddressInfo("data", handledAddressInfo);
      }
    }

    if (tokenInfo.error || addressInfo.error) {
      console.error(tokenInfo.error || addressInfo.error);
      setIsSomethingWrong("Failed to fetch token info");
    }
  }, [tokenInfo.data, addressInfo.data, tokenInfo.error, addressInfo.error]);

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

          const item = $d.items.find((nft) => nft.uri === uri);

          if (item) {
            items.push(item);
          } else {
            console.log("Failed to fetch NFT info");
            reject("Failed to fetch NFT info");
          }
        } catch (err) {
          console.error(err);
          console.log("Failed to fetch NFT info");
          reject("Failed to fetch NFT info");
        }
      }

      resolve(items);
    });
  };

  useEffect(() => {
    if (chain && nftBalance.data) {
      fetchNftItems({ data: nftBalance.data, chain })
        .then((data) => {
          setNftInfo("data", {
            balance: Number(nftBalance.data),
            items: data,
          });
        })
        .catch((err) => {
          console.log("Failed to fetch NFT info");
          console.error(err);
          setIsSomethingWrong("Failed to fetch NFT info");
        });
    }
  }, [nftBalance.data, chain]);
}
