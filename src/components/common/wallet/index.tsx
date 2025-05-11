"use client";

import { useEffect, useState } from "react";
import { ConnectButton } from "./connect-button";
import { ConnectedWallet } from "./connected-wallet";
import { WalletList } from "./wallet-list";
import { useWallet } from "@/hooks/use-wallet";
import { Wallet } from "@meshsdk/core";
import Loading from "../loading";
import { Button } from "@/components/ui/button";

export function WalletConnect() {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { walletIcon, address, connect, disconnect } = useWallet();

  useEffect(() => {
    const loadWallet = async () => {
      const walletId = localStorage.getItem("CWallet");
      const walletAddress = localStorage.getItem("CWalletAddress");
      if (walletId && walletAddress) {
        await connect(walletId, walletAddress);
      }
      setIsLoading(false);
    };
    loadWallet();
  }, [connect]);

  const handleConnect = async (wallet: Wallet) => {
    await connect(wallet.id, null);
    setOpenModal(false);
  };

  return (
    <>
      {isLoading ? (
        <Button variant="ghost" size="lg" className="flex items-center gap-2">
          <Loading />
        </Button>
      ) : !address ? (
        <ConnectButton onClick={() => setOpenModal(true)} />
      ) : (
        <ConnectedWallet address={address} walletIcon={walletIcon} onDisconnect={disconnect} />
      )}

      <WalletList open={openModal} onOpenChange={setOpenModal} onConnect={handleConnect} />
    </>
  );
}
