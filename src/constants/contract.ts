import { Network } from "@meshsdk/core";

export const ADMINISTRATOR_WALLET_ADDRESS = process.env.ADMINISTRATOR_WALLET_ADDRESS || "";
export const appNetwork: Network = (process.env.NEXT_PUBLIC_APP_NETWORK?.toLowerCase() as Network) || "preprod";
export const appNetworkId = appNetwork === "mainnet" ? 1 : 0;
export const IPFS_GATEWAY = process.env.NEXT_PUBLIC_IPFS_GATEWAY || "https://ipfs.blockfrost.dev/ipfs/";
