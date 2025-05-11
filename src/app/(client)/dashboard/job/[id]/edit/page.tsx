"use client";
import Loading from "@/components/common/loading";
import { JobFormValues } from "@/components/job-builder/hooks/job-builder";
import Jobbuilder from "@/components/job-builder/Jobbuilder";
import { useWallet } from "@/hooks/use-wallet";
import { ApiResponseInterface } from "@/interface";
import { get } from "@/lib/axios";
import { parseError } from "@/utils/parse-error";
import { isNil } from "lodash";
import React from "react";
import { toast } from "sonner";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { updateJob } from "@/services/job/update";
import { ErrorSection } from "@/components/common/ErrorSection";

export default function Page() {
  const params = useParams<{ id: string }>();

  const { data, error, isLoading } = useSWR<ApiResponseInterface>("/job/" + params.id, get);
  const { address } = useWallet();

  if (error) return <ErrorSection title={parseError(error)} />;
  if (isLoading) return <Loading />;
  const { data: initialJob } = data || { data: null };
  if (isNil(initialJob) || initialJob.walletAddress !== initialJob?.walletAddress) {
    return <div>Job not found</div>;
  }

  async function onSubmit(values: JobFormValues) {
    try {
      if (!address) {
        throw new Error("Wallet address is required");
      }
      const res = await updateJob({
        id: params.id,
        walletAddress: address,
        jobUpdate: values,
      });
      toast.success(res, {
        description: "Job created successfully",
      });
      window.location.href = "/job/" + params.id;
    } catch (error) {
      toast.warning("Error ", {
        description: parseError(error),
      });
    }
  }

  return <Jobbuilder initialData={initialJob} onSubmit={onSubmit} />;
}
