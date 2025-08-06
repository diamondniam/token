import { abi as token } from "../../../../build/contracts/Token.json";
import { abi as preSale } from "../../../../build/contracts/Presale.json";
import { abi as nft } from "../../../../build/contracts/NFT.json";
import { abi as staking } from "../../../../build/contracts/Staking.json";
import type { ChainStringId } from "@/types";

type Contract = {
  address: `0x${string}`;
  abi: any;
};

export type Contracts = {
  token: Contract;
  preSale: Contract;
  nft: Contract;
  staking: Contract;
};

type ContactChains = Record<ChainStringId, Contracts>;

export const contracts: ContactChains = {
  localhost: {
    token: {
      address: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
      abi: token,
    },
    preSale: {
      address: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
      abi: preSale,
    },
    nft: {
      address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      abi: nft,
    },
    staking: {
      address: "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6",
      abi: staking,
    },
  },
  holesky: {
    token: {
      address: "0x53B170e83D16D745a13b9f21d6F83e9AE5cbF237",
      abi: token,
    },
    preSale: {
      address: "0x9f341232601e2477E775631eE382DDc38d131AE1",
      abi: preSale,
    },
    nft: {
      address: "0x12E64BA43d2498E597dDcacbC9867F38Cd533757",
      abi: nft,
    },
    staking: {
      address: "0xbe359A8B712EDC484163111427D8fE944360cf6d",
      abi: staking,
    },
  },
  sepolia: {
    token: {
      address: "0xf32C8F840B54B6FCf8a172B9778807C9169ECe71",
      abi: token,
    },
    preSale: {
      address: "0xEe641640D2C8a02204a29E155811a312C96FDADA",
      abi: preSale,
    },
    nft: {
      address: "0xf920385F877C3d7CDC8726067f2A21DD9A0Da74d",
      abi: nft,
    },
    staking: {
      address: "0xC693c7352cd5744a9303B878ADF81201f27E99a6",
      abi: staking,
    },
  },
  mainnet: {
    token: {
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      abi: token,
    },
    preSale: {
      address: "0x9A676e781A523b5d0C0e43731313A708CB607508",
      abi: preSale,
    },
    nft: {
      address: "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e",
      abi: nft,
    },
    staking: {
      address: "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0",
      abi: staking,
    },
  },
};
