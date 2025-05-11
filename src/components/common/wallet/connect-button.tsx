"use client";

import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

interface ConnectButtonProps {
  onClick: () => void;
}

export function ConnectButton({ onClick }: ConnectButtonProps) {
  return (
    <Button onClick={onClick} size="lg" className="flex items-center gap-2">
      <Wallet className="h-4 w-4" />
      Connect Wallet
    </Button>
  );
}
