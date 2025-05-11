"use client";

import type React from "react";

import { useState } from "react";
import { UploadCloudIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Contract } from "@/interface";
import SubmissionDisplay from "./submission-details";
import { isEmpty, isNil } from "lodash";

export default function ViewSubmissionButton({ contract }: { contract: Contract }) {
  const [isOpen, setIsOpen] = useState(false);
  const { submission } = contract;

  if (isEmpty(submission) || isNil(submission)) {
    return null;
  }

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        <UploadCloudIcon className="mr-2 h-4 w-4" />
        Submission
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-full sm:max-w-[80vw] w-screen h-screen sm:h-[80vh] p-6 flex flex-col overflow-y-auto">
          <div className="pt-2">
            <SubmissionDisplay contract={contract} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
