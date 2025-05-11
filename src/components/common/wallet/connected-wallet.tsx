"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

interface ConnectedWalletProps {
  walletIcon: string | null;
  address: string | null;
  onDisconnect: () => void;
}

export function ConnectedWallet({ walletIcon, onDisconnect, address }: ConnectedWalletProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="lg" className="flex items-center gap-2">
          <Image src={walletIcon || "/placeholder.svg"} alt="wallet" width={20} height={20} className="rounded-full" />
          <span className="max-w-24 truncate">{address}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="cursor-pointer" onClick={() => console.log("Go to profile")}>
          <span>Go Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={onDisconnect}>
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
