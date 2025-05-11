"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { isNil } from "lodash";
import { toast } from "sonner";
import { parseError } from "@/utils/parse-error";
import { useWallet } from "@/hooks/use-wallet";
import { createDisputeDB } from "@/services/dispute/create";
import { Contract } from "@/interface";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
export default function DisputeContractButton({ contract }: { contract: Contract }) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");
  const { address, browserWallet } = useWallet();
  const handleDisputeContract = async (contract: Contract) => {
    try {
      if (isNil(address) || isNil(browserWallet)) {
        throw new Error("Wallet address is required");
      }
      // const { tx, message } = await createDisputeTx({ txHash: contract.txhash, walletAddress: address });
      // if (isNil(tx)) {
      //   throw new Error(message);
      // }
      // const signedTx = await browserWallet.signTx(tx);
      // const txHash = await browserWallet.submitTx(signedTx);
      const txHash = "123";
      if (isNil(txHash)) {
        throw new Error("Error when submitting transaction");
      }

      const { result, message: msg, dísputeId } = await createDisputeDB({ contract, reason: reason });

      if (!result) {
        throw new Error(msg);
      }

      toast.success(msg, {
        description: "Dispute created successfully",
      });
      window.location.href = "/dashboard/dispute/" + dísputeId;
    } catch (error) {
      toast.warning("Error ", {
        description: parseError(error),
      });
    }
  };
  return (
    <>
      {/* <Button variant="outline" size="sm" onClick={() => handleDisputeContract(contract)}>
        Dispute
      </Button> */}
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        Dispute
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reason</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input id="link" value={reason} onChange={(e) => setReason(e.target.value)} />
            </div>
          </div>
          <DialogFooter className="justify-end">
            <Button type="button" variant="secondary" onClick={() => handleDisputeContract(contract)}>
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
