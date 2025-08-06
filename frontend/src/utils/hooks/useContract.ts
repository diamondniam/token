import type { config } from "@/providers/global/GlobalProvider";
import type { Chain, ChainStringId } from "@/types";
import { getFallbackChain, type Contracts } from "@/utils/helpers";
import {
  useReadContract as useReadContractWagmi,
  useWriteContract as useWriteContractWagmi,
  type UseReadContractParameters,
} from "wagmi";

type UseReadContractOptions = {
  contractName: keyof Contracts;
  fn: string;
  chain?: Chain;
  args?: any[];
  query?: UseReadContractParameters["query"];
};

export function useReadContract<T>({
  chain,
  contractName,
  fn,
  args,
  query,
}: UseReadContractOptions) {
  chain = chain || getFallbackChain()!;

  args = args || [];
  const address = $.contracts[chain?.stringId as ChainStringId]?.[contractName]?.address;
  const abi = $.contracts[chain?.stringId as ChainStringId]?.[contractName]?.abi;
  query = { enabled: query?.enabled ?? true, ...query };

  const data = useReadContractWagmi<typeof abi, typeof fn, typeof args, typeof config, T>({
    address,
    abi,
    functionName: fn,
    args,
    chainId: chain.id as any,
    query: query as any,
  });

  return data;
}

type UseWriteContractOptions = {
  contractName: keyof Contracts;
  fn: string;
  chain: Chain;
  value?: bigint;
  args?: any[];
};

export function useWriteContract() {
  const { writeContractAsync } = useWriteContractWagmi();

  function writeContract({ contractName, fn, chain, value, args }: UseWriteContractOptions) {
    chain = chain || getFallbackChain();

    return writeContractAsync({
      address: $.contracts[chain?.stringId as ChainStringId]?.[contractName]?.address,
      abi: $.contracts[chain?.stringId as ChainStringId]?.[contractName]?.abi,
      functionName: fn,
      value,
      args: args || [],
    });
  }

  return { writeContract };
}
