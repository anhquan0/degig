"use client";
import { JobFormValues } from "@/components/job-builder/hooks/job-builder";
import Jobbuilder from "@/components/job-builder/Jobbuilder";
import { useWallet } from "@/hooks/use-wallet";
import { createJob } from "@/services/job/create";
import { parseError } from "@/utils/parse-error";
import React from "react";
import { toast } from "sonner";

export default function Page() {
  const { address } = useWallet();

  async function onSubmit(values: JobFormValues) {
    try {
      if (!address) {
        throw new Error("Wallet address is required");
      }
      const res = await createJob({
        walletAddress: address,
        job: values,
      });
      toast.success(res, {
        description: "Job created successfully",
      });
      window.location.href = "/dashboard";
    } catch (error) {
      toast.warning("Error ", {
        description: parseError(error),
      });
    }
  }

  return <Jobbuilder onSubmit={onSubmit} />;
}
