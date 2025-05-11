"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BrowserWallet, Wallet } from "@meshsdk/core";

interface WalletListProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: (wallet: Wallet) => void;
}

export function WalletList({ open, onOpenChange, onConnect }: WalletListProps) {
  const [walletList, setWalletList] = useState<Wallet[]>([]);

  useEffect(() => {
    async function get() {
      setWalletList(await BrowserWallet.getAvailableWallets());
    }
    get();
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {walletList.map((wallet) => (
            <Button key={wallet.id} variant="outline" className="flex items-center justify-start gap-3 h-14" onClick={() => onConnect(wallet)}>
              <Image src={wallet.icon || "/placeholder.svg"} alt={wallet.name} width={24} height={24} className="rounded-full" />
              <span>{wallet.name}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
