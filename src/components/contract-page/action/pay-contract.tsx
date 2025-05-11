"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { isNil } from "lodash";
import { payContract } from "@/services/contract";
import { toast } from "sonner";
import Link from "next/link";
import { appNetwork } from "@/constants/contract";
import { parseError } from "@/utils/parse-error";
import { useWallet } from "@/hooks/use-wallet";
export default function PayContractButton({ txHash }: { txHash: string }) {
  const { address, browserWallet } = useWallet();
  const handleConfirmContract = async (txHashInput: string) => {
    try {
      if (isNil(address) || isNil(browserWallet)) {
        throw new Error("Wallet address is required");
      }
      const { tx, message } = await payContract({ txHash: txHashInput, walletAddress: address });
      if (isNil(tx)) {
        throw new Error(message);
      }
      const signedTx = await browserWallet.signTx(tx);
      const txHash = await browserWallet.submitTx(signedTx);
      toast.success("Success", {
        description: "Contract created successfully",
        action: (
          <Link
            href={`https://${appNetwork == "mainnet" ? "" : appNetwork + "."}cexplorer.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Explorer
          </Link>
        ),
      });
      // window.location.href = "/contracts/";
    } catch (error) {
      toast.warning("Error ", {
        description: parseError(error),
      });
    }
  };
  return (
    <>
      <Button variant="outline" size="sm" onClick={() => handleConfirmContract(txHash)}>
        Pay
      </Button>
    </>
  );
}
