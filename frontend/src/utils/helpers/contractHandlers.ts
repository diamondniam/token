import type { Chain, ChainStringId } from "@/types";
import type { Contracts } from "@/utils/helpers/contracts";
import { createPublicClient, http } from "viem";
import { getContractEvents as getContractEventsViem } from "viem/actions";

type GetContractEventsOptions = {
  contractName: keyof Contracts;
  chain: Chain;
  name: string;
  to?: string;
  from?: string;
};

export async function getContractEvents({
  contractName,
  chain,
  name,
  from,
  to,
}: GetContractEventsOptions) {
  const publicClient = createPublicClient({
    chain: chain,
    transport: http(chain!.rpcUrls.default.http[0]),
  });

  const abi = $.contracts[chain?.stringId as ChainStringId]?.[contractName]?.abi;
  const address = $.contracts[chain?.stringId as ChainStringId]?.[contractName]?.address;

  const events: any[] = await getContractEventsViem(publicClient, {
    address,
    abi,
    eventName: name,
  });

  const filteredEvents = events.filter((event) => {
    if (from && to) {
      return event.args.from === from && event.args.to === to;
    } else if (from) {
      return event.args.from === from;
    } else if (to) {
      return event.args.to === to;
    } else {
      return true;
    }
  });

  return filteredEvents;
}

type ReadContractOptions = {
  contractName: keyof Contracts;
  chain: Chain;
  fn: string;
  args?: any[];
};

export async function readContract({ contractName, chain, fn, args }: ReadContractOptions) {
  const publicClient = createPublicClient({
    chain: chain,
    transport: http(chain!.rpcUrls.default.http[0]),
  });

  return await publicClient.readContract({
    address: $.contracts[chain?.stringId as ChainStringId]?.[contractName]?.address,
    abi: $.contracts[chain?.stringId as ChainStringId]?.[contractName]?.abi,
    functionName: fn,
    args: args || [],
  });
}
