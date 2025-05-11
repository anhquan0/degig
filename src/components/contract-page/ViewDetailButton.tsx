"use client";

import type React from "react";

import { useState } from "react";
import { FileCodeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ContractDisplay from "./contract-details";
import { Contract } from "@/interface";

export default function ViewDetailButton({ contract }: { contract: Contract }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        <FileCodeIcon className="mr-2 h-4 w-4" />
        View
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-full sm:max-w-[80vw] w-screen h-screen sm:h-[80vh] p-6 flex flex-col overflow-y-auto">
          <div className="pt-2">
            <ContractDisplay contract={contract} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
