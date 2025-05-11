"use client";
import Loading from "@/components/common/loading";
import { useWallet } from "@/hooks/use-wallet";
import { ApiResponseInterface } from "@/interface";
import { get } from "@/lib/axios";
import { parseError } from "@/utils/parse-error";
import { isNil } from "lodash";
import React from "react";
import { toast } from "sonner";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { createContract } from "@/services/contract";
import { ContractFormValues } from "@/components/contract-builder/hooks/contract-builder";
import ContractBuilderForm from "@/components/contract-builder/Contractbuilder";
import { appNetwork } from "@/constants/contract";
import Link from "next/link";
import { ErrorSection } from "@/components/common/ErrorSection";

export default function Page() {
  const params = useParams<{ id: string }>();

  const { data, error, isLoading } = useSWR<ApiResponseInterface>("/job/" + params.id, get);
  const { address, browserWallet } = useWallet();

  if (error) return <ErrorSection title={parseError(error)} />;
  if (isLoading) return <Loading />;
  const { data: initialJob } = data || { data: null };

  if (isNil(initialJob) || initialJob.walletAddress !== initialJob?.walletAddress) {
    return <div>Job not found</div>;
  }

  async function onSubmit(values: ContractFormValues) {
    try {
      if (isNil(address) || isNil(browserWallet)) {
        throw new Error("Wallet address is required");
      }
      const { tx, message } = await createContract({
        jobId: params.id,
        data: values,
      });
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
      toast.warning("Error creating job", {
        description: parseError(error),
      });
    }
  }

  return <ContractBuilderForm initialData={initialJob} onSubmit={onSubmit} />;
}
