import type { Chain } from "@/types";
import { getChainById } from "@/utils/helpers";
import { useEffect, useRef, useState } from "react";
import type { Chain as ViemChain } from "viem";

type UseAllowedChainOptions = {
  chain: ViemChain | undefined;
};

export function useAllowedChain({ chain }: UseAllowedChainOptions) {
  const viemChain = chain;

  const [data, setData] = useState<Chain | undefined>(undefined);
  const [isError, setIsError] = useState(false);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (viemChain) {
      handleChange(viemChain);
    } else {
      setData(undefined);
    }
  }, [viemChain]);

  const handleChange = (chain: ViemChain) => {
    const allowedChain = getChainById(chain.id);

    if (allowedChain) {
      setData(allowedChain);
    } else {
      setData(undefined);
      setIsError(true);
    }
  };

  const init = () => {
    if (!isInitialized.current && viemChain) {
      handleChange(viemChain);
      isInitialized.current = true;
    }
  };

  init();

  return { data, isError };
}
