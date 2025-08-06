import type { AppDataHandledItemOptions, AppDataItemOptions, AppDataSection } from "@/types";
import { toFixed } from "@/utils/helpers";
import moment from "moment";
import { formatEther, type Chain } from "viem";

export const sectionsTitles = {
  token: "Token Information",
  preSale: "Pre-Sale Information",
  buyer: "Buyer Information",
};

export const tokenInfoMap: AppDataItemOptions[] = [
  {
    id: "name",
    section: "token",
    title: "Name",
    formatToText: (value: string) => value,
    format: (value: string) => value,
  },
  {
    id: "symbol",
    title: "Symbol",
    section: "token",
    formatToText: (value: string) => value,
    format: (value: string) => value,
  },
  {
    id: "decimals",
    title: "Decimals",
    section: "token",
    formatToText: (value: number) => value,
    format: (value: number) => value,
  },
  {
    id: "totalSupply",
    title: "Total Supply",
    section: "token",
    formatToText: (value: bigint, _, tokenSymbol) => `${formatEther(value)} ${tokenSymbol}`,
    format: (value: bigint) => formatEther(value),
  },
  {
    id: "tokenPrice",
    title: "Token Price",
    section: "token",
    formatToText: (value: bigint, chain: Chain) =>
      `${formatEther(value)} ${chain.nativeCurrency.symbol}`,
    format: (value: bigint) => formatEther(value),
  },
  {
    id: "hardCap",
    title: "Hard Cap",
    section: "preSale",
    formatToText: (value: number) => toFixed(Number(value), 2),
    format: (value: number) => toFixed(Number(value), 2),
  },
  {
    id: "softCap",
    title: "Soft Cap",
    section: "preSale",
    formatToText: (value: number) => toFixed(Number(value), 2),
    format: (value: number) => toFixed(Number(value), 2),
  },
  {
    id: "tokensSold",
    title: "Tokens Sold",
    section: "preSale",
    formatToText: (value: bigint, _, tokenSymbol: string) => `${formatEther(value)} ${tokenSymbol}`,
    format: (value: bigint) => formatEther(value),
  },
  {
    id: "opensAt",
    title: "Opens At",
    section: "preSale",
    formatToText: (value: number) => moment(Number(value)).format("Do of MMMM, h:mm:ss A"),
    format: (value: number) => Number(value),
  },
  {
    id: "closesAt",
    title: "Closes At",
    section: "preSale",
    formatToText: (value: number) => moment(Number(value)).format("Do of MMMM, h:mm:ss A"),
    format: (value: number) => Number(value),
  },
  {
    id: "isOpen",
    title: "Status",
    section: "preSale",
    formatToText: (value: boolean) => (value ? "Open" : "Closed"),
    format: (value: boolean) => value,
  },
];

export const addressInfoMap: AppDataItemOptions[] = [
  {
    id: "isWhitelisted",
    title: "Whitelisted",
    section: "buyer",
    formatToText: (value: boolean) => (value ? "Yes" : "No"),
    format: (value: boolean) => value,
  },
  {
    id: "buyerTokens",
    title: "Buyer Tokens",
    section: "buyer",
    formatToText: (value: bigint, _, tokenSymbol: string) => `${formatEther(value)} ${tokenSymbol}`,
    format: (value: bigint) => formatEther(value),
  },
];

export function handleTokenInfo(
  data: any[],
  map: AppDataItemOptions[],
  chain: Chain,
  tokenSymbol: string,
) {
  const sections: AppDataSection[] = [];

  data.forEach((item, index) => {
    const options = map[index];
    let section = sections.find((s) => s.id === options.section);

    if (!section) {
      sections.push({
        id: options.section,
        title: sectionsTitles[options.section],
        data: [],
      });

      section = sections.find((s) => s.id === options.section);
    }

    section!.data.push({
      id: options.id,
      title: options.title,
      formatted: options.formatToText(item, chain, tokenSymbol),
      value: options.format(item),
    });
  });

  return sections;
}

export function handleTokenInfoForStake(sections: AppDataSection[]) {
  const excludedSectionIds = ["preSale"];

  return sections.filter((section) => {
    return !excludedSectionIds.includes(section.id);
  });
}

export function getSymbol(data: any[]) {
  const symbolId = "symbol";
  const symbolIndexInMap = tokenInfoMap.findIndex((item) => item.id === symbolId);
  const symbolOptions = tokenInfoMap[symbolIndexInMap];
  return symbolOptions.format(data[symbolIndexInMap]);
}

export function getItemById(data: AppDataSection[], id: string): AppDataHandledItemOptions | null {
  let result: AppDataHandledItemOptions | null = null;

  data.forEach((section) => {
    section.data.forEach((item) => {
      if (item.id === id) {
        result = item;
      }
    });
  });

  return result;
}
